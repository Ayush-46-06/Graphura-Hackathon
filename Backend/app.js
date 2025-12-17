import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import hackathonRoutes from "./routes/hackathon.routes.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/hackathons",hackathonRoutes)

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});


app.use(errorMiddleware);

export default app;
