export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            How we collect, use, and protect your information.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">

          <p className="text-gray-300 mb-6 leading-relaxed">
            This Privacy Policy describes how Colorado Tap &amp; Toast (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and protects your information when you use our website and services.
          </p>

          {[
            {
              title: "1. Information We Collect",
              body: "We may collect the following information when you book services or interact with our website:",
              list: [
                "Name",
                "Email address",
                "Phone number",
                "Event details (date, location, guest count)",
                "Payment information (processed securely via third-party providers such as Stripe)",
              ],
            },
            {
              title: "2. How We Use Your Information",
              body: "We use your information to:",
              list: [
                "Process bookings and payments",
                "Communicate with you about your event",
                "Provide customer support",
                "Improve our services and website experience",
              ],
            },
            {
              title: "3. Payment Processing",
              body: "All payments are processed securely through third-party payment providers such as Stripe. We do not store or have access to your full payment card details.",
            },
            {
              title: "4. Sharing of Information",
              body: "We do not sell, trade, or rent your personal information. We may share information only with trusted service providers necessary to operate our business (e.g., payment processors) or when required by law.",
            },
            {
              title: "5. Data Security",
              body: "We take reasonable measures to protect your information from unauthorized access, disclosure, or misuse. However, no system is completely secure.",
            },
            {
              title: "6. Cookies & Tracking",
              body: "Our website may use basic cookies or analytics tools to improve user experience and understand site usage. You can adjust your browser settings to disable cookies.",
            },
            {
              title: "7. Your Rights",
              body: "You may request access to, correction of, or deletion of your personal information by contacting us directly.",
            },
            {
              title: "8. Third-Party Links",
              body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites.",
            },
            {
              title: "9. Updates to This Policy",
              body: "We may update this Privacy Policy from time to time. Updates will be posted on this page.",
            },
            {
              title: "10. Contact Us",
              body: "If you have any questions about this Privacy Policy, please contact us at: jen@coloradotapandtoast.com",
            },
          ].map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {section.title}
              </h2>

              <p className="text-gray-400 leading-relaxed mb-3">
                {section.body}
              </p>

              {section.list && (
                <ul className="list-disc pl-6 text-gray-400 space-y-2">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">
              By using our services, you acknowledge and agree to this Privacy Policy.
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}