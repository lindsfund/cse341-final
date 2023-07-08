const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Course Learning Resources',
    description: 'This is our last team API Project for a Course Learning Resources Website'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);