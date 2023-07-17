const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongodb = require("./db/connect");
const cookieParser = require("cookie-parser")
const passport = require('passport')
const { configureGoogleStrategy, configureLocalStrategy } = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { checkJwtToken } = require("./middlewares/authenticate");

require('dotenv').config()

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser())
app.use(checkJwtToken)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(passport.initialize());


configureGoogleStrategy(passport);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log('Connected to DB and listening on ' + port);
  }
});