import express from 'express';
import gadgetController from '../controllers/gadgetController.js';

const router = express.Router();

router.get('/get', gadgetController.getGadgets);
router.post('/add', gadgetController.addGadget);
router.patch('/update/:gadgetid', gadgetController.updateGadget);
router.delete('/delete/:gadgetid', gadgetController.deleteGadget);

router.get('/get/admin',gadgetController.getGadgetsByAdmin);
router.get('/status/:status', gadgetController.getGadgetsByStatus);
router.post('/self-destruct/:gadgetid', gadgetController.selfDestruct);

export default router;