# 🔒 Security Setup Guide for Opposia

## Immediate Action Required

Your application has been updated with critical security fixes. To complete the setup, you need to configure an admin token.

---

## Step 1: Generate a Secure Admin Token

Run this in your terminal to generate a strong random token:

```bash
# On Mac/Linux:
openssl rand -hex 32

# Or use this online generator:
# https://www.uuidgenerator.net/api/version4
```

Example output: `7a9f8c3d2e1b4f6a5c9d8e7b6a5f4c3d2e1b9a8f7c6d5e4b3a2f1e9d8c7b6a5`

---

## Step 2: Add the Token to Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/gjffltybucegxnjvwema
2. Navigate to **Settings** → **Edge Functions** → **Secrets**
3. Add a new secret:
   - **Name:** `ADMIN_SECRET_TOKEN`
   - **Value:** [paste your generated token]
4. Click **Save**

---

## Step 3: Store Your Token Securely

**DO NOT lose this token!** Store it in a password manager or secure location.

You'll need it to access the admin endpoint.

---

## How to Access Admin Endpoint

Once configured, you can view all waitlist signups with:

```bash
curl -X GET \
  https://gjffltybucegxnjvwema.supabase.co/functions/v1/make-server-cbc95482/waitlist \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

Or using JavaScript:

```javascript
const response = await fetch(
  'https://gjffltybucegxnjvwema.supabase.co/functions/v1/make-server-cbc95482/waitlist',
  {
    headers: {
      'Authorization': 'Bearer YOUR_ADMIN_TOKEN_HERE'
    }
  }
);
const data = await response.json();
console.log('Total signups:', data.count);
console.log('Signups:', data.signups);
```

---

## What Has Been Fixed

✅ **Rate Limiting** - Max 3 signups per IP address per 5 minutes  
✅ **Email Validation** - Proper regex validation  
✅ **XSS Prevention** - HTML escaping in email notifications  
✅ **Duplicate Prevention** - Same email can't sign up twice  
✅ **Admin Authentication** - GET endpoint now requires authentication  
✅ **Security Headers** - X-Frame-Options, HSTS, etc.  
✅ **Request Size Limits** - Max 10KB per request  

---

## Security Settings to Update Later

### 1. Restrict CORS (When you have a domain)

Edit `/supabase/functions/server/index.tsx` line 81:

```tsx
// Change from:
origin: "*",

// To:
origin: ["https://opposia.com", "https://www.opposia.com"],
```

### 2. Set Up Email Verification

Consider adding email verification to prevent fake signups:
- Send confirmation link
- Only add to waitlist after verification
- Reduces spam and ensures valid emails

### 3. Set Up Monitoring

Add monitoring for:
- Failed login attempts on admin endpoint
- Unusual signup patterns
- Rate limit hits
- API errors

---

## Testing the Security

### Test Rate Limiting

Try signing up 4 times in a row - the 4th should be blocked:

```bash
# This should succeed 3 times, fail on 4th
for i in {1..4}; do
  curl -X POST \
    https://gjffltybucegxnjvwema.supabase.co/functions/v1/make-server-cbc95482/waitlist \
    -H "Content-Type: application/json" \
    -d '{"email":"test'$i'@example.com"}'
  echo ""
done
```

### Test Admin Authentication

Without token (should fail with 401):
```bash
curl -X GET \
  https://gjffltybucegxnjvwema.supabase.co/functions/v1/make-server-cbc95482/waitlist
```

With wrong token (should fail with 401):
```bash
curl -X GET \
  https://gjffltybucegxnjvwema.supabase.co/functions/v1/make-server-cbc95482/waitlist \
  -H "Authorization: Bearer wrong_token"
```

With correct token (should succeed):
```bash
curl -X GET \
  https://gjffltybucegxnjvwema.supabase.co/functions/v1/make-server-cbc95482/waitlist \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

---

## Security Best Practices Going Forward

1. **Never commit tokens to Git** - Always use environment variables
2. **Rotate tokens regularly** - Change admin token every 3-6 months
3. **Monitor access logs** - Check Supabase logs regularly
4. **Keep dependencies updated** - Run updates monthly
5. **Test security** - Run security tests before major releases
6. **HTTPS only** - Never send tokens over HTTP
7. **Backup data** - Regular database backups
8. **Incident response plan** - Document what to do if breached

---

## Emergency Contact

If you suspect a security breach:

1. **Immediately** rotate all tokens in Supabase
2. Check access logs for suspicious activity
3. Review all database entries for anomalies
4. Contact security@supabase.com if needed
5. Notify affected users if personal data was accessed (UK GDPR requirement)

---

## Questions?

For security questions, refer to:
- **Security Audit Report:** `/SECURITY_AUDIT_REPORT.md`
- **Supabase Security Docs:** https://supabase.com/docs/guides/platform/going-into-prod
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/

---

**Remember:** Security is an ongoing process, not a one-time setup. Stay vigilant!
