export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please review the terms governing your booking with Colorado Tap & Toast.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">

          <p className="text-gray-300 mb-6 leading-relaxed">
            THIS SERVICES AGREEMENT (the &ldquo;Agreement&rdquo;) is made effective as of the date of booking between Colorado Tap &amp; Toast, located in Littleton, CO (&ldquo;Company&rdquo;), and the client (&ldquo;Client&rdquo;).
          </p>
          <p className="text-gray-400 mb-6 leading-relaxed">
            WHEREAS, Company provides a mobile bar trailer and bartending service, and Client desires to engage Company for such services; NOW, THEREFORE, in consideration of the mutual covenants herein, the parties agree as follows.
          </p>

          {[
            {
              title: "1. Purpose of Engagement",
              body: "Client retains Company to provide mobile bar services for the event as defined, including trailer setup and bartending services for the contracted hours.",
            },
            {
              title: "2. Services & Responsibilities",
              body: "Company provides mobile bar setup and service. Client is responsible for all alcohol, mixers, garnishes, and consumables. Company provides standard bartending tools and service only.",
            },
            {
              title: "3. Client Contact",
              body: "Client shall designate a primary contact responsible for coordination, communication, and approvals related to the event.",
            },
            {
              title: "4. Term of Services",
              body: "This Agreement is effective upon booking and remains in effect through completion of the scheduled event date and time.",
            },
            {
              title: "5. Compensation & Payment",
              body: "A 50% non-refundable deposit is required to secure the date. Remaining balance is due 10 days prior. All payments are non-refundable and subject to agreed pricing and mileage.",
            },
            {
              title: "6. Expenses & Late Payments",
              body: "Approved expenses must be authorized in writing. Late payments may incur a 5% weekly penalty after 10 days past due.",
            },
            {
              title: "7. Work Changes",
              body: "Any changes or additional services must be agreed upon in writing and may require a revised agreement.",
            },
            {
              title: "8. Independent Contractor",
              body: "Company operates as an independent contractor and is not an employee or agent of Client.",
            },
            {
              title: "9. Limitation of Liability",
              body: "Company is not liable for indirect or consequential damages. Total liability is limited to fees paid by Client.",
            },
            {
              title: "10. Indemnification",
              body: "Client agrees to indemnify and hold Company harmless from claims, damages, or liabilities arising from the event, including alcohol-related incidents.",
            },
            {
              title: "11. Disclaimer of Warranties",
              body: "Services are provided as-is. Company disclaims all warranties to the fullest extent permitted by law.",
            },
            {
              title: "12. Non-Solicitation",
              body: "Client shall not solicit Company staff for 12 months following the event.",
            },
            {
              title: "13. Assignment",
              body: "This Agreement may not be assigned without written consent from Company.",
            },
            {
              title: "14. Attorneys’ Fees",
              body: "The prevailing party in any dispute shall be entitled to recover reasonable legal fees and costs.",
            },
            {
              title: "15. Severability",
              body: "If any provision is invalid, the remainder of the Agreement remains enforceable.",
            },
            {
              title: "16. Governing Law",
              body: "This Agreement is governed by the laws of the State of Colorado.",
            },
            {
              title: "17. Entire Agreement & Amendments",
              body: "This Agreement constitutes the full agreement between parties and may only be modified in writing.",
            },
            {
              title: "18. Electronic Signatures & Marketing Use",
              body: "Electronic signatures are valid. Client grants Company permission to use event name/photos for marketing unless otherwise requested.",
            },
            {
              title: "19. Force Majeure",
              body: "Company is not liable for failure to perform due to events beyond its control including weather, disasters, or emergencies.",
            },
          ].map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {section.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}

          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">
              By booking services, Client acknowledges and agrees to these Terms & Conditions.
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}