var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var PORT = process.env.PORT || 8080;
var app = express();

require(path.join(__dirname, './app/routing/api-routes.js'))(app);
require(path.join(__dirname, './app/routing/html-routes.js'))(app);

app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname,'./app/public')));

app.listen(PORT, function() {
   console.log("FriendFinder is listening on port ", PORT);
});