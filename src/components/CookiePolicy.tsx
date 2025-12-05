export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
        <h1 className="text-blue-900 mb-6 border-b-2 border-blue-200 pb-4">Cookie Policy</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-blue-800 mb-3">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience. Cookies can also help website owners understand how their site is being used.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">How We Use Cookies</h2>
            <p className="mb-3">
              Opposia uses cookies to ensure our website functions properly and to improve your experience. We are committed to transparency about the cookies we use and give you control over non-essential cookies.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-blue-900 mb-3">1. Essential Cookies (Always Active)</h3>
                <p className="mb-3">
                  These cookies are strictly necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.
                </p>
                <div className="bg-white p-4 rounded mt-3">
                  <p className="mb-2"><strong>Cookies Used:</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>cookieConsent</strong> (localStorage)
                      <br />
                      <span className="text-gray-600">Purpose: Stores your cookie preferences to remember your choices.</span>
                      <br />
                      <span className="text-gray-600">Duration: Persistent (until you clear browser data)</span>
                    </li>
                    <li>
                      <strong>Session cookies</strong>
                      <br />
                      <span className="text-gray-600">Purpose: Maintains your session state while navigating the site.</span>
                      <br />
                      <span className="text-gray-600">Duration: Session (deleted when you close your browser)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-purple-900 mb-3">2. Functional Cookies (Optional)</h3>
                <p className="mb-3">
                  These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
                <div className="bg-white p-4 rounded mt-3">
                  <p className="mb-2"><strong>Cookies Used:</strong></p>
                  <p className="text-gray-600 italic">
                    Currently, we do not use functional cookies. This section will be updated if we implement features requiring such cookies in the future.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
                <h3 className="text-green-900 mb-3">3. Analytics Cookies (Optional)</h3>
                <p className="mb-3">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.
                </p>
                <div className="bg-white p-4 rounded mt-3">
                  <p className="mb-2"><strong>Cookies Used:</strong></p>
                  <p className="text-gray-600 italic">
                    Currently, we do not use analytics cookies. We may implement privacy-friendly analytics in the future, and this policy will be updated accordingly. We will never use non-essential tracking without your explicit consent.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Cookies We Do NOT Use</h2>
            <p className="mb-3">
              To protect your privacy, we want to be clear about what we DON'T do:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Marketing/Advertising Cookies:</strong> We do not use cookies for targeted advertising or marketing purposes.</li>
              <li><strong>Third-Party Tracking:</strong> We do not allow third-party advertising networks to track you on our site.</li>
              <li><strong>Social Media Tracking:</strong> We do not embed social media tracking pixels or cookies.</li>
              <li><strong>Data Selling:</strong> We never sell your data or share it with data brokers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Managing Your Cookie Preferences</h2>
            <p className="mb-3">
              You have several options to manage cookies:
            </p>
            <div className="bg-gray-50 p-5 rounded-lg">
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Through Our Cookie Banner:</strong> When you first visit our site, you can choose to accept all, reject all, or customize your preferences.
                </li>
                <li>
                  <strong>Cookie Settings Link:</strong> Click the "Cookie Settings" link in our footer at any time to change your preferences.
                </li>
                <li>
                  <strong>Browser Settings:</strong> You can set your browser to refuse all or some cookies, or to alert you when cookies are being sent. However, blocking essential cookies may affect website functionality.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">How to Control Cookies in Your Browser</h2>
            <p className="mb-3">
              Most web browsers allow you to manage cookies through their settings. Here are links to cookie management guides for popular browsers:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-blue-600">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="hover:underline">Microsoft Edge</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Third-Party Services</h2>
            <p>
              Our website is hosted on Supabase infrastructure. While we do not deliberately set third-party cookies, hosting providers may set technical cookies necessary for the infrastructure to function. We ensure that any third-party services we use comply with UK GDPR requirements.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. The "Last Updated" date at the bottom of this page will indicate when the policy was last modified.
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              <br />
              <br />
              Opposia
              <br />
              <a href="mailto:admin@opposia.com" className="text-blue-600 hover:text-blue-800 underline">
                admin@opposia.com
              </a>
            </p>
            <p className="mt-3">
              For questions about your data rights, you can also contact us at{' '}
              <a href="mailto:support@opposia.com" className="text-blue-600 hover:text-blue-800 underline">
                support@opposia.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-blue-800 mb-3">Your Rights Under UK GDPR</h2>
            <p>
              Under UK data protection law, you have rights including:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>The right to access your personal data</li>
              <li>The right to rectification</li>
              <li>The right to erasure</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object</li>
              <li>Rights in relation to automated decision making and profiling</li>
            </ul>
            <p className="mt-3">
              For more information, please see our{' '}
              <a href="#privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </a>
              .
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