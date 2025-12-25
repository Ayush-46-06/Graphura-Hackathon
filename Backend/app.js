import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import hackathonRoutes from "./routes/hackathon.routes.js"
import blogRoutes from "./routes/blog.routes.js"
import analyticsRoutes from "./routes/analytics.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import path from "path"
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/certificates",
  express.static(path.join(__dirname, "uploads", "certificates"))
)


app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/hackathon", hackathonRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/transaction", transactionRoutes)
app.use("/api/admin", adminRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(errorMiddleware);

export default app;