export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Clear expectations around deposits, cancellations, and rescheduling.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">

          <p className="text-gray-300 mb-6 leading-relaxed">
            This Refund & Cancellation Policy applies to all bookings made with Colorado Tap & Toast (&ldquo;Company&rdquo;). By reserving services, you agree to the terms outlined below.
          </p>

          {[
            {
              title: "1. Deposits",
              body: "A 50% deposit is required to secure your event date. All deposits are non-refundable under any circumstances.",
            },
            {
              title: "2. Final Payment",
              body: "The remaining balance is due no later than 10 days prior to your event. Failure to submit final payment may result in cancellation of services without refund of deposit.",
            },
            {
              title: "3. Client Cancellations",
              body: "If Client cancels an event for any reason:",
              list: [
                "More than 10 days before event: Deposit is retained, no additional charges.",
                "Within 10 days of event: 100% of total booking amount is owed and non-refundable.",
              ],
            },
            {
              title: "4. Rescheduling",
              body: "Rescheduling requests may be accommodated at the sole discretion of Company and are subject to availability. Deposits may be applied to a new date only if rescheduling is approved.",
            },
            {
              title: "5. Company Cancellations",
              body: "In the rare event Company must cancel due to unforeseen circumstances, Client will receive a full refund of all payments made.",
            },
            {
              title: "6. Weather Policy",
              body: "Client is responsible for providing a safe and suitable environment for service. Inclement weather does not qualify for a refund. Company may refuse to operate in unsafe conditions.",
            },
            {
              title: "7. Force Majeure",
              body: "Company shall not be liable for failure to perform due to events beyond its control, including but not limited to natural disasters, government restrictions, or emergencies.",
            },
            {
              title: "8. Chargebacks & Disputes",
              body: "By booking services, Client agrees not to initiate chargebacks without first contacting Company to resolve any disputes. Unauthorized chargebacks may result in legal action.",
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
              By booking with Colorado Tap & Toast, you acknowledge and agree to this Refund & Cancellation Policy.
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}