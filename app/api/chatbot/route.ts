// app/api/chatbot/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const lowerMessage = message.toLowerCase().trim();

    let reply = "I am sorry, I couldn't understand that. Could you please ask about our mobile accessories, delivery, or discounts?";

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      reply = "Hello! Welcome to Lookshop.pk. How can I help you find the perfect mobile accessory today?";
    } else if (lowerMessage.includes("charger") || lowerMessage.includes("fast charger") || lowerMessage.includes("charging")) {
      reply = "We offer premium 20W Nano and 65W GaN Fast Chargers compatible with both iPhone and Android devices.";
    } else if (lowerMessage.includes("cover") || lowerMessage.includes("case")) {
      reply = "Yes, we have high-quality silicone, leather, and crystal-clear transparent cases for iPhone, Samsung, and Xiaomi models.";
    } else if (lowerMessage.includes("delivery") || lowerMessage.includes("shipping") || lowerMessage.includes("charges")) {
      reply = "Lookshop.pk delivers all across Pakistan within 3 to 5 working days. Our flat shipping rate is only Rs. 150.";
    } else if (lowerMessage.includes("discount") || lowerMessage.includes("offer") || lowerMessage.includes("sale")) {
      reply = "Great news! Our New Year Sale is currently live. Use the promo code 'LOOK20' at checkout to get an instant 20% discount.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ reply: "An error occurred on the server. Please try again." }, { status: 500 });
  }
}