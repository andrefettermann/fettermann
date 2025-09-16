// middleware/apiAuth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export function requireApiAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.authToken;

  if (!token) {
    // Para API, retorna JSON em vez de redirect
    return res.status(401).json({ error: 'Token de autenticação necessário' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded;
    next();
  } catch (error) {
    // Para API, retorna JSON em vez de redirect
    return res.status(401).json({ error: 'Token inválido' });
  }
}