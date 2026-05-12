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
            THIS SERVICES AGREEMENT (the &ldquo;Agreement&rdquo;) is made effective as of the date of booking between Colorado Tap & Toast (&ldquo;Company&rdquo;) and the Client (&ldquo;Client&rdquo;).
          </p>

          {[
            {
              title: "1. Services",
              body: "Company provides a mobile bar trailer and bartending service only. Client is solely responsible for providing all alcohol, mixers, garnishes, ice, cups, and any consumables unless otherwise agreed in writing.",
            },
            {
              title: "2. Booking & Payment",
              body: "A 50% non-refundable deposit is required to secure the event date. The remaining balance is due no later than 10 days prior to the event. Failure to complete payment may result in cancellation of services.",
            },
            {
              title: "3. Cancellation Policy",
              body: "All payments made are non-refundable. If Client cancels within 10 days of the event, Company reserves the right to retain all fees paid. Rescheduling may be offered at Company’s discretion based on availability.",
            },
            {
              title: "4. Event Requirements",
              body: "Client must ensure adequate space, safe access, and compliance with venue rules. Client is responsible for securing any permits required by local laws.",
            },
            {
              title: "5. Alcohol Responsibility",
              body: "Company does not provide or sell alcohol. Client assumes full legal responsibility for the purchase, transport, and consumption of alcohol at the event. Company reserves the right to refuse service to intoxicated or underage individuals.",
            },
            {
              title: "6. Liability",
              body: "Company shall not be liable for any damages, injuries, or incidents arising from alcohol consumption, guest behavior, or venue conditions. Company’s total liability shall not exceed the total amount paid by Client.",
            },
            {
              title: "7. Indemnification",
              body: "Client agrees to indemnify and hold harmless Company from any claims, damages, or liabilities resulting from the event, including alcohol-related incidents.",
            },
            {
              title: "8. Damage to Equipment",
              body: "Client is responsible for any damage to Company property caused by guests, vendors, or venue conditions. Repair or replacement costs will be billed to Client.",
            },
            {
              title: "9. Weather & Force Majeure",
              body: "Company is not responsible for delays or failure to perform due to weather, acts of God, or events beyond its control.",
            },
            {
              title: "10. Independent Contractor",
              body: "Company operates as an independent contractor and is not an employee of Client.",
            },
            {
              title: "11. Governing Law",
              body: "This Agreement shall be governed by the laws of the State of Colorado.",
            },
            {
              title: "12. Entire Agreement",
              body: "This document represents the entire agreement between Client and Company.",
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