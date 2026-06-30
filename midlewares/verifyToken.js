import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token requerido'
    });
  }

  // Extraer el token, removiendo "Bearer " del inicio
  const token = authorization.startsWith('Bearer ') 
    ? authorization.slice(7) 
    : authorization;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }
};

