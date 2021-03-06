
var friendsData = require("../data/friends");




module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });



  app.post("/api/friends", function (req, res) {

    var newFriendScores = req.body.scores;

    var scoresArray = [];

    var friendCloneMatch = 0;

    for (var i = 0; i < friendsData.length; i++) {
      var scoresDiff = 0;

      for (var j = 0; j < newFriendScores.length; j++) {
        scoresDiff += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriendScores[j])));
      }


      scoresArray.push(scoresDiff);
    }



    for (var i = 0; i < scoresArray.length; i++) {
      if (scoresArray[i] <= scoresArray[friendCloneMatch]) {
        friendCloneMatch = i;
      }
    }

    var cloneData = friendsData[friendCloneMatch];
    res.json(cloneData);


    friendsData.push(req.body);

  });


};
