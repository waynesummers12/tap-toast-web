interface Quote {
  name?: string;
  event_date: string;
  guests?: number;
  cid: string;
}

export function abandonedEmail3(quote: Quote) {
  return {
    subject: "Final call — your event date may not be available after today",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111;">
        <h2>Hey ${quote.name || "there"},</h2>

        <p>This is a quick final heads up about your Tap & Toast event.</p>

        <p>Your selected date is <strong>still open right now</strong> — but we can’t guarantee it will stay that way.</p>

        <div style="margin:16px 0; padding:12px; background:#f8f6f1; border-radius:6px;">
          <strong>Your event details:</strong>
          <ul style="margin:8px 0 0 16px;">
            <li>Date: ${quote.event_date || "TBD"}</li>
            <li>Guests: ${quote.guests || "TBD"}</li>
          </ul>
        </div>

        <p>We’d genuinely love to be part of your event — and once your date is booked, it’s gone for good.</p>

        <p>If this is something you still want, now’s the moment to lock it in.</p>

        <a href="https://tapandtoast.com/book?cid=${quote.cid}"
           style="display:inline-block;margin-top:18px;padding:14px 22px;background:#c6a25a;color:black;font-weight:bold;text-decoration:none;border-radius:6px;">
          Secure Your Date Now
        </a>

        <p style="margin-top:22px; font-size:14px; color:#555;">
          Questions? Just reply — we’re here to help.
        </p>

        <p style="margin-top:16px;">— Tap & Toast 🍸</p>
      </div>
    `
  }
}