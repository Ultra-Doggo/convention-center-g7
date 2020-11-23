const conn = require('./connection');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();

const authenticateController = require('./controllers/authenticate');
const registerController = require('./controllers/register');
const eventController = require('./controllers/event');
const personController = require('./controllers/peron');
const commentsController = require('./controllers/comments');
const locationController = require('./controllers/location');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', router);

// register/login
router.post('/api/register', registerController.register);
router.post('/api/login', authenticateController.authenticate);
// event
router.post('/api/create-event', eventController.createEvent);
router.post('/api/get-events-approved', eventController.getEventsApproved);
router.post('/api/get-events-admin', eventController.getEventsByAdmin);
router.post('/api/get-events-person', eventController.getEventsByPerson);
router.post('/api/approve-event', eventController.approveEvent);
router.post('/api/delete-event', eventController.deleteEvent);
// person
router.post('/api/add-person', personController.addPerson);
// comments
router.post('/api/add-comment', commentsController.addComment);
router.post('/api/get-comments', commentsController.getComments);
// location
router.post('/api/add-location', locationController.addLocation);
router.post('/api/get-location', locationController.getLocations);

const PORT = 5000;

// server environment
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
