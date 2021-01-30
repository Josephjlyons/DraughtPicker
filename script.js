$(document).ready(function () {


    // Variable For User Input 

    let zipCode = $("#search-bar").val();
    let searchBtn = $("#searchBtn");

    searchBtn.click(function () {


        console.log(zipCode);
        // Variable APIs From OpenBreweryDB 
        let brewZip = `https://api.openbrewerydb.org/breweries?by_postal=${zipCode}`;


        $.ajax({
            url: brewZip,
            method: "GET"
        }).then(function (responseOne) {
            console.log(responseOne)

            let name = responseOne[0].name;
            let brewType = responseOne[0].brewery_type;
            let zip = responseOne[0].postal_code;
            let city = responseOne[0].city;
            let state = responseOne[0].state;
            let phone = responseOne[0].phone;
            let website = responseOne[0].website_url;
            const lat = responseOne[0].latitude;
            const long = responseOne[0].longitude;
            
            let brewCard = $(".pubList");



            const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"
            // const mapQuest = `https://www.mapquestapi.com/staticmap/v5/map?key=${mapQKey}&center=${lat},${long}`;

            const mapQuest = `https://www.mapquestapi.com/staticmap/v5/map?locations=${lat},${long},${state}&key=${mapQKey}`

            $.ajax({
                url: mapQuest,
                method: "GET"
            }).then(function (responseTwo) {

                console.log('reached here');
            });
        });
    })
})
