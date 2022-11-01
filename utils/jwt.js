import jwt from 'jsonwebtoken';

export const generateToekn = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    'somethingsecret',
    {
      expiresIn: '1D',
    }
  );
};

export const isAuth = (req, res, next) => {
  const auth = req.headers.auth;
  // console.log(auth);
  if (auth) {
    jwt.verify(auth, 'somethingsecret', (err, decode) => {
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
