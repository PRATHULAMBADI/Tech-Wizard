
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log(req.headers)
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token+"-------------------------------------------")

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id+"+++++++++++++++++++++++++++++++++++++++++")

    // Ensure the decoded token contains necessary data for an organizer/user
    if (decoded && decoded.id) {
      req.organizer = { _id: decoded.id }; 
      req.user = { _id: decoded.id };
      
      req.token = token;
      next();
    } else {
      throw new Error('Invalid token payload');
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
