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
    
} //end resource validation

function userValidation(user) {
    const uSchema = {
        firstName:{type: 'string', optional: false, empty: false, max: 20},
        lastName:{type: 'string', optional: false, empty: false, max: 20},
        email:{type: email, optional:false, empty: false},
        // googleId:{type: 'any', optional: true},
        gender:{type: 'string', optional: false, empty: false, max: 20},
        birthday:"01/09/1982",
        password:{type: 'string', optional: false, empty: false, max: 20},
        city:{type: 'string', optional: false, empty: false, max: 20},
        country:{type: 'string', optional: false, empty: false, max: 20},
       
    }
    
    const v = new Validator();
    return v.validate(user, uSchema);

} //end user validation

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

// userTest = {
//     "firstName":"Lindsey",
//     "lastName":"Fund",
//     "email":"fun20001@byui.edu",
//     "gender":"female",
//     "birthday":"01/09/1982",
//     "password":"P@ssw0rd!",
//     "city":"Washington DC",
//     "country":"USA"
// }