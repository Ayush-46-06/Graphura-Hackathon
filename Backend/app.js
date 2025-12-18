import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import hackathonRoutes from "./routes/hackathon.routes.js"
import blogRoutes from "./routes/blog.routes.js"
import analyticsRoutes from "./routes/analytics.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/hackathon",hackathonRoutes)
app.use("/api/blog",blogRoutes)
app.use("/api/analytics",analyticsRoutes)
app.use("/api/transaction",transactionRoutes)
app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});


app.use(errorMiddleware);

export default app;
