interface Quote {
  name?: string;
  id: string;
  event_date: string;
  guests?: number;
}

export function abandonedEmail2(quote: Quote) {
  return {
    subject: "Your date is still open — but not for long",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hey ${quote.name || "there"},</h2>

        <p>Your event date is still available… but weekends book fast.</p>

        <p><strong>Your event:</strong></p>
        <ul>
          <li>Date: ${quote.event_date}</li>
          <li>Guests: ${quote.guests}</li>
        </ul>

        <p>We’d love to lock this in for you before it’s gone.</p>

        <a href="https://tapandtoast.com/book?cid=${quote.id}"
           style="display:inline-block;padding:12px 20px;background:#c6a25a;color:black;border-radius:6px;">
          Reserve Your Date
        </a>

        <p style="margin-top:20px;">— Tap & Toast 🍸</p>
      </div>
    `
  }
}