const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Instantiating the app
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB config
const connString = require('./config/keys').MONGODB_URI;

// Connect to mongodb
mongoose
  .connect(connString, { useNewUrlParser: true })
  .then(() => console.log("Mongoose successfully connected to mongodb!"))
  .catch(err => console.log("Error at connecting to mongodb..." + err));

// process.env.PORT will be the port on Heroku if you decide to deploy the app over there
const port = process.env.PORT || 5000;

// Starting the app
app.listen(port, () => {
  console.log(`Server is now up and running on port ${port}!`)
})
