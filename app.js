const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cookieParser = require("cookie-parser")
const passport = require('passport')
const { configureGoogleStrategy, configureLocalStrategy } = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { checkJwtToken } = require("./middleware/authenticate");



const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkJwtToken);

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
  done(null,user);
});

const homeRouter = require('./routes/index');
app.use('/', homeRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const mongoRouter = require('./routes/mongoDB');
app.use('/mongodb', mongoRouter);

const nodeRouter = require('./routes/node');
app.use('/node', nodeRouter);

const renderRouter = require('./routes/render');
app.use('/render', renderRouter);

process.on('uncaughtException', (err, origin) => {
    console.log(
      process.stderr.fd,
      `Caught exception: ${err}\n` + `Exception origin: ${origin}`
    );
  });
  
  mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log('Connected to DB and listening on ' + port);
    }
  });
