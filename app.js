const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000

app.listen(port, () => console.log(`Server listening on ${port}`));