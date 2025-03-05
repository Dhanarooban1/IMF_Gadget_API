import express from 'express';
import gadgetController from '../controllers/gadgetController.js';

const router = express.Router();

router.get('/get', gadgetController.getGadgets);
router.get('/get/admin',gadgetController.getGadgetsByAdmin);

router.post('/add', gadgetController.addGadget);
router.get('/status/:status', gadgetController.getGadgetsByStatus);
router.patch('/update', gadgetController.updateGadget);
router.delete('/delete', gadgetController.deleteGadget);
router.post('/self-destruct', gadgetController.selfDestruct);

export default router;