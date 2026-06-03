interface Quote {
  name?: string;
  event_date: string;
  guests?: number;
  id: string;
}

export function abandonedEmail3(quote: Quote) {
  return {
    subject: "Last chance before your date fills up",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hey ${quote.name || "there"},</h2>

        <p>This is your last reminder — your event date may not stay open much longer.</p>

        <p><strong>Your event:</strong></p>
        <ul>
          <li>Date: ${quote.event_date}</li>
          <li>Guests: ${quote.guests}</li>
        </ul>

        <p>If you still want Tap & Toast, now’s the time to secure it.</p>

        <a href="https://tapandtoast.com/book?cid=${quote.id}"
           style="display:inline-block;padding:12px 20px;background:#c6a25a;color:black;border-radius:6px;">
          Lock It In Now
        </a>

        <p style="margin-top:20px;">— Tap & Toast 🍸</p>
      </div>
    `
  }
}