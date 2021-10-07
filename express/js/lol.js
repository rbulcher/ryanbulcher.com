//RIOT API KEY => RGAPI-ef9397bf-99b9-4847-b2c4-37bcb707c489

//url example => https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key=RGAPI-YOUR-API-KEY
// => https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Blighties?api_key=RGAPI-2990cfc3-97f5-4f3e-a403-4960218827ef

const API_KEY = "RGAPI-ef9397bf-99b9-4847-b2c4-37bcb707c489";
const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
function getLoLData() {
  var searchName = document.getElementById("n2").value;
  var getReq = url + searchName + "?api_key=" + API_KEY;
  console.log(getReq);
  fetch(getReq) //fetch the url
    .then(
      function (response) {
        return response.json();
      } //parse the response as JSON
    )
    .then(
      function (json) {
        console.log(json);
      } //do something with the JSON
    )
    .catch(function (error) {
      console.log(error);
    });
}
