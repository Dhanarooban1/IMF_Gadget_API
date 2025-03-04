import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../middleware/authMiddleware.js';
const prisma = new PrismaClient();

export const signupAdmin = async (req, res) => {
    const { admin_name, admin_email, password } = req.body;
  
    try {
      const existingAdmin = await prisma.admin.findUnique({
        where: { admin_email },
      });
  
      if (existingAdmin) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await prisma.admin.create({
        data: { admin_name, admin_email, password: hashedPassword },
      });
  
      const token = generateToken(admin.admin_id);
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error:', error.message || error);
      res.status(500).json({ error: 'Signup failed' });
    }
  };
  

export const loginAdmin = async (req, res) => {
  const { admin_email, password } = req.body;

  
  try {
    const admin = await prisma.admin.findUnique({ where: { admin_email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
   
   
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Login failed' });
  }
};
