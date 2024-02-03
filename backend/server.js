import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Webhook } from "svix";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cors());

// Real code
app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      console.log("Received payload:", payloadString);
      console.log("Received headers:", svixHeaders);

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);

      console.log("Webhook event:", evt);

      const { id, ...attributes } = evt.data;
      // Handle the webhooks
      const eventType = evt.type;
      if (eventType === "user.created") {
        console.log(`User ${id} was ${eventType}`);
        console.log(attributes);
      }
      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
