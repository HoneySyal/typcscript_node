import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../model/userModel';
import signJWT from '../function/signJWT';
import { loginValidation, registerValidation } from '../middleware/validation';


const roleAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    if (data != null) {
      if (data.role == 'admin') {
        res.json({
          message: 'Welcome Admin',
        });
      }
      else {
        res.json({
          error: 'Access denied',
          message: 'Only Admin can access this route',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Authorized'
  })
}

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let { email, password } = req.body;

  bcryptjs.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        message: err.message,
        error: err
      })
    }

    const _user = new User({
      // _id: new mongoose.Types.ObjectId(),
      email,
      password: hash
    });

    return _user.save().then((user) => {
      return res.status(201).json({
        message: 'User Added',
        data: user
      });
    })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error: error
        });
      });
  });
}

const login = (req: Request, res: Response, next: NextFunction) => {

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let { email, password } = req.body;
  User.find({ email })
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          message: 'Unauthorized'
        });
      }

      bcryptjs.compare(password, users[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: 'Password Mismatch'
          });
        } else if (result) {
          signJWT(users[0], (_error, token) => {
            if (_error) {
              return res.status(500).json({
                message: _error.message,
                error: _error
              });
            } else if (token) {
              return res.status(200).json({
                message: 'Auth successful',
                token: token,
                user: users[0]
              });
            }
          });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error: error
      });
    });


}

const getAllUser = (req: Request, res: Response, next: NextFunction) => {

  User.find()
    .select('-password')
    .exec()
    .then((users) => {
      return res.status(200).json({
        users: users,
        count: users.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });

}

export default {
  validateToken,
  registerUser,
  login,
  getAllUser,
  roleAuth
}