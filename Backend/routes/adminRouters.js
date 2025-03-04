import express from 'express';
import { signup, login, updateAdmin, deleteAdmin} from '../controllers/adminController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.patch('/update/:id',verifyAdminToken,updateAdmin)
router.delete('/delete/:id',verifyAdminToken,deleteAdmin)


export default router;