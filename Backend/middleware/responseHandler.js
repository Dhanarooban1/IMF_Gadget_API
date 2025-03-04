// Success response
export const successHandler = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  };
  
  // Error response
  export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
      status: 'error',
      message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  