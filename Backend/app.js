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
import commentRoutes from "./routes/comment.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import reviewRoutes from "./routes/review.routes.js"
import sponsorRoutes from "./routes/sponsors.routes.js"

import collegeRoutes from "./routes/college.routes.js"
import partnerRoutes from "./routes/partner.routes.js"
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
app.use("/api", partnerRoutes)
app.use("/api", sponsorRoutes)
app.use("/api", contactRoutes)
app.use("/api", reviewRoutes)
app.use("/api", collegeRoutes)
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", hackathonRoutes)
app.use("/api", blogRoutes)
app.use("/api", analyticsRoutes)
app.use("/api", transactionRoutes)
app.use("/api", commentRoutes)
app.use("/api", adminRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(errorMiddleware);

export default app;