import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';

const mongoURL =
  'mongodb+srv://Ragul_praveen:86dNsPHzVmXB3Tj9@cluster0.a8imc.mongodb.net/placement?retryWrites=true&w=majority';

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/', userRouter);

console.log(Math.floor(Math.random() * 100000));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
