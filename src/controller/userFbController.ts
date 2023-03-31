import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { db } from '../config/firebase';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const user = db.collection('user').doc()
  await user.set({
    name, email, password
  })
  res.status(200).send({
    message: 'New user added'
  });
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = db.collection('user').doc()
  const data = await user.get()
  if (!data.exists) {
    return res.status(400).json({ message: 'no data found' });
  }
  res.status(200).json({
    user: data.data()
  });
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

  const id = req.params.id;
  const user = db.collection('user');
  await user.doc(id).delete();
  res.send({ msg: " User Deleted" });

}
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  const user = db.collection('user').doc(id)
  await user.set({
    name, email, password
  })
  res.status(200).send({
    message: 'User updated'
  });
}


export default {
  registerUser, getUser, deleteUser, updateUser
}