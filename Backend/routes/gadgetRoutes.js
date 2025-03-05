import express from 'express';
import gadgetController from '../controllers/gadgetController.js';

const router = express.Router();

router.get('/get', gadgetController.getGadgets);
router.get('/get/admin',gadgetController.getGadgetsByAdmin);

router.post('/add', gadgetController.addGadget);
router.get('/status/:status', gadgetController.getGadgetsByStatus);
router.patch('/update/:gadgetid', gadgetController.updateGadget);
router.delete('/delete/:gadgetid', gadgetController.deleteGadget);
router.post('/self-destruct/:gadgetid', gadgetController.selfDestruct);

export default router;