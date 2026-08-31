interface Quote {
  name?: string;
  cid: string;
  event_date: string;
  guests?: number;
}

export function abandonedEmail2(quote: Quote) {
  return {
    subject: "Your date is still open — but it may not stay that way",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111;">
        <h2>Hey ${quote.name || "there"},</h2>

        <p>Just a quick heads up — your event date is <strong>still available</strong>… for now.</p>

        <p>Most of our bookings (especially weekends) get locked in quickly, and once a date is gone, it’s gone.</p>

        <div style="margin:16px 0; padding:12px; background:#f8f6f1; border-radius:6px;">
          <strong>Your event details:</strong>
          <ul style="margin:8px 0 0 16px;">
            <li>Date: ${quote.event_date || "TBD"}</li>
            <li>Guests: ${quote.guests || "TBD"}</li>
          </ul>
        </div>

        <p>If you’re still thinking about Tap & Toast, we’d love to help make this effortless for you — but the best move is to secure your date now before someone else does.</p>

        <a href="https://tapandtoast.com/book?cid=${quote.cid}"
           style="display:inline-block;margin-top:18px;padding:14px 22px;background:#c6a25a;color:black;font-weight:bold;text-decoration:none;border-radius:6px;">
          Reserve Your Date Now
        </a>

        <p style="margin-top:22px; font-size:14px; color:#555;">
          Want help customizing everything? Just reply — we’ll take care of it with you.
        </p>

        <p style="margin-top:16px;">— Tap & Toast 🍸</p>
      </div>
    `
  }
}