export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
        <h1 className="text-blue-900 mb-6 border-b-2 border-blue-200 pb-4">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-blue-800 mb-3">1. Who We Are</h2>
            <p>
              Opposia, is operated currently by one person only, the Opposia creator and admin based in Cheshire. I am the sole data controller for the personal data collected through this site. This will change on/if launch proceeds and the site has enough users which is when Opposia will essentially file for limited company status. If you would like anymore personal information about the admin please contact admin@opposia.com and state the reason for the request.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">The Information We Collect</h2>
            <p className="mb-3">We collect and process the following information:</p>
            <p className="mb-2">
              <strong>Information You Provide:</strong> Your email address, which you voluntarily submit when signing up for early access updates.
            </p>
            <p>
              <strong>Information Collected Automatically:</strong> When you visit our site, we may automatically collect limited technical data such as your IP address, browser type, and pages visited. This is standard for most web servers and may be used for security and basic operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">How We Use Your Information</h2>
            <p className="mb-2">We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To communicate with you about the launch of our dating site and provide early access updates (based on your explicit consent).</li>
              <li>To operate, secure, and maintain our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Legal Basis for Processing (UK GDPR)</h2>
            <p>
              We process your email address based on the consent you provide when signing up. You can withdraw this consent at any time by contacting us or using the unsubscribe link in our emails our contact information is support@opposia.com and we aim to respond back within 24hours.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Data Sharing and Third Parties</h2>
            <p>
              We do not sell your personal data. We may share minimal technical data (like IP addresses) with our website hosting provider which is necessary for the site to function. We may track analytics for our own future reference but never any non-essential tracking.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Data Security and Retention</h2>
            <p>
              We implement appropriate measures to protect your data. We will retain your email address until you unsubscribe from our updates or until our service launches and the early access period concludes, after which it will be securely deleted.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Your Data Protection Rights</h2>
            <p>
              Under UK data protection law, you have rights including the right to access, correct, or request erasure of your personal data. To exercise these rights, please contact us at support@opposia.com
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Cookies</h2>
            <p>
              Our use of cookies and tracking technologies is explained in our Cookie Banner and separate Cookie Policy.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Contact Us</h2>
            <p>
              For any questions about this privacy policy or your data, please contact:<br />
              Opposia<br />
              <a href="mailto:admin@opposia.com" className="text-blue-600 hover:text-blue-800 underline">
                admin@opposia.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
          <p className="text-gray-500">Last updated: December 5, 2024</p>
          <a href="#" className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}