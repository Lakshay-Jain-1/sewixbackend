import express from "express"
import cors from "cors"
import Stripe from "stripe"
const app = express()
const stripe = new Stripe("sk_test_51P4Re4SDWrf3hkbmcbj3TxgSZcLgKOEET2gfpFMIhNx2JDEIF3fFUu3PHyL3EDJ7mm3eUDi3Fs08RracAUja1uVT009uRygTal");

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
   

app.use(cors(corsOptions))
app.use(express.json())

app.post("/makepayment", async (req, res) => {
    const { total } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: 'usd', 
              product_data: {
                name: 'Total Amount',
              },
              unit_amount: total*100, 
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: 'http://localhost:5173/success', 
        cancel_url: 'http://localhost:5173/failed', 
      });
  
      res.send({ id: session.id });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.status(500).send({ error: "Failed to create payment session" });
    }
  });
  




app.listen(4000,()=>{
    console.log("server is connected")
})