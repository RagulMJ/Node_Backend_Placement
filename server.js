import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const mongoURL = process.env.MONGO_URL;

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

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get('/', (req, res) => {
  res.send('web server running');
});

// console.log(Math.floor(Math.random() * 100000));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
