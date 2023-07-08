const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Course Learning Resources',
    description: 'This is our last team API Project for a Course Learning Resources Website'
  },
  host: 'course-learning-resources.onrender.com',
  schemes: ['https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
