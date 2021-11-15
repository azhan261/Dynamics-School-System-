//Taking the router for express to use the GET, POST, HTTP methods.

const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//Importing the employee schema

var { Teacher } = require('../models/teachers')

 //Now to use router.ger to use properties of the schema like find collection, get collection, etc

 //To use this get requeest we need to type localhost:3001/employees/, this is coming from index.js 
 //Where its mentioned /employees is the router

 router.get('/', (req, res) => {
     Teacher.find((err, doc) => {
         if (!err) { res.send(doc); }
         else { console.log('Error in Retrieving Teacher :' + JSON.stringify(err, undifines, 2)); }
     });

 });

 //Making a route to get the values related to a specific id, keep in mind, this id is not the id a user gives
 //but an ID mongoDB sets its self for specific entries in the database.

 router.get('/:id', (req, res) => {
     //Error checking
     if (!isValidObjectId(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    //Retreiving field through id, pass in the id as paramater of what we have reciveved through a button click or any event

    Teacher.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Teacher :' + JSON.stringify(err, undifines, 2)); }

    });

 });

 //Making a route to post the data with post rquest.

 //It should be noted that for now, we will be implementing

 router.post('/create', (req, res) => {
     var emp = new Teacher({
        name: req.body.name,
        password: req.body.password,
        conf_pass: req.body.conf_pass,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        country_code: req.body.country_code,
        phone: req.body.phone,
        nationality: req.body.nationality,
        country: req.body.country,
        description: req.body.description,
        cv: req.body.cv,
        image: req.body.image,
        status: req.body.status,
     });
     //Calling save function from mongoose, it will call back a function which will return a mongoDB object with above fields and properties
     //There will be another property called _id which will be used to fetch a particular data by mongoDB


     emp.save((err, doc) => {
         //Checking for error
         //if (!err) { res.send(doc);}
         //else {console.log('Error in Teacher Save :' + JSON.stringify(err, undefined, 2)); }
     });

 });



 router.post("/:id", (req, res) => {
    const id = req.params.id;
    teacher.findById(id, (err, teacher) => {
      if (!teacher) {
        res.status(404).send("teacher not found");
      } else {
        teacher.name = req.body.name;
        teacher.password = req.body.password;
        teacher.conf_pass = req.body.conf_pass;
        teacher.email = req.body.email;
        teacher.gender = req.body.gender;
        teacher.dob = req.body.dob;
        teacher.country_code = req.body.country_code;
        teacher.phone = req.body.phone;
        teacher.nationality = req.body.nationality;
        teacher.country = req.body.country;
        teacher.status = req.body.status
       
        teacher
          .save()
          .then((teacher) => {
            res.json(teacher);
          })
          .catch((err) => res.status(500).send(err.message));
      }
    });
  });

 //Building router for updating with router.put

 /*router.put('/:id', (req, res) => {
     if (!isValidObjectId(req.params.id))
        return res.status(400).send('No record with given id : ${req.param.id}');

    //Using an object to use the values of Employee and edit them, this object emp is different from Employee but uses its properties
    //emp object will be used to store the new values

    var emp = {
        teacher.name = req.body.name;
        teacher.password = req.body.password;
        teacher.conf_pass = req.body.conf_pass;
        teacher.email = req.body.email;
        teacher.gender = req.body.gender;
        teacher.dob = req.body.dob;
        teacher.country_code = req.body.country_code;
        teacher.phone = req.body.phone;
        teacher.nationality = req.body.nationality;
        teacher.country = req.body.country;
        teacher.status = req.body.status
    };
    //Calling Employee to find and upodate, mongoose property
    // (err,doc) is a call back function in mongoose that we need to show err or put, fetch anything from doc
    //{ new: true } is used to tell which data we wish to send, setting new: true, will send the updated data to the doc

    Teacher.findByIdAndUpdate(req.params.id, { $set: emp}, { new: true }, (err, doc) =>{
        //Checking for errors
        //If error not found, sending response to the doc
        if(!err) {res.send(doc); }
        else { console.log('Error in Teacher Update :' + JSON.stringify(err, undefined, 2)); }
    });



 });
*/
 //Building a delete router for delete request. The delete request is called through req,res function


 router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Teacher.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Teacher Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;


 //We have to configure these routes in the root file which is index.js


