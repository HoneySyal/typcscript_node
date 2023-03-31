import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = 'qwertuihxnxhxhx';
  let token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error,
          error
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
}

export default extractJWT;
