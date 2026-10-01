export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const data = await req.json();

    const message = `
📋 NEW LOAN APPLICATION

👤 Name: ${data.name}
📱 Phone: ${data.phone}
💰 Amount: ${data.amount}
🎯 Purpose: ${data.purpose}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    if (!response.ok) {
      return new Response("Telegram notification failed", {
        status: 500
      });
    }

    return Response.json({
      success: true
    });

  } catch (error) {
    return new Response("Invalid request", {
      status: 400
    });
  }
};
