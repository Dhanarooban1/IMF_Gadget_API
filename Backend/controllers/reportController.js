
import prisma from '../config/database.js';
import { apiResponse } from '../utils/apiResponse.js';

export const reportController = {
  // 1. Get books that have never been borrowed
  getNeverBorrowedBooks: async (req, res) => {
    try {
      const books = await prisma.book.findMany({
        where: {
          Issuances: {
            none: {}
          }
        },
        select: {
          book_name: true,
          book_publisher: true
        }
      });
      
      return apiResponse.success(res, books);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  // 2. Get outstanding books
  getOutstandingBooks: async (req, res) => {
    try {
      const outstandingBooks = await prisma.issuance.findMany({
        where: {
          issuance_status: 'BORROWED'
        },
        select: {
          Member: {
            select: {
              mem_name: true
            }
          },
          Book: {
            select: {
              book_name: true,
              book_publisher: true
            }
          },
          issuance_date: true,
          target_return_date: true
        }
      });
      
      const formattedResponse = outstandingBooks.map(item => ({
        member_name: item.Member.mem_name,
        book_name: item.Book.book_name,
        author: item.Book.book_publisher,
        issued_date: item.issuance_date,
        target_return_date: item.target_return_date
      }));
      
      return apiResponse.success(res, formattedResponse);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  // 3. Get top 10 most borrowed books
  getTopBorrowedBooks: async (req, res) => {
    try {
      const topBooks = await prisma.book.findMany({
        select: {
          book_name: true,
          _count: {
            select: {
              Issuances: true
            }
          },
          Issuances: {
            select: {
              issuance_member: true
            }
          }
        },
        orderBy: {
          Issuances: {
            _count: 'desc'
          }
        },
        take: 10
      });
      
      const formattedResponse = topBooks.map(book => ({
        book_name: book.book_name,
        times_borrowed: book._count.Issuances,
        unique_members: new Set(book.Issuances.map(i => i.issuance_member)).size
      }));
      
      return apiResponse.success(res, formattedResponse);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }
};