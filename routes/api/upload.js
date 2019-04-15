const express = require('express');
const IncomingForm = require('formidable');

// router
const router = express.Router();

router.post('/', function upload(req, res) {
  // A new form
  let form = new IncomingForm()

  // register callbacks on that form
  form.on('file', (field, file) => {
    // For each file on the form, do something
    // save it in the db
    // file.path to access the file
    console.log("File Received");
    // copy the file to a specific path
  });

  // Second callback is called when the form is 
  // completely parsed
  form.on('end', () => {
    res.json({ message: "Donde." });
  })

  // Then, tigger the parsing of the form:
  form.parse(req)

});

module.exports = router;