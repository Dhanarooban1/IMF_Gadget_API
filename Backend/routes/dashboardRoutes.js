import express from 'express';
import { dashboardController } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/pending-returns', dashboardController.getPendingReturns);

export default router;  