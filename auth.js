// auth.js
const jwt = require('jsonwebtoken');

// hard-coded demo user
const DEMO_USER = { id: 99, username: 'admin', password: 'secret' };

// POST /login  – issue token
function login(req, res) {
  const { username, password } = req.body;
  if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ sub: DEMO_USER.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}

// middleware to protect routes
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token' });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { login, auth };