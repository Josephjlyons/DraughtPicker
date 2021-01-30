
$.ajax({
    url: queryURLOne,
    method: "GET"
}).then(function(response) {
    
    
    console.log(response);
    
    const lat = response.latitude;
    const long = response.longitude;
    const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"
    const mapQuest = "https://www.mapquestapi.com/staticmap/v5/map?key=" + mapQKey + "&center=" + lat + "," + long + "&zoom=15";
    
    $.ajax({
    url: mapQuest,
    method: "GET"
    }).then(function(responseTwo) {

    console.log(responseTwo);

    
    });
});