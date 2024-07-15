import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (request: NextRequest) => {
  try {
    const { amount } = await request.json();

    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: `Internal Server Error${err}`,
      },
      { status: 500 }
    );
  }
};
