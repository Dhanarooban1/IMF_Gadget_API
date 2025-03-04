import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from '../middleware/asyncHandler.js';
import { successHandler } from '../middleware/responseHandler.js';

const prisma = new PrismaClient();

const generateRandomCodename = () => {
  const codenames = ['The Nightingale', 'The Kraken', 'Phantom', 'Shadow'];
  return codenames[Math.floor(Math.random() * codenames.length)];
};

const generateSuccessProbability = () => `${Math.floor(Math.random() * 100)}% success probability`;

const getGadgets = asyncHandler(async (req, res) => {
  const gadgets = await prisma.gadget.findMany();
  const gadgetsWithProbability = gadgets.map((gadget) => ({
    ...gadget,
    successProbability: generateSuccessProbability(),
  }));
  successHandler(res, gadgetsWithProbability);
});

const addGadget = asyncHandler(async (req, res) => {
  const { name, status } = req.body;
  const newGadget = await prisma.gadget.create({
    data: {
      id: uuidv4(),
      name: name || generateRandomCodename(),
      status: status || 'Available',
    },
  });
  successHandler(res, newGadget, 'Gadget added successfully', 201);
});

const updateGadget = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const updatedGadget = await prisma.gadget.update({
    where: { id },
    data: { name, status },
  });
  successHandler(res, updatedGadget, 'Gadget updated successfully');
});

const deleteGadget = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const decommissionedGadget = await prisma.gadget.update({
    where: { id },
    data: { status: 'Decommissioned', decommissionedAt: new Date() },
  });
  successHandler(res, decommissionedGadget, 'Gadget decommissioned successfully');
});

const selfDestruct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const destroyedGadget = await prisma.gadget.update({
    where: { id },
    data: { status: 'Destroyed' },
  });
  successHandler(res, { destroyedGadget, confirmationCode }, 'Gadget self-destructed');
});

export default { getGadgets, addGadget, updateGadget, deleteGadget, selfDestruct };
