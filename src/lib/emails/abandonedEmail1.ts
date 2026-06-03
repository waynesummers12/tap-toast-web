interface Quote {
  id: string
  name?: string
  event_date?: string
  guests?: number
}

export function abandonedEmail1(quote: Quote) {
  return {
    subject: "You’re one step away from an unforgettable event 🍸",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111;">
        <h2>Hey ${quote.name || "there"},</h2>

        <p>You were <strong>so close</strong> to locking in your Tap & Toast experience.</p>

        <p>We saved everything for you — so you can pick up right where you left off in seconds.</p>

        <div style="margin:16px 0; padding:12px; background:#f8f6f1; border-radius:6px;">
          <strong>Your event details:</strong>
          <ul style="margin:8px 0 0 16px;">
            <li>Date: ${quote.event_date || "TBD"}</li>
            <li>Guests: ${quote.guests || "TBD"}</li>
          </ul>
        </div>

        <p style="margin-top:16px;">
          <strong>Quick heads up:</strong> our most requested dates (especially weekends) tend to book out fast.
        </p>

        <p>If you’re still considering Tap & Toast, now’s the best time to secure your spot before it’s gone.</p>

        <a href="https://tapandtoast.com/book?cid=${quote.id}"
           style="display:inline-block;margin-top:18px;padding:14px 22px;background:#c6a25a;color:black;font-weight:bold;text-decoration:none;border-radius:6px;">
          Finish Your Booking
        </a>

        <p style="margin-top:22px; font-size:14px; color:#555;">
          Have questions or want help customizing your event? Just reply to this email — we’re happy to help.
        </p>

        <p style="margin-top:16px;">— Tap & Toast 🍸</p>
      </div>
    `
  }
}