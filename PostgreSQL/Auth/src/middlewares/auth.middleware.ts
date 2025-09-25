import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express';
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number, email: string };

    // attach only the id to req
    (req as any).userId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token expired or invalid" });
  }
};
