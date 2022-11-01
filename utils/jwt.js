import jwt from 'jsonwebtoken';

export const generateToekn = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1D',
    }
  );
};

export const isAuth = (req, res, next) => {
  const auth = req.headers.auth;
  // console.log(auth);
  if (auth) {
    jwt.verify(auth, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'unauthorized' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'unauthorized' });
  }
};
