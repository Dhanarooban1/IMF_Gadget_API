import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from '../middleware/asyncHandler.js';
import { successHandler,errorHandler } from '../middleware/responseHandler.js';

const prisma = new PrismaClient();

const generateRandomCodename = () => {
  const codenames = ['The Nightingale', 'The Kraken', 'Phantom', 'Shadow'];
  return codenames[Math.floor(Math.random() * codenames.length)];
};

const generateSuccessProbability = () => `${Math.floor(Math.random() * 100)}% success probability`;

const getGadgets = asyncHandler(async (req, res) => {
  const gadgets = await prisma.gadget.findMany({
    include: {
      admin: {
        select: {
          username: true,
        },
      },
    },
  });

  const gadgetsWithCreatedBy = gadgets.map(({ adminId,admin, ...gadget }) => ({
    ...gadget,
    createdBy: admin ? admin.username : 'Unknown',
    successProbability: generateSuccessProbability(),
  }));

  successHandler(res, gadgetsWithCreatedBy);
});


const getGadgetsByAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.user;

  const gadgets = await prisma.gadget.findMany({
    where: { adminId },
    include: {
      admin: {
        select: {
          username: true,
        },
      },
    },
  });

  const gadgetsWithCreatedBy = gadgets.map(({ adminId, admin, ...gadget }) => ({
    ...gadget,
    createdBy: admin ? admin.username : 'Unknown',
  }));

  if (gadgetsWithCreatedBy.length === 0) {
    return successHandler(res, [], 'No gadgets created by this admin');
  }

  successHandler(res, gadgetsWithCreatedBy);
});



const addGadget = asyncHandler(async (req, res) => {
  const { name, status,  } = req.body;
  const {adminId} = req.user;
  if (!adminId) {
    return errorHandler(res, 'Admin ID is required', 400);
  }
  
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
  });

  if (!admin) {
    return errorHandler(res, 'Admin not found', 404);
  }


  const newGadget = await prisma.gadget.create({
    data: {
      id: uuidv4(),
      name: name || generateRandomCodename(),
      status: status || 'Available',
      adminId: admin.id, 
    },
  });

  successHandler(res, newGadget, 'Gadget added successfully', 201);
});



const getGadgetsByStatus = asyncHandler(async (req, res) => {
  const { status } = req.query;
  if (!status) {
    return errorHandler(res, 'Status query parameter is required', 400);
  }
  const gadgets = await prisma.gadget.findMany({
    where: { status },
  });
  successHandler(res, gadgets);
});





const updateGadget = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  const gadget = await prisma.gadget.findUnique({ where: { id } });
  if (!gadget || gadget.adminId !== req.user.id) {
    return errorHandler(res, 'Unauthorized or gadget not found', 403);
  }

  const updatedGadget = await prisma.gadget.update({
    where: { id },
    data: { name, status },
  });
  successHandler(res, updatedGadget, 'Gadget updated successfully');
});

const deleteGadget = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const gadget = await prisma.gadget.findUnique({ where: { id } });
  if (!gadget || gadget.adminId !== req.user.id) {
    return errorHandler(res, 'Unauthorized or gadget not found', 403);
  }

  const decommissionedGadget = await prisma.gadget.update({
    where: { id },
    data: { status: 'Decommissioned', decommissionedAt: new Date() },
  });
  successHandler(res, decommissionedGadget, 'Gadget decommissioned successfully');
});

const selfDestruct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const gadget = await prisma.gadget.findUnique({ where: { id } });
  if (!gadget || gadget.adminId !== req.user.id) {
    return errorHandler(res, 'Unauthorized or gadget not found', 403);
  }

  const destroyedGadget = await prisma.gadget.update({
    where: { id },
    data: { status: 'Destroyed' },
  });
  successHandler(res, { destroyedGadget, confirmationCode }, 'Gadget self-destructed');
});



export default { getGadgets, addGadget, updateGadget, deleteGadget, selfDestruct ,getGadgetsByStatus,getGadgetsByAdmin };
