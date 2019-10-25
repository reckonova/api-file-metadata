"use strict";

var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));
var bodyParser = require("body-parser");
var dns = require("dns");
var multer = require("multer");

var app = express();

var port = process.env.PORT || 3000;

var upload = multer().single("upfile");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/index.html");
});
app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
    }
    let fileName = req.file.originalname;
    let fileSize = req.file.size;
    let fileType = req.file.mimetype;
    let fieldName = req.file.fieldname;

    res.json({
      "Field Name": fieldName,
      "File Name": fileName,
      "File Size": fileSize,
      "File Type": fileType
    });
  });
});
app.listen(port, function() {
  console.log("Node.js listening ...");
});
