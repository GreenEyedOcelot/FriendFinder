var path = require('path');

module.exports = function(app) {
    var getHTMLRouteFn = (pageName) => {
       console.log("route is ", pageName);
       return function (req, res) {
          res.sendFile(path.join(__dirname + '/../public/' + pageName + '.html'));
       }
    }

    app.get('/survey', getHTMLRouteFn('survey'));
    app.get('/home', getHTMLRouteFn('home'));
}