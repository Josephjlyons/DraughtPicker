
$.ajax({
    url: queryURLOne,
    method: "GET"
}).then(function(response) {
    
    
    console.log(response);
    
    const city = response.city;
    const state = response.state;
    const lat = response.latitude;
    const long = response.longitude;
    const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"
    const mapQuest = "https://www.mapquestapi.com/staticmap/v5/map?key=" + mapQKey + "&center=" + lat + "," + long;
    
    $.ajax({
    url: mapQuest,
    method: "GET"
    }).then(function(responseTwo) {

    console.log(responseTwo);

    
    });
});