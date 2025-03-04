import cors from "cors";
import { config } from "dotenv";
import express from "express";
import prisma from "./config/database.js";

import limiter from "./middleware/rateLimiter.js"
import { verifyAdminToken } from "./middleware/authMiddleware.js";



import memberRoutes from './routes/memberRoutes.js'
import issuanceRoutes from './routes/issuanceRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import dashboardRouters from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
config();

const PORT = Number(process.env.PORT);

const app = express();

app.use(cors());

app.use(express.json());
app.use(limiter);


app.get("/", (req, res) => {
  res.send("Phoenix Gadget API is running!");
});

app.use('/api/admin',adminRoutes)
app.use('/api/members', verifyAdminToken, memberRoutes);
app.use('/api/books', verifyAdminToken, bookRoutes);
app.use('/api/issuances', verifyAdminToken, issuanceRoutes);
app.use('/api/dashboard', verifyAdminToken, dashboardRouters);
app.use('/api/report', verifyAdminToken, reportRoutes);

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










