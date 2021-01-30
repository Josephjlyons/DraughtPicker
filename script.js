$(document).ready(function () {


    // Variable For User Input 

    
    searchBtn.click(function () {
        
        let zipCode = $("#search-bar").val();
        let searchBtn = $("#searchBtn");
        
        console.log(zipCode);
        // Variable APIs From OpenBreweryDB 
        let brewZip = `https://api.openbrewerydb.org/breweries?by_postal=${zipCode}`;


        $.ajax({
            url: brewZip,
            method: "GET"
        }).then(function (responseOne) {
            console.log(responseOne)

            let name = responseOne.name;
            let brewType = responseOne.brewery_type;
            let zip = responseOne.postal_code;
            let city = responseOne.city;
            let state = responseOne.state;
            let phone = responseOne.phone;
            let website = responseOne.website_url;
            const lat = responseOne.latitude;
            const long = responseOne.longitude;

            let brewCard = $(".pubList").append("div").addClass("card-body");
            brewCard.empty();
            let breweryInfo = brewCard.append("<p>");
            brewCard.append(breweryInfo);

            let currentBrew = breweryInfo.append("<p>")
            currentBrew.append(currentBrew);

            currentBrew.append(`<p>Name: ${responseOne[0].name} </p>`);
            currentBrew.append(`<p>Brewery Type: ${responseOne[0].brewery_type} </p>`);
            currentBrew.append(`<p>City: ${responseOne[0].city} </p>`);
            currentBrew.append(`<p>State: ${responseOne[0].state} </p>`);
            currentBrew.append(`<p>Phone: ${responseOne[0].phone} </p>`);
            currentBrew.append(`<p>Website: ${responseOne[0].website_url} </p>`);







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
