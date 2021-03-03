//RIOT API KEY => RGAPI-ef9397bf-99b9-4847-b2c4-37bcb707c489

//url example => https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key=RGAPI-YOUR-API-KEY

const API_KEY = "RGAPI-ef9397bf-99b9-4847-b2c4-37bcb707c489"
const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key="
function getLoLData() {
    console.log("Hello")
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + API_KEY, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
}