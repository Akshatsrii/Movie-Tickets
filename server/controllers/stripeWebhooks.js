import Stripe from "stripe";
import Booking from "../models/Booking.js"; // ✅ Optional: only if you want to mark booking as paid in DB

export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    // ✅ Verify webhook signature
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("⚠️ Webhook signature verification failed:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;

        // ✅ Find session linked to this payment intent
        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        const session = sessionList.data[0];
        if (!session) {
          console.log("⚠️ No session found for payment intent:", paymentIntent.id);
          break;
        }

        const { bookingId } = session.metadata;
        console.log("✅ Payment successful for Booking ID:", bookingId);

        // ✅ Optional: Update booking status in DB
        if (bookingId) {
          await Booking.findByIdAndUpdate(bookingId, { isPaid: true });
          console.log("💾 Booking marked as paid in database");
        }

        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
        break;
    }

    // ✅ Always respond with 200 OK
    response.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook processing error:", err);
    response.status(500).send("Internal Server Error");
  }
};
