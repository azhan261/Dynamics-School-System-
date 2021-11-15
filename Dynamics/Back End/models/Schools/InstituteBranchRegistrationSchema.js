//need to connect mongoose

const mongoose = require('mongoose');


//Using mongoose model property to create model for InstituteBranchRegistration
//Then, specify the schema of the model i.e, define column names
//We have to pass model name 'InstituteBranchRegistration' into the model
//For Crud, we will need to use this structure and their names i.e name,position,office etc

var InstituteBranchRegistration = mongoose.model('InstituteBranchRegistration', {
    institutenName: { type: String },
    headOffice:{ type: String},
    password: {type: String},
    conf_pass: {type: String },
    email: { type: String },
    country_code: {type: String },
    phone: {type: String },
    country: {type: String},
    location: {type: String},
    address: {type: String},
    startDate : {type : String},
    endDate : {type : String},
    productionDeadline : {type : String},
    deliveryDate : {type : String},
    status:'School'

});



//Now we dont to insert a new record called Employee, we need to just insert data
//We export it as an object 

module.exports = { InstituteBranchRegistration };
