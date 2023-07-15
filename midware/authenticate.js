const dotenv = require('dotenv');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://course-learning-resources.onrender.com',
  clientID: 'OoIT2xKvqNBn0haPIJqQbeb7VahEeWTz',
  issuerBaseURL: 'dev-nkraj6kh6thnzrsh.us.auth0.com'
};

const isAuthenticated = (req, res, next) => {
  if (req.oidc.user === undefined) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  next();
};

module.exports = { config, isAuthenticated };