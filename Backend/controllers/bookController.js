import prisma from '../config/database.js';
import { apiResponse } from '../utils/apiResponse.js';

export const bookController = {
 
  getAllBooks: async (req, res) => {
    try {
      const books = await prisma.book.findMany({
        include: {
          Category: true,
          Collection: true,
          Issuances: true
        }
      });
      return apiResponse.success(res, books);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },


  getBookById: async (req, res) => {
    try {
      const { id } = req.params;
      const book = await prisma.book.findUnique({
        where: { book_id: parseInt(id) },
        include: {
          Category: true,
          Collection: true,
          Issuances: true
        }
      });
      
      if (!book) {
        return apiResponse.error(res, 'Book not found', 404);
      }
      
      return apiResponse.success(res, book);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  },

  
createBook: async (req, res) => {
  try {
    const {
      book_name,
      book_cat_id,
      book_collection_id,
      book_launch_date,
      book_publisher
    } = req.body;

  
    const category = await prisma.category.findUnique({
      where: { cat_id: parseInt(book_cat_id) }
    });

    if (!category) {
      return apiResponse.error(res, 'Invalid book_cat_id: Category not found', 400);
    }

    const collection = await prisma.collection.findUnique({
      where: { collection_id: parseInt(book_collection_id) }
    });

    if (!collection) {
      return apiResponse.error(res, 'Invalid book_collection_id: Collection not found', 400);
    }

    const book = await prisma.book.create({
      data: {
        book_name,
        book_cat_id: parseInt(book_cat_id),
        book_collection_id: parseInt(book_collection_id),
        book_launch_date: new Date(book_launch_date),
        book_publisher
      },
      include: {
        Category: true,
        Collection: true
      }
    });

    return apiResponse.success(res, book, 'Book created successfully', 201);
  } catch (error) {
    return apiResponse.error(res, error.message);
  }
},


  // Update book
  updateBook: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        book_name,
        book_cat_id,
        book_collection_id,
        book_launch_date,
        book_publisher
      } = req.body;
      
      const book = await prisma.book.update({
        where: { book_id: parseInt(id) },
        data: {
          book_name,
          book_cat_id: parseInt(book_cat_id),
          book_collection_id: parseInt(book_collection_id),
          book_launch_date: new Date(book_launch_date),
          book_publisher
        },
        include: {
          Category: true,
          Collection: true
        }
      });
      
      return apiResponse.success(res, book, 'Book updated successfully');
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }
};