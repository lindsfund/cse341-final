const passport = require('passport');
const mongodb = require('../db/connect');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs')
const { generateJwtToken } = require('../middlewares/authenticate');

const authenticateWithGoogle = async (req, res, next) => {
    try {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }
    catch(err) {
        res.status(500).json(err || "There is an error while authenticating with google")
    }
}

const handleGoogleCallback = async (req, res, next) => {
  try {
    passport.authenticate('google', (err, newUser) => {
      if (err) {
        console.error('Error while handling Google callback:', err);
        return res.status(500).json({ error: err.message });
      }

      if (!newUser) {
        console.log('No user received from Google.');
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = generateJwtToken(newUser);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600 * 1000 })
    
      res.redirect('/');
    })(req, res, next);
    
  } catch (err) {
    console.error('Error while handling Google callback:', err.message);
    return res.status(500).json({ error: err.message || 'An error occurred' });
  }
}

const handleLocalAuthentication = async(req, res, next) => {
  try {
    const { email, password } = req.body
    const existingUser = await userModel.getSingleByEmail(mongodb, email);

    if (!existingUser.length < 0) {
      console.log('Invalid email or password.');
      return res.status(401).json({ message: 'Authentication failed' });
    }

    bcrypt.compare(password, existingUser[0].password, (err, result) => {
      if (!result) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = generateJwtToken(newUser);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600 * 1000 })
      return res.status(200).json({ message: 'Logged in successfully!', user });
    })

  } 
  catch (err) {
    console.error('Error while handling Local Authentication:', err.message);
    return res.status(500).json({ error: err.message || 'An error occurred' });
  }
}

module.exports = {
  authenticateWithGoogle,
  handleGoogleCallback,
  handleLocalAuthentication
};
