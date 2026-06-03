interface Quote {
  id: string
  name?: string
  event_date?: string
  guests?: number
}

export function abandonedEmail1(quote: Quote) {
  return {
    subject: "You’re almost booked 🍸",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hey ${quote.name || "there"},</h2>

        <p>You were just one step away from locking in your Tap & Toast event.</p>

        <p><strong>Your event:</strong></p>
        <ul>
          <li>Date: ${quote.event_date}</li>
          <li>Guests: ${quote.guests}</li>
        </ul>

        <p>Want us to handle everything for you? We’ve got you.</p>

        <a href="https://tapandtoast.com/book?cid=${quote.id}"
           style="display:inline-block;padding:12px 20px;background:#c6a25a;color:black;border-radius:6px;">
          Finish Booking
        </a>

        <p style="margin-top:20px;">— Tap & Toast 🍸</p>
      </div>
    `
  }
}