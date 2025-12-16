import app from "./app.js";
import connectDB from "./config/db.js";
import { config } from "./config/env.js";

const PORT = config.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
