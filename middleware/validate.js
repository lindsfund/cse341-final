const Validator = require('fastest-validator');


function resourceValidation(resource) {
    const resourceSchema = {
        title: {type: 'string', optional: false, empty: false, min: 3, max: 50},
        description: {type: 'string', optional: false, empty: false, min: 3, max: 200},
        sources: {type: 'multi',rules:[
            {type:'url'},
            {type:'string'} //in case the http part is forgotten
        ], optional: false}
}

    const v = new Validator();
    return v.validate(resource, resourceSchema);
    
} //end mongo validation

function userValidation(user) {
    const uSchema = {
        //user validation code here
    }
    
    const v = new Validator();
    return v.validate(user, uSchema);

} //end node validation

module.exports = {
    resourceValidation,
    userValidation
}

// mongoDBtest = {
//     title: "TESTING",
//     description:"TESTING",
//     source: "https://testing.com",
// }
// console.log("test", mongoValidation(mongoDBtest,resourceSchema));