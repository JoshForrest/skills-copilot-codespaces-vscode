// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Create server
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    // Print out the server address and port
    console.log("Example app listening at http://%s:%s", host, port);
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Read comments from file
function readComments() {
    var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    return comments;
}

// Write comments to file
function writeComments(comments) {
    fs.writeFileSync('comments.json', JSON.stringify(comments));
}

// Add comment
app.post('/comments', function (req, res) {
    // Read comments
    var comments = readComments();

    // Add new comment
    comments.push(req.body);

    // Write comments
    writeComments(comments);

    // Return comments
    res.send(comments);
});

// Get comments
app.get('/comments', function (req, res) {
    // Return comments
    res.send(readComments());
});