const conn = require('./connection');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();

const authenticateController = require('./controllers/authenticate');
const registerController = require('./controllers/register');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', router);

router.post('/api/register', registerController.register);
router.post('/api/login', authenticateController.authenticate);

const PORT = 5000;

// server environment
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
