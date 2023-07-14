/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('learnResources');

// Insert a few documents into the sales collection.
db.getCollection('nodeJS').insertMany(
    [
        {
            "title" : "nodJsDocs",
            "description" : "The official NodeJS Documentation",
            "source" : "https://nodejs.org/en/docs"
        },
        {
            "title" : "w3schoolsNode",
            "description" : "w3school's tutorial for NodeJs",
            "source" : "https://www.w3schools.com/nodejs/"
        },
        {
            "title" : "codeCademy",
            "description" : "codeCademy's 'Learn Node.js' course",
            "source" : "https://www.codecademy.com/learn/learn-node-js"
        },
        {
            "title" : "webDevSimplified",
            "description" : "A playlist of various Nodejs topics",
            "source" : "https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY"
        },
        {
            "title" : "tutTeacher",
            "description" : "a full step by step tutorial of nodeJS",
            "source" : "https://www.tutorialsteacher.com/nodejs"
        }
    ]
);
use('learnResources');
db.getCollection('render').insertMany([
    {
        "title" : "Render Docs",
         "description" : "official Render Documentation",
         "source" : "https://render.com/docs"
     },
     {
        "title" : "Website Hosting with Render.com",
         "description" : "basic setup of a site hosted on Render",
         "source" : "https://tutorials.yax.com/articles/website-hosting-with-render.html"
     },
     {
        "title" : "How I run my web app using Render",
         "description" : "Design emphasis article on deploying to Render",
         "source" : "https://medium.com/swlh/how-i-run-my-web-app-using-render-b8634b5679fb"
     },
     {
        "title" : "Andy's Tech Tutorials",
         "description" : "How to host a website on Render(video)",
         "source" : "https://www.youtube.com/watch?v=aLdIdmQOuzY"
     }
]);

use('learnResources');
db.getCollection('users').insertMany([
    {
        "firstName" : "Tony",
        "lastName":"Stark",
        "email":"iamironman@avengers.com",
        "googleId":"",
        "gender":"male",
        "birthday":"05/29/1970",
        "password":"iamironman",
        "city":"Manhattan",
        "country":"USA",
        "role":"admin"
    },
    {
        "firstName" : "Peter",
        "lastName":"Parker",
        "email":"spiderman@avengers.com",
        "googleId":"",
        "gender":"male",
        "birthday":"8/10/2001",
        "password":"spideysense",
        "city":"New York City",
        "country":"USA",
        "role":"intern"
    }
]);

