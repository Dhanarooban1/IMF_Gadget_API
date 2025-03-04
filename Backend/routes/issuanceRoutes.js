import express from 'express';
import { issuanceController } from '../controllers/issuanceController.js';

const router = express.Router();

router.get('/', issuanceController.getAllIssuances);
router.get('/:id', issuanceController.getIssuanceById);
router.post('/', issuanceController.createIssuance);
router.put('/:id', issuanceController.updateIssuance);

export default router;
