import express from "express";
import mongoose from "mongoose";
import mocksRouter from "./routes/mocks.router.js";
import adoptionRouter from "./routes/adoption.router.js";

const app = express();
app.use(express.json());
app.use("/api/mocks", mocksRouter);
app.use("/api/adoption", adoptionRouter);

if(process.env.NODE_ENV !== "test"){
  mongoose.connect("mongodb://localhost:27017/mocksDB")
    .then(() => console.log("🟢 Connected to MongoDB"))
    .catch(err => console.error("🔴 MongoDB connection error:", err));
  const PORT = 8080;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

export default app;
