import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { successHandler } from '../middleware/responseHandler.js';

const prisma = new PrismaClient();

const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  const adminExists = await prisma.admin.findUnique({ where: { username } });
  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: { username, password: hashedPassword },
  });

  successHandler(res, { id: admin.id, username: admin.username, token: generateToken(admin.id) }, 'Admin registered', 201);
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    successHandler(res, { id: admin.id, username: admin.username, token: generateToken(admin.id) }, 'Login successful');
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  const updatedAdmin = await prisma.admin.update({
    where: { id },
    data: { username, password: hashedPassword },
  });

  successHandler(res, updatedAdmin, 'Admin updated successfully');
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.admin.delete({ where: { id } });
  successHandler(res, null, 'Admin deleted successfully');
});

export { signup, login, updateAdmin, deleteAdmin };
