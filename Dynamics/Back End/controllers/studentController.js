//Taking the router for express to use the GET, POST, HTTP methods.

const express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var ObjectId = require('mongoose').Types.ObjectId;

//Importing the employee schema

var { Student } = require('../models/student')



 //Now to use router.ger to use properties of the schema like find collection, get collection, etc

 //To use this get requeest we need to type localhost:3001/employees/, this is coming from index.js 
 //Where its mentioned /employees is the router

 router.get('/', (req, res) => {
     Student.find((err, doc) => {
         if (!err) { res.send(doc); }
         else { console.log('Error in Retrieving Students :' + JSON.stringify(err, undifines, 2)); }
     });

 });
 router.get('/male-schools-junior', (req, res) => {
    Student.find({ "gender" : "Male", "courses" : "School Junior" },(err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
    });

});



router.get('/female-schools-adult', (req, res) => {
    Student.find({ "gender" : "Female", "courses" : "School Adult" },(err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
    });

});

router.get('/female-schools-junior', (req, res) => {
    Student.find({ "gender" : "Female", "courses" : "School Junior" },(err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
    });

});

 //Making a route to get the values related to a specific id, keep in mind, this id is not the id a user gives
 //but an ID mongoDB sets its self for specific entries in the database.

 router.get('/:id', (req, res) => {
     //Error checking
     if (!isValidObjectId(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    //Retreiving field through id, pass in the id as paramater of what we have reciveved through a button click or any event

    Student.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Students :' + JSON.stringify(err, undifines, 2)); }

    });

 });

 router.post('/login', (req, res) => {
    Student.findOne({ email: req.body.email })
        .then(user => {
            console.log("User from login", user)
            if (!user) res.sendStatus(204);
            else {
                res.send(user)
            }
        });
});


 //Making a route to post the data with post rquest.

 //It should be noted that for now, we will be implementing

 router.post('/create', (req, res) => {
     var emp = new Student({
    
        name: req.body.name,
        guardian: req.body.guardian,
        password: req.body.password,
        conf_pass: req.body.conf_pass,
        email: req.body.email,
        dob: req.body.dob,
        cnic: req.body.cnic,
        classesGrade: req.body.classesGrade,
        gender: req.body.gender,
        country_code: req.body.country_code,
        phone: req.body.phone,
        country: req.body.country,
        branchAddress: req.body.branchAddress,
        branchName: req.body.branchName,


     });
     //Calling save function from mongoose, it will call back a function which will return a mongoDB object with above fields and properties
     //There will be another property called _id which will be used to fetch a particular data by mongoDB


     emp.save((err, doc) => {
         //Checking for error
         //if (!err) { res.send(doc);}
         //else {console.log('Error in Student Save :' + JSON.stringify(err, undefined, 2)); }
     });

 });

 //Building router for updating with router.put

 router.put('/:id', (req, res) => {
     if (!isValidObjectId(req.params.id))
        return res.status(400).send('No record with given id : ${req.param.id}');

    //Using an object to use the values of Employee and edit them, this object emp is different from Employee but uses its properties
    //emp object will be used to store the new values

    var emp = {
    
        name: req.body.name,
        guardian: req.body.guardian,
        password: req.body.password,
        conf_pass: req.body.conf_pass,
        email: req.body.email,
        dob: req.body.dob,
        cnic: req.body.cnic,
        classesGrade: req.body.classesGrade,
        gender: req.body.gender,
        country_code: req.body.country_code,
        phone: req.body.phone,
        country: req.body.country,
        branchAddress: req.body.branchAddress,
        branchName: req.body.branchName,
        
    };
    //Calling Employee to find and upodate, mongoose property
    // (err,doc) is a call back function in mongoose that we need to show err or put, fetch anything from doc
    //{ new: true } is used to tell which data we wish to send, setting new: true, will send the updated data to the doc

    Student.findByIdAndUpdate(req.params.id, { $set: emp}, { new: true }, (err, doc) =>{
        //Checking for errors
        //If error not found, sending response to the doc
        if(!err) {res.send(doc); }
        else { console.log('Error in Students Update :' + JSON.stringify(err, undefined, 2)); }
    });



 });

 //Building a delete router for delete request. The delete request is called through req,res function


 router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Students Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;


 //We have to configure these routes in the root file which is index.js


