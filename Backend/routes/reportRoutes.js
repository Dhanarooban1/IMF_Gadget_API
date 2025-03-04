import express from 'express';
import { reportController } from '../controllers/reportController.js';

const router = express.Router();

router.get('/never-borrowed', reportController.getNeverBorrowedBooks);
router.get('/outstanding', reportController.getOutstandingBooks);
router.get('/top-borrowed', reportController.getTopBorrowedBooks);

export default router;