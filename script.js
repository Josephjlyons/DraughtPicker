$(document).ready(function () {


    // Variable For User Input 

    let zipCode = $("#search-bar").val();
    let searchBtn = $("#searchBtn");

    searchBtn.click(function () {



        // Variable APIs From OpenBreweryDB 
        let brewZip = `https://api.openbrewerydb.org/breweries?by_postal=${zipCode}`;


        $.ajax({
            url: brewZip,
            method: "GET"
        }).then(function (responseOne) {
            console.log(responseOne)







            const lat = response.latitude;
            const long = response.longitude;
            const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"
            const mapQuest = `https://www.mapquestapi.com/staticmap/v5/map?key=${mapQKey}&center=${lat},${long}`;

            $.ajax({
                url: mapQuest,
                method: "GET"
            }).then(function (responseTwo) {

                console.log(responseTwo);


            });
        });
    })
})
