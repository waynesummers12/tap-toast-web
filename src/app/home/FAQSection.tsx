

"use client"
import { useState } from "react"

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      question: "What areas do you serve?",
      answer:
        "We primarily serve the Front Range of Colorado including Denver, Boulder, Fort Collins, Colorado Springs, and surrounding areas. We are also open to traveling anywhere within the state for the right event.",
    },
    {
      question: "Do you provide alcohol?",
      answer:
        "No. Due to Colorado liquor laws we do not provide alcohol. The client supplies the alcohol and we provide the mobile bar, professional bartending service, and the complete drink experience.",
    },
    {
      question: "Is a deposit required to book?",
      answer:
        "Yes. A 50% deposit is required at the time of booking to reserve your date. The remaining balance is automatically collected 10 days before your event.",
    },
  ]

  return (
    <section className="bg-gray-100 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light tracking-[0.2em] text-[#9C7A2C] uppercase mb-6">
            FAQ
          </h2>
          <div className="w-16 h-[2px] bg-black mx-auto" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 font-semibold flex justify-between items-center text-black"
              >
                {faq.question}
                <span className="text-[#9C7A2C] text-xl">
                  {open === i ? "−" : "+"}
                </span>
              </button>

              {open === i && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}