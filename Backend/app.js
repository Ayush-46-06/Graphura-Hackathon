import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRoutes)

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});


app.use(errorMiddleware);

export default app;
