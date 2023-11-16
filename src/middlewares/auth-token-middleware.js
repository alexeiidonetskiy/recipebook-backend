const jwt = require('jsonwebtoken');

exports.authTokenMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    
    req.userId = decoded.userId; // Attach the user ID to the request
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}
