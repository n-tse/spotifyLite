// const btn = document.getElementsById('like-button');
//   btn.addEventListener('click', () => {
//     fetch("http://localhost:3001/allSongs", {
//       // Adding method type
//       method: "POST",
        
//       // Adding body or contents to send
//       // body: JSON.stringify({ //username and email would go here
//       //     title: "foo",
//       //     body: "bar",
//       //     userId: 1
//       // }),


        
//       // Adding headers to the request
//       headers: {
//           "Content-type": "application/json; charset=UTF-8"
//       }
//     })   
//     // Response obj has many things: e.g. error code, the json content, etc.
//     // We only care about the json content in this example
//     .then(response => response.json())
      
//     // Displaying results to console
//     .then(json => alert(json));
//   });


function replyClick(clickedId, songId) {
  alert(clickedId);
  alert(songId);
}