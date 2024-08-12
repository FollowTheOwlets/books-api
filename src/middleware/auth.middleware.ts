import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { UserRole } from '../repositories/data/user-role';

interface JwtPayload {
  userId: number;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  isAuthenticated(req, res, () => {
    if ((req as any).user.role !== UserRole.ADMIN) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  });
};
