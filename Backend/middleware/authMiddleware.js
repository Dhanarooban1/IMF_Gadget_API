import jwt from 'jsonwebtoken';


export const generateToken = (adminId) => 
  jwt.sign({ adminId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });


export const verifyAdminToken = (req, res, next) => {
  const token = req.headers.Authorization; 
 
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = { adminId: decoded.adminId };
    next();
  });
};
