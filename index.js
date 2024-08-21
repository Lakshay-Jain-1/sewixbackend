import express from "express"
import cors from "cors"
import Stripe from "stripe"
const app = express()
const stripe = new Stripe("sk_test_51P4Re4SDWrf3hkbmcbj3TxgSZcLgKOEET2gfpFMIhNx2JDEIF3fFUu3PHyL3EDJ7mm3eUDi3Fs08RracAUja1uVT009uRygTal");
app.use(cors())

app.post("/makepayment", async (req, res) => {
    const { total } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: 'usd', // You can change this to the relevant currency
              product_data: {
                name: 'Total Amount',
              },
              unit_amount: total, // total should be in the smallest currency unit (e.g., cents for USD)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: 'https://yourdomain.com/success', // Replace with your success URL
        cancel_url: 'https://yourdomain.com/cancel', // Replace with your cancel URL
      });
  
      res.send({ id: session.id });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.status(500).send({ error: "Failed to create payment session" });
    }
  });
  
app.get("/",(req,res)=>{
    res.send("dashjsdjak")
})



app.listen(4000,()=>{
    console.log("server is connected")
})