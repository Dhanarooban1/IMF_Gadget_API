import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { successHandler } from '../middleware/responseHandler.js';
import passwordService from '../utils/passutil.js';
const prisma = new PrismaClient();

const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const adminExists = await prisma.admin.findUnique({ where: { username } });
  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const hashedPassword = await passwordService.hashPassword(password);
  const admin = await prisma.admin.create({
    data: { username, password: hashedPassword },
  });

  successHandler(res, { id: admin.id, username: admin.username, token: generateToken(admin.id) }, 'Admin registered', 201);
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { username } });
  if(!admin){
    throw new Error('Invaild username');
  }
  if (admin) {
    const { valid } = await passwordService.verifyPassword(password, admin.password);
    if (valid) {
      successHandler(res, { id: admin.id, username: admin.username, token: generateToken(admin.id) }, 'Login successful');
      return;
    } 
  }

  res.status(401);
  throw new Error('Invalid password');
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const { adminId } = req.user;
  if(!adminId){
    throw new Error('No adminId recived from token');
  }
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    return res.status(404).json({ status: 'error', message: 'Admin not found' });
  }

  const hashedPassword = password ? await passwordService.hashPassword(password) : admin.password;

  const updatedAdmin = await prisma.admin.update({
    where: { id: adminId },
    data: { username, password: hashedPassword },
  });

  successHandler(res, updatedAdmin, 'Admin updated successfully');
});



const deleteAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.user;
  const id = adminId;
  await prisma.admin.delete({ where: { id } });
  successHandler(res, null, 'Admin deleted successfully');
});

export { signup, login, updateAdmin, deleteAdmin };
