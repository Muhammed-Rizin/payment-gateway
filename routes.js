import { Router } from "express";
import payments from "./routes/payment.router.js";

const app = Router();

app.get("/", (req, res) => res.send("Server Running 🚀"));
app.use("/payments", payments);

export default app;
