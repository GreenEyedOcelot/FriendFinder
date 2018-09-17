var friendsList = require('../data/friends');
console.log("friendsList is ", friendsList);

module.exports = function (app) {
   app.get("api/friends", function (req, res) {
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
}