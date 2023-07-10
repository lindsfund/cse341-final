const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



const port = 3000

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
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
