const User = require("../../models/User");

function replyClick(clickedId, songId) {
  // alert(clickedId);
  // alert(songId);
  fetch("http://localhost:3001/song/allSongs", {
    // Adding method type
    method: "POST",
      
    // Adding body or contents to send
    body: JSON.stringify({ //username and email would go here
        // title: "foo",
        // body: "bar",
        // userId: 1
        songId: songId
    }),
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
  })   
  // Response obj has many things: e.g. error code, the json content, etc.
  // We only care about the json content in this example
  .then(response => response.json())
    
  // Displaying results to console
  .then(json => alert(JSON.stringify(json)));

}

function btnViewLiked() {
  window.location = "./user/likedSongs";
}

function btnReturnToLogin() {
  window.location = "./";
}

function btnUserProfile() {
  window.location = "./user/profile/63c36fd82a88d67c45b83e80";
}