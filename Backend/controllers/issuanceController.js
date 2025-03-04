import prisma from '../config/database.js';
import { apiResponse } from '../utils/apiResponse.js';

export const issuanceController = {

  getAllIssuances: async (req, res) => {
    try {
      const issuances = await prisma.issuance.findMany({
        include: {
          issuance_member: true,
          Book: true
        }
      });
      return apiResponse.success(res, issuances);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  // Get issuance by ID
  getIssuanceById: async (req, res) => {
    try {
      const { id } = req.params;
      const issuance = await prisma.issuance.findUnique({
        where: { issuance_id: parseInt(id) },
        include: {
          Member: true,
          Book: true
        }
      });
      
      if (!issuance) {
        return apiResponse.error(res, 'Issuance not found', 404);
      }
      
      return apiResponse.success(res, issuance);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  // Create new issuance
  createIssuance: async (req, res) => {
    try {
      const {
        book_id,
        issuance_member,
        issued_by,
        target_return_date
      } = req.body;
      
      const issuance = await prisma.issuance.create({
        data: {
          book_id: parseInt(book_id),
          issuance_member: parseInt(issuance_member),
          issued_by,
          issuance_date: new Date(),
          target_return_date: new Date(target_return_date),
          issuance_status: 'BORROWED'
        },
        include: {
          Member: true,
          Book: true
        }
      });
      
      return apiResponse.success(res, issuance, 'Issuance created successfully', 201);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  // Update issuance
  updateIssuance: async (req, res) => {
    try {
      const { id } = req.params;
      const { issuance_status, target_return_date } = req.body;
      
      const issuance = await prisma.issuance.update({
        where: { issuance_id: parseInt(id) },
        data: {
          issuance_status,
          target_return_date: target_return_date ? new Date(target_return_date) : undefined
        },
        include: {
          Member: true,
          Book: true
        }
      });
      
      return apiResponse.success(res, issuance, 'Issuance updated successfully');
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }
};

