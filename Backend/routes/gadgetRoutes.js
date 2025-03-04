import express from 'express';
import gadgetController from '../controllers/gadgetController.js';

const router = express.Router();

router.get('/get', gadgetController.getGadgets);
router.post('/add', gadgetController.addGadget);
router.get('/gadgets', gadgetController.getGadgetsByStatus);
router.patch('/:id', gadgetController.updateGadget);
router.delete('/:id', gadgetController.deleteGadget);
router.post('/:id/self-destruct', gadgetController.selfDestruct);

export default router;