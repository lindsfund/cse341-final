const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Course Learning Resources',
    description: 'Team Project'
  },
  host: 'cse341-project-b2zk.onrender.com',
  schemes: ['https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
