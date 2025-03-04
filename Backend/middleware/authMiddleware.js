import jwt from 'jsonwebtoken';


export const generateToken = (adminId) => 
  jwt.sign({ adminId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });





export const verifyAdminToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
   
    return res.status(401).json({ error: 'No Token' });
  }
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
   
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
