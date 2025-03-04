import prisma from "./config/database.js";
import cors from "cors";
import { config } from "dotenv";
import express from "express";

import limiter from "./middleware/rateLimiter.js"
import { verifyAdminToken } from "./middleware/authMiddleware.js";



import GadgetRoutes from './routes/gadgetRoutes.js'

config();

const PORT = Number(process.env.PORT);

const app = express();

app.use(cors());

app.use(express.json());
app.use(limiter);


app.get("/", (req, res) => {
  res.send("Phoenix Gadget API is running!");
});

app.use('/api/gadgets',GadgetRoutes);
// app.use('/auth', authRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});










