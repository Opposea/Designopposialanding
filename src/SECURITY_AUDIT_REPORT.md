# 🔒 Opposia Security Audit Report
**Date:** December 5, 2024  
**Audited by:** AI Security Analysis  
**Application:** Opposia Dating Site Landing Page

---

## 🚨 CRITICAL VULNERABILITIES

### 1. **Unauthenticated Data Exposure** - SEVERITY: CRITICAL
**Location:** `/supabase/functions/server/index.tsx` (Line 83-91)

**Issue:**
```tsx
app.get("/make-server-cbc95482/waitlist", async (c) => {
  const signups = await kv.getByPrefix('waitlist:');
  return c.json({ signups });
});
```

The GET endpoint for retrieving all waitlist signups has **NO AUTHENTICATION**. Anyone who discovers this URL can access all email addresses in your database.

**Attack Vector:**
```bash
curl https://gjffltybucegxnjvwema.supabase.co/functions/v1/make-server-cbc95482/waitlist
# Returns ALL email addresses
```

**Impact:** GDPR violation, privacy breach, data theft

**Recommendation:**
```tsx
app.get("/make-server-cbc95482/waitlist", async (c) => {
  // Add authentication check
  const authHeader = c.req.header('Authorization');
  const adminToken = Deno.env.get('ADMIN_SECRET_TOKEN');
  
  if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  const signups = await kv.getByPrefix('waitlist:');
  return c.json({ signups });
});
```

---

### 2. **Cross-Site Scripting (XSS)** - SEVERITY: CRITICAL
**Location:** `/supabase/functions/server/index.tsx` (Line 62)

**Issue:**
Email addresses are directly injected into HTML without sanitization:
```tsx
html: `<p><strong>Email:</strong> ${email}</p>`
```

**Attack Vector:**
Someone submits: `<script>alert('XSS')</script>@evil.com`

**Impact:** If admin views emails in a vulnerable email client, malicious scripts could execute

**Recommendation:**
```tsx
// Add HTML escaping function
const escapeHtml = (str: string) => {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Use it:
html: `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`
```

---

### 3. **Wide-Open CORS Policy** - SEVERITY: HIGH
**Location:** `/supabase/functions/server/index.tsx` (Line 17)

**Issue:**
```tsx
origin: "*"
```

This allows **ANY website** to make requests to your API.

**Attack Vector:**
- Malicious website could spam your waitlist endpoint
- Cross-site request forgery attacks
- Email harvesting bots

**Recommendation:**
```tsx
cors({
  origin: ["https://opposia.com", "https://www.opposia.com"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST"], // Remove GET from public access
  credentials: true,
})
```

---

## ⚠️ HIGH SEVERITY ISSUES

### 4. **No Rate Limiting** - SEVERITY: HIGH
**Location:** `/supabase/functions/server/index.tsx` (Line 31)

**Issue:** No rate limiting on the waitlist endpoint

**Attack Vector:**
```bash
# Spam attack
for i in {1..10000}; do
  curl -X POST https://gjffltybucegxnjvwema.supabase.co/functions/v1/make-server-cbc95482/waitlist \
    -H "Content-Type: application/json" \
    -d '{"email":"spam'$i'@test.com"}'
done
```

**Impact:**
- Database flooding
- Email bombing (admin@opposia.com gets 10,000 emails)
- Denial of service
- Increased costs

**Recommendation:**
Implement rate limiting:
```tsx
// Create a simple rate limiter
const rateLimiter = new Map();

const checkRateLimit = (ip: string, limit: number = 5, window: number = 60000) => {
  const now = Date.now();
  const userRequests = rateLimiter.get(ip) || [];
  const recentRequests = userRequests.filter((time: number) => now - time < window);
  
  if (recentRequests.length >= limit) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimiter.set(ip, recentRequests);
  return true;
};

app.post("/make-server-cbc95482/waitlist", async (c) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
  
  if (!checkRateLimit(ip, 3, 300000)) { // 3 requests per 5 minutes
    return c.json({ error: 'Too many requests. Please try again later.' }, 429);
  }
  
  // ... rest of code
});
```

---

### 5. **Weak Email Validation** - SEVERITY: MEDIUM-HIGH
**Location:** `/supabase/functions/server/index.tsx` (Line 36)

**Issue:**
```tsx
if (!email || !email.includes('@')) {
  return c.json({ error: 'Valid email is required' }, 400);
}
```

This accepts invalid emails like:
- `@@@@@`
- `test@`
- `@test`
- `<script>@evil.com`

**Recommendation:**
```tsx
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

if (!email || !isValidEmail(email)) {
  return c.json({ error: 'Valid email is required' }, 400);
}
```

---

### 6. **No Duplicate Prevention** - SEVERITY: MEDIUM
**Location:** `/supabase/functions/server/index.tsx` (Line 42)

**Issue:** Same email can sign up multiple times, flooding database and admin's inbox

**Recommendation:**
```tsx
// Check if email already exists
const existingSignups = await kv.getByPrefix('waitlist:');
const emailExists = existingSignups.some((signup: any) => signup.email === email);

if (emailExists) {
  return c.json({ 
    success: true, 
    message: 'You are already on the waitlist!' 
  });
}
```

---

### 7. **Sensitive Data in Logs** - SEVERITY: MEDIUM
**Location:** `/supabase/functions/server/index.tsx` (Line 49, 69)

**Issue:**
```tsx
console.log(`New waitlist signup: ${email} at ${timestamp}`);
```

Email addresses (PII) are logged to console, which may be stored in log aggregation systems.

**GDPR Concern:** Personal data retention in logs

**Recommendation:**
```tsx
// Log without PII
console.log(`New waitlist signup at ${timestamp} (email hash: ${hashEmail(email)})`);

// Or use a logger that redacts PII
const safeLog = (message: string) => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return message.replace(emailRegex, '[EMAIL_REDACTED]');
};
```

---

## 📋 MEDIUM SEVERITY ISSUES

### 8. **No CSRF Protection**
The application doesn't implement CSRF tokens. While the public anon key provides some protection, dedicated CSRF tokens would be better for state-changing operations.

### 9. **Information Disclosure in Errors**
Error messages might reveal system information:
```tsx
return c.json({ error: 'Failed to process signup' }, 500);
```

Better: Log detailed errors server-side, return generic messages to client.

### 10. **No Request Size Limits**
No max body size enforcement could allow payload attacks.

**Recommendation:**
```tsx
app.use('*', async (c, next) => {
  const contentLength = c.req.header('content-length');
  if (contentLength && parseInt(contentLength) > 10000) { // 10KB limit
    return c.json({ error: 'Request too large' }, 413);
  }
  await next();
});
```

---

## ✅ GOOD SECURITY PRACTICES FOUND

1. ✅ **Environment Variables** - API keys stored in env vars, not hardcoded
2. ✅ **Service Role Key** - Kept server-side only
3. ✅ **HTTPS** - Using Supabase infrastructure (HTTPS enforced)
4. ✅ **Cookie Consent** - UK GDPR compliant cookie banner
5. ✅ **Privacy Policy** - Comprehensive privacy documentation
6. ✅ **Cookie Policy** - Detailed cookie usage documentation
7. ✅ **No SQL Injection Risk** - Using Supabase client (parameterized queries)
8. ✅ **Secure Headers** - CORS headers properly configured (though too permissive)
9. ✅ **Error Handling** - Try-catch blocks implemented
10. ✅ **Input Validation** - Basic validation present (needs improvement)

---

## 🔐 ADDITIONAL SECURITY RECOMMENDATIONS

### 11. Security Headers
Add security headers to responses:
```tsx
app.use('*', async (c, next) => {
  await next();
  c.res.headers.set('X-Content-Type-Options', 'nosniff');
  c.res.headers.set('X-Frame-Options', 'DENY');
  c.res.headers.set('X-XSS-Protection', '1; mode=block');
  c.res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  c.res.headers.set('Content-Security-Policy', "default-src 'self'");
});
```

### 12. Email Verification
Consider implementing email verification:
- Send confirmation link before adding to waitlist
- Prevents fake/typo emails
- Reduces spam

### 13. Honeypot Field
Add a hidden field to catch bots:
```tsx
// Frontend
<input type="text" name="website" style="display:none" />

// Backend
if (body.website) {
  // Bot detected
  return c.json({ success: true }); // Fake success
}
```

### 14. Monitoring & Alerting
Implement monitoring for:
- Unusual signup patterns
- Failed requests
- API errors
- Suspicious IP addresses

### 15. Data Retention Policy
Implement automatic data deletion:
```tsx
// Cron job to delete old unverified signups
const deleteOldSignups = async () => {
  const signups = await kv.getByPrefix('waitlist:');
  const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);
  
  for (const signup of signups) {
    if (new Date(signup.timestamp).getTime() < sixMonthsAgo) {
      await kv.del(`waitlist:${signup.timestamp}:${signup.email}`);
    }
  }
};
```

---

## 📊 RISK SUMMARY

| Vulnerability | Severity | Status | Fix Priority |
|--------------|----------|--------|--------------|
| Unauthenticated GET endpoint | 🔴 Critical | Open | **IMMEDIATE** |
| XSS in email | 🔴 Critical | Open | **IMMEDIATE** |
| CORS wildcard | 🟠 High | Open | **HIGH** |
| No rate limiting | 🟠 High | Open | **HIGH** |
| Weak email validation | 🟡 Medium | Open | Medium |
| No duplicate prevention | 🟡 Medium | Open | Medium |
| Sensitive logs | 🟡 Medium | Open | Medium |

---

## 🎯 IMMEDIATE ACTION ITEMS

1. **URGENT:** Add authentication to GET /waitlist endpoint OR remove it entirely
2. **URGENT:** Implement HTML escaping for email content
3. **HIGH:** Restrict CORS to your domain only
4. **HIGH:** Add rate limiting to prevent spam/DoS
5. **MEDIUM:** Improve email validation with proper regex
6. **MEDIUM:** Check for duplicate emails before insertion
7. **MEDIUM:** Remove or redact PII from logs

---

## 🛡️ COMPLIANCE NOTES

### UK GDPR Compliance
✅ **Compliant:**
- Cookie consent banner
- Privacy policy
- Cookie policy
- Data minimization (only collecting email)
- Purpose limitation
- Right to deletion (via email request)

⚠️ **Needs Attention:**
- Data breach notification procedures (document this)
- Data retention policy (set specific timeline)
- Data processing agreements with Supabase/Resend
- Log retention of personal data

---

## 📞 SUPPORT

For questions about this security audit, contact the security team or refer to:
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- UK GDPR Guidelines: https://ico.org.uk/for-organisations/
- Supabase Security: https://supabase.com/docs/guides/platform/going-into-prod

---

**End of Security Audit Report**
