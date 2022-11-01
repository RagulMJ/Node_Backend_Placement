import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/userModel.js';
import sendMail from '../utils/sendMail.js';
import { isAuth, generateToekn } from '../utils/jwt.js';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    res.send({ user });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user.password == password) {
      await user.save();
      res.status(200).json('Login success');
      await sendMail(email, 'Auth key', `${generateToekn(user)}`);
    } else {
      res.send('Invalid Credentials');
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

userRouter.post('/forgetpassword', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    function updatePassword(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.random() * charactersLength);
      }
      return result;
    }
    const newPassword = updatePassword(6);
    if (user) {
      await User.updateOne({ password: newPassword });
      await sendMail(email, 'New Password', `${newPassword}`);
      res.status(200).json('Password sent successfully');
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

userRouter.post('/mailsend', isAuth, async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    sendMail(email, subject, content);
    res.send('Email sent');
  } catch (error) {
    res.send('Error occured');
    console.log(error);
  }
});

export default userRouter;
