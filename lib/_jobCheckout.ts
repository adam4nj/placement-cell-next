import _stripe from "stripe";

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

//create
export const account = stripe.accounts.create({
  type: "custom",
  country: "US",
  email: "jenny.rosen@example.com",
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
});

//retrieve
