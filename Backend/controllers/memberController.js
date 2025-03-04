import prisma from '../config/database.js';
import { apiResponse } from '../utils/apiResponse.js';

export const memberController = {

  getAllMembers: async (req, res) => {
    try {
      const members = await prisma.member.findMany({
        include: {
          memberships: true,
          issuances: true
        }
      });
      return apiResponse.success(res, members);
    } catch (error) {
      console.log(error)
      return apiResponse.error(res, error.message);
    }
  },

  // Get member by ID
  getMemberById: async (req, res) => {
    try {
      const { id } = req.params;

      const member = await prisma.member.findUnique({
        where: { mem_id: parseInt(id) },
        include: {
          memberships : true,
          issuances : true  
        }
      });
      
      if (!member) {
        return apiResponse.error(res, 'Member not found', 404);
      }
      
      return apiResponse.success(res, member);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  // Create new member
  createMember: async (req, res) => {
    try {
      const { mem_name, mem_phone, mem_email } = req.body;
      
      const member = await prisma.member.create({
        data: {
          mem_name,
          mem_phone,
          mem_email,
        },
        include: {
          memberships : true
        }
      });
      
      return apiResponse.success(res, member, 'Member created successfully', 201);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  // Update member
  updateMember: async (req, res) => {
    try {
      const { id } = req.params;
    
      const { mem_name, mem_phone, mem_email } = req.body;
      const member = await prisma.member.update({
        where: { mem_id: parseInt(id) },
        data: {
          mem_name,
          mem_phone,
          mem_email,
        },
        include: {
          memberships : true
        }
      });
      
      return apiResponse.success(res, member, 'Member updated successfully');
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }
};