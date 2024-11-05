const jwt = require('jsonwebtoken');
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

module.exports = (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1];
    console.log('Token received:', token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decodedToken);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Auth failed!' });
  }

};
