const express = require("express");
const app = express();
const db = require("./db/connect");

const port = process.env.PORT || 3000;

app.use(express.json());

const homeRouter = require("./routes/index");
app.use("/", homeRouter);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const mongoRouter = require("./routes/mongoDB");
app.use("/mongodb", mongoRouter);

const nodeRouter = require("./routes/node");
app.use("/node", nodeRouter);

const renderRouter = require("./routes/render");
app.use("/render", renderRouter);

app.listen(port, () => console.log(`Server listening on ${port}`));
