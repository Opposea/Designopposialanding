import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { Resend } from "npm:resend";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const resend = new Resend(Deno.env.get('REVEL_API_KEY'));

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
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

    if (!email || !email.includes('@')) {
      return c.json({ error: 'Valid email is required' }, 400);
    }

    // Store in KV store with timestamp
    const timestamp = new Date().toISOString();
    const key = `waitlist:${timestamp}:${email}`;
    await kv.set(key, {
      email,
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
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
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

// Get all waitlist signups (for admin use)
app.get("/make-server-cbc95482/waitlist", async (c) => {
  try {
    const signups = await kv.getByPrefix('waitlist:');
    return c.json({ signups });
  } catch (error) {
    console.error('Error fetching waitlist signups:', error);
    return c.json({ error: 'Failed to fetch signups' }, 500);
  }
});

Deno.serve(app.fetch);