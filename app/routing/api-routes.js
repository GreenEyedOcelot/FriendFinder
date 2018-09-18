/*
var friendsList = require('../data/friends');
var path = require('path');
var bodyParser = require('body-parser');
console.log("friendsList is ", friendsList);
console.log("CHECK, in api-routes file");

module.exports = function (app) {
   console.log("in module exports api file")
   app.get('api/friends', function (req, res) {
      console.log("app get api slash friends");
      res.json(friendsList);
   });

   
   app.post("api/friends", function (req, res) {
      console.log("app post api slash friends");
      var scores = req.body.scores;
      console.log("hi");
      var addUp = (a, b) => a + b;
      var sortFn = (a, b) => parseInt(a.diff) - parseInt(b.diff);
      var diffScoresFn = (friendScoreValue, friendScoreIndex) => Math.abs(parseInt(friendScoreValue) - parseInt(scores[friendScoreIndex]));
      var mapFriendsFn = (friend) => {
         return {
            "name": friend["name"],
            "photo": friend["photo"],
            "diff": friend["scores"].map(diffScoresFn).reduce(addUp)
         }
      }
      var orderedList = friendsList.map(mapFriendsFn).sort(sortFn);
      console.log("ordered: ", orderedList)
      res.json(orderedList[0]);
      friendsList.push(req.body)
   }) 
};
*/
//a POST routes /api/friends - this handles incoming survey results. will also used to handle the compatibility logic
//Load Data
var friendsList = require('../data/friends.js');

module.exports = function(app){
  //a GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
     console.log("get route, api/friends");
    res.json(friendsList);
  });

  app.post('/api/friends', function(req,res){
   console.log("request is: ");
   console.log(req.body);
    var sortFn = (friendA, friendB) => friendA.totalDiff - friendB.totalDiff;
    var addUp = (sumSoFar, value) => sumSoFar + parseInt(value);
    var mapScoresFn = (scoreValue, scoreInd) => Math.abs(parseInt(req.body.scores[scoreInd]) -  parseInt(scoreValue));
    var mapFriendsFn = (friend) => {
       return { "name": friend.name,
                "photo": friend.photo,
                "totalDiff": friend.scores.map(mapScoresFn).reduce(addUp,0)
       }
    };
    res.json(  friendsList.map(mapFriendsFn).sort(sortFn)[0]  );

    //pushes new submission into the friendsList array
    friendsList.push(req.body);
  });
};