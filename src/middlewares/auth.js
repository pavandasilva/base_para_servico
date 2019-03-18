const jwt = require('jsonwebtoken');
const jwtConfig = require('../../src/config/jwtConfig');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    req.id = decoded.id;
    req.body = req.body;
    
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}