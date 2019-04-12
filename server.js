const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// Routes
const userRoutes = require('./routes/api/user');
// upload files
const upload = require('./routes/api/upload');

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
const mongoOpts = require('./config/keys').MONGODB_OPTS;
// Connect to mongodb
mongoose
  .connect(connString, mongoOpts) // Options literal object instead of just: { useNewUrlParser: true }
  .then(() => console.log("Mongoose successfully connected to mongodb!"))
  .catch(err => console.log("Error at connecting to mongodb..." + err));

// Passport Middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Routes
app.use("/api/users", userRoutes);
// Upload files route
app.use('/api/project/upload', upload);

// process.env.PORT will be the port on Heroku if you decide to deploy the app over there
const port = process.env.PORT || 5001;

// Starting the app
app.listen(port, () => {
  console.log(`Server is now up and running on port ${port}!`)
})
