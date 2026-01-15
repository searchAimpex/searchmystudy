import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cron from "node-cron";

dotenv.config();

const port = process.env.PORT || 5001;
connectDB();

const app = express();

/* =======================
   ✅ CORS (FIXED)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://searchmystudy.com",
  "https://www.searchmystudy.com",
  "https://admin.coursefinder.co.in",
  "https://coursefinder.co.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 REQUIRED FOR PREFLIGHT
app.options("*", cors());

/* =======================
   BODY PARSERS
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =======================
   ROUTES
======================= */
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "all fix" });
});

/* =======================
   CRON JOBS (FIXED)
======================= */
cron.schedule("0 * * * *", () => {
  console.log("Running cleanup for expired intakes...");
  // cleanupExpiredIntakes();
});

/* =======================
   ROOT
======================= */
app.get("/", (req, res) => {
  res.send("API is running....");
});

/* =======================
   ERROR HANDLING
======================= */
app.use(notFound);
app.use(errorHandler);

/* =======================
   START SERVER
======================= */
app.listen(port, () => {
  console.log(`✅ Server started on port ${port}`);
});
