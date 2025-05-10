import { Request, Response, NextFunction } from 'express';


interface CustomRequest extends Request {
  user?: { id: string; role: string }; // Define a structure that includes both id and role
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as CustomRequest).user;
  if (user?.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin only route' });
};
