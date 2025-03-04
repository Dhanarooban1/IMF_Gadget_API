import express from 'express';
import gadgetController from '../controllers/gadgetController.js';

const router = express.Router();

router.get('/', gadgetController.getGadgets);
router.post('/add', gadgetController.addGadget);
router.patch('/:id', gadgetController.updateGadget);
router.delete('/:id', gadgetController.deleteGadget);
router.post('/:id/self-destruct', gadgetController.selfDestruct);

export default router;