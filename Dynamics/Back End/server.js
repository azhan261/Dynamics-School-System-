require("dotenv").config();
const express = require('express');
const app = express();
const http = require("http")
const server = http.createServer(app)

//Cors

const cors = require('cors');

//-----

//Mongoose


const { mongoose } = require('./db.js');

//----

//Body Parser


const bodyParser = require('body-parser');

//-----

//For Stripe

const stripe = require('stripe')('sk_test_51IJBoUFiEW53mVTdhjgysiy1qE5ZqVS1CmQyHrGyBkUa4WH8fjUksxr5cxYSbqUBatPMkpnfMPASoTnW1ro5f8lV00ysihuDLp')

//----------


//For express file upload plugin

const api = require('./routes/user.routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/public', express.static('public'));
/*
app.use('/api', api)
*/


app.listen(4200, () => console.log('Server started at port : 4200'));
/*
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
*/
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

//-----------------------


//For Live Chat Plugin---------------

const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	console.log('User Online');
  
	socket.on('canvas-data', (data)=> {
		  socket.broadcast.emit('canvas-data', data);
		  
	})

	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
  
})

server.listen(5000, () => console.log("server is running on port 5000"))

//-------------------------------------------------------------------------



//Request statement for the controller

var studentController = require('./controllers/studentController');
var teacherController = require('./controllers/teacherController');
var placementController = require('./controllers/placementController');
var contactController = require('./controllers/contactController');
var personalInfosController = require('./controllers/personalInfoController');
var questionsController = require('./controllers/questionsController');
var coursePlanningController = require('./controllers/coursePlanningController');
var placementTestQuestionsController = require('./controllers/placementTestQuestionsController');
var testimonialController = require('./controllers/testimonialController');
var blogController = require('./controllers/blogController');
var route = require('./controllers/Auth/route');
var sectionsSchoolsTrainingAdultMale = require('./controllers/Courses/Schools/sectionsSchoolsTrainingAdultMale');
var productDescription = require('./controllers/Schools/productDescriptionController');
var schoolRegistrationController = require('./controllers/Schools/schoolRegistrationController')
var instituteBranchRegistrationController = require('./controllers/Schools/instituteBranchRegistrationController')
var createOrderController = require('./controllers/Orders/createOrderController');
var emailController = require("./email/email.controller");
//app.use is a middleware function that uses anything we have required. 


//------- Email Sending Node Mailer

/* hitted from the onSubmit handler in Landing.js
fetch(`${API_URL}/email`, {
*/

app.post("/email", emailController.collectEmail);

/* Manage state in confirm based on request / check invoked callback request */

app.get("/email/confirm/:id", emailController.confirmEmail);

/* Check all other req*/


//---------------------------S

app.use(bodyParser.json());

//app.cors will allow http request to be recieved or given through any plateform, port numbers, etc
//in cors() we pass the url of what we want to connect with which is using a different plateform/port
//the url would be passed as an object
//localhost:4200 is for angular, we wish to connect angular with nodejs through cors



app.use(cors({ origin:[ 'http://localhost:3000','http://localhost:3002','http://localhost:3003','http://localhost:3004','http://localhost:3005',
						'http://localhost:3005','http://localhost:3006','http://localhost:3007','http://localhost:3008', 'http://localhost:3009']}));


//Setting up express server through app.listen

app.listen(3001, () => console.log('Server started at port : 3001'));

//Adding routers from the controller

app.use('/students', studentController);
app.use('/placements', placementController);
app.use('/teachers', teacherController);
app.use('/contacts', contactController);
app.use('/personalInfos', personalInfosController);
app.use('/questions', questionsController);
app.use('/coursePlannings', coursePlanningController);
app.use('/placementQuestions', placementTestQuestionsController);
app.use('/testimonials', testimonialController);
app.use('/blogs', blogController);
app.use('/registration', route);
app.use('/sections', sectionsSchoolsTrainingAdultMale);
app.use('/api', api);
app.use('/product', productDescription);
app.use('/schoolRegistration', schoolRegistrationController);
app.use('/instituteBranchRegistration', instituteBranchRegistrationController);
app.use('/createOrder', createOrderController);
