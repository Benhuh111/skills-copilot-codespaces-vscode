// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Read data from file
var comments = JSON.parse(fs.readFileSync('data/comments.json', 'utf8'));

// Create a route for getting comments
app.get('/comments', function (req, res) {
  res.json(comments);
});

// Create a route for posting comments
app.post('/comments', urlencodedParser, function (req, res) {
  // Add new comment to the array
  comments.push(req.body);
  // Write data to file
  fs.writeFileSync('data/comments.json', JSON.stringify(comments));
  // Send response
  res.json({ status: 'success' });
});

// Start web server
app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});