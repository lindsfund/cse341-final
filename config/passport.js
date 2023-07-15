const mongodb = require('../db/connect');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user')
require('dotenv').config()

const configureGoogleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await userModel.getSingle(mongodb, profile.id);
  
            if (existingUser[0]) {
              // User already exists, return the user object
              return done(null, existingUser);
            }
  
           /*  // Admin does not exist, create a new admin in the database
            const newUser = await userModel.create(mongodb, {
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
            }); */

            console.log(profile)
            return done(null, newUser);

        } 
        catch (error) {
            return done(error);
        }
      }
    )
  )
}

module.exports = { configureGoogleStrategy };
