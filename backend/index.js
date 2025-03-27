import express from "express";
import cors from "cors";
import config from "./config.js";
import adminRoute from "./routes/adminRoute.js";
import itemRoute from "./routes/itemRoute.js"; // Import the item route
import userRoute from "./routes/userRoute.js"; // Import the user route
import messageRoute from "./routes/messageRoute.js";
import { sendMail } from "./email/mailer.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", adminRoute); // Admin routes
app.use("/api", itemRoute); // Item routes
app.use("/api", userRoute);
app.use("/api", messageRoute);
app.post("/send-email", (req, res) => {
  const { email, subject, message } = req.body;
  sendMail(email, subject, message);
  res.send("Email sent!");
});
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

app.listen(config.port, () => {
  console.log(`Server is live @ ${config.hostUrl}`);
});
