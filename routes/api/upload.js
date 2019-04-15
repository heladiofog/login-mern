const express = require('express');
const IncomingForm = require('formidable');
const fs = require('fs');
// router
const router = express.Router();

router.post('/', function upload(req, res) {
  // A new form
  let form = new IncomingForm();
  try {
    form.on('fileBegin', (name, file) => {
      // temp folder
      // file.path = '../../uploads/projects/' + file.name;
      // copy the file to a specific path
      // file.path = __dirname + '/uploads/projects/' + file.name;
      // form.uploadDir = "/uploads/projects/";

      // console.log({ message: "FileBegin - Write on: " + form.uploadDir });
    });

    // register callbacks on that form
    form.on('file', (field, file) => {
      // For each file on the form, do something
      // save it in the db
      // file.path to access the file
      console.log("File Received: " + file.name);
    });

    // Second callback is called when the form is 
    // completely parsed
    form.on('end', () => {
      // console.log({ message: "End - Done." });
      // res.json({ message: "End - Done." });
    })

    // Then, tigger the parsing of the form:
    form.parse(req, (err, fields, files) => {
      console.log({ message: "Parsed - Done. File temp location: " + JSON.stringify(files.file.name) });
      var oldpath = files.file.path;
      // Neew the id/project and the shareholder for /u/p/projectId/<shareholderId_fileName>
      var newpath = './uploads/projects/' + files.file.name;
      // console.log(`OldPath: ${oldpath} - newPath: ${newpath}`);
      // Move from temp path to desired location
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        // res.write('File uploaded and moved!');
        console.log(newpath);
        console.log(JSON.stringify(files));
        res.json({ message: "File successfully uploaded!" });
      });
    });
  } catch (error) {
    console.log("ERROR on upload: " + error)
    res.status(500).json({ message: "No se pudo subir el documento."})
  }
});

module.exports = router;