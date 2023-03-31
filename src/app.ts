import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import userRouter from './routers/userRouter';
import userFbRouter from './routers/userFbRoute';

const app = express();

app.use(express.json());
const port = 3000;
const dbUrl = 'mongodb+srv://admin:admin@cluster0.rs38upe.mongodb.net/studentDb?retryWrites=true&w=majority';

//routes
app.get('/check', (req: Request, res: Response): void => {
  res.json({
    data: 'Checking route'
  });
});

app.use('/user', userRouter);
app.use('/fb/user', userFbRouter);

//db
mongoose
  .connect(dbUrl)
  .then((result) => {
    console.log('Db connected !!');
    //server
    app.listen(port, (): void => {
      console.log('Server is running http://localhost:' + port + '/');
    });
  })
  .catch((error) => {
    console.error(error);
  });