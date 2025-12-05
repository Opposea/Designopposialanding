import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { Resend } from "npm:resend";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const resend = new Resend(Deno.env.get('REVEL_API_KEY'));

// Rate limiter
const rateLimiter = new Map<string, number[]>();

const checkRateLimit = (ip: string, limit: number = 3, windowMs: number = 300000): boolean => {
  const now = Date.now();
  const userRequests = rateLimiter.get(ip) || [];
  const recentRequests = userRequests.filter((time: number) => now - time < windowMs);
  
  if (recentRequests.length >= limit) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimiter.set(ip, recentRequests);
  
  // Cleanup old entries periodically
  if (Math.random() < 0.01) {
    for (const [key, times] of rateLimiter.entries()) {
      const validTimes = times.filter((time: number) => now - time < windowMs);
      if (validTimes.length === 0) {
        rateLimiter.delete(key);
      } else {
        rateLimiter.set(key, validTimes);
      }
    }
  }
  
  return true;
};

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
};

// HTML escaping to prevent XSS
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Enable logger
app.use('*', logger(console.log));

// Security headers
app.use('*', async (c, next) => {
  await next();
  c.res.headers.set('X-Content-Type-Options', 'nosniff');
  c.res.headers.set('X-Frame-Options', 'DENY');
  c.res.headers.set('X-XSS-Protection', '1; mode=block');
  c.res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
});

// Request size limit
app.use('*', async (c, next) => {
  const contentLength = c.req.header('content-length');
  if (contentLength && parseInt(contentLength) > 10000) {
    return c.json({ error: 'Request too large' }, 413);
  }
  await next();
});

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*", // TODO: Replace with your actual domain: ["https://opposia.com", "https://www.opposia.com"]
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-cbc95482/health", (c) => {
  return c.json({ status: "ok" });
});

// Waitlist signup endpoint
app.post("/make-server-cbc95482/waitlist", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email || !isValidEmail(email)) {
      return c.json({ error: 'Valid email is required' }, 400);
    }

    // Check rate limit
    const ip = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || c.req.header('true-client-ip') || c.req.header('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return c.json({ error: 'Too many requests, please try again later' }, 429);
    }

    // Check for duplicates
    const existingSignups = await kv.getByPrefix('waitlist:');
    const emailExists = existingSignups.some((signup: any) => signup.email === email.toLowerCase());
    
    if (emailExists) {
      // Return success to prevent email enumeration
      return c.json({ success: true, message: 'Successfully joined waitlist' });
    }

    // Store in KV store with timestamp
    const timestamp = new Date().toISOString();
    const key = `waitlist:${timestamp}:${email}`;
    await kv.set(key, {
      email: email.toLowerCase(),
      timestamp,
      notified: false
    });

    console.log(`New waitlist signup: ${email} at ${timestamp}`);

    // Send email notification to admin@opposia.com
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'admin@opposia.com',
        subject: '🎉 New Opposia Waitlist Signup!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #3b82f6;">New Waitlist Signup</h2>
            <p>Someone just joined the Opposia waitlist!</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p style="margin: 5px 0;"><strong>Signed up at:</strong> ${new Date(timestamp).toLocaleString()}</p>
            </div>
            <p style="color: #6b7280; font-size: 14px;">This is an automated notification from your Opposia landing page.</p>
          </div>
        `,
      });
      console.log(`Email notification sent to admin@opposia.com for ${email}`);
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Continue even if email fails - we still want to save the signup
    }

    return c.json({ success: true, message: 'Successfully joined waitlist' });
  } catch (error) {
    console.error('Error processing waitlist signup:', error);
    return c.json({ error: 'Failed to process signup' }, 500);
  }
});

// Get all waitlist signups (ADMIN ONLY - REQUIRES AUTHENTICATION)
app.get("/make-server-cbc95482/waitlist", async (c) => {
  try {
    // Require authentication for this endpoint
    const authHeader = c.req.header('Authorization');
    const adminToken = Deno.env.get('ADMIN_SECRET_TOKEN');
    
    // Check if admin token is configured
    if (!adminToken) {
      console.error('SECURITY WARNING: ADMIN_SECRET_TOKEN not configured. GET /waitlist endpoint is exposed!');
      return c.json({ error: 'Endpoint not configured' }, 503);
    }
    
    // Verify authentication
    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      console.warn(`Unauthorized access attempt to /waitlist from IP: ${c.req.header('x-forwarded-for') || 'unknown'}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const signups = await kv.getByPrefix('waitlist:');
    return c.json({ 
      success: true,
      count: signups.length,
      signups 
    });
  } catch (error) {
    console.error('Error fetching waitlist signups:', error);
    return c.json({ error: 'Failed to fetch signups' }, 500);
  }
});

Deno.serve(app.fetch);