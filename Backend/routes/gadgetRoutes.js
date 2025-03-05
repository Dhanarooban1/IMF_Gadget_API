import express from 'express';
import gadgetController from '../controllers/gadgetController.js';

const router = express.Router();

router.get('/', gadgetController.getGadgets);
router.post('/', gadgetController.addGadget);

router.patch('/:gadgetid', gadgetController.updateGadget);
router.delete('/:gadgetid', gadgetController.deleteGadget);

router.get('/admin',gadgetController.getGadgetsByAdmin);
router.get('/:status', gadgetController.getGadgetsByStatus);
router.post('/:gadgetid/self-destruct', gadgetController.selfDestruct);

export default router;