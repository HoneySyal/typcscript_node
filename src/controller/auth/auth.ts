import { NextFunction, Request, Response } from 'express';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import admin from 'firebase-admin';
// import { serviceAccount } from '../../config/firebase';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    await admin.auth().createUser({
      email: email,
      emailVerified: false,
      password: password,
      disabled: false
    })
    res.json({ message: 'User Created' })
  } catch (err) {
    console.log(err)
    res.json({
      message: 'Error creating user',
      error: err
    })
  }
}

const listUser = async (req: Request, res: Response, next: NextFunction) => {
  const usersResult = await admin.auth().listUsers(1000)
  res.json(usersResult.users)
}

const login = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      res.json({
        message: 'user Logged in',
        data: user
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.json({
        errorCode: errorCode,
        errorMessage: errorMessage
      });
    })
};

const viewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await admin.auth().getUserByEmail(req.body.email)
    res.json(user)
  } catch (err) {
    res.json({ message: 'cannot fetch user data' })
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {

  const email = req.body.email;
  try {
    const user = await admin.auth().updateUser(req.params.id, {
      disabled: false,
      email: email,
      emailVerified: false,
    })
    res.json(user)
  } catch (e) {
    res.json({ message: e })
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  await admin.auth().deleteUser(req.params.id)
  res.json({ message: 'User deleted' })
};


export default {
  createUser, listUser, login, viewUser, updateUser, deleteUser
}