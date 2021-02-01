$(document).ready(function () {


    // Variable For User Input 

    let searchBtn = $("#searchBtn");

    searchBtn.click(function () {

        let zipCode = $("#search-bar").val();
        let streetNumb = "";
        let streetName = "";


        console.log(zipCode);
        // Variable APIs From OpenBreweryDB 
        let brewZip = `https://api.openbrewerydb.org/breweries?by_postal=${zipCode}`;

        //This function breaks the string street into two separate strings streetNumb and streetName
        let sepAddress = function (address) {
            let index = 0;
            for (let i = 0; i < address.length; i++) {
                if (address.charAt(i) === " ") {
                    index = i;
                }
            }
            streetNumb = address.substr(0, index);
            streetName = address.substr((index + 1));
        }

        

        $.ajax({
            url: brewZip,
            method: "GET"
        }).then(function (responseOne) {
            console.log(responseOne)

            let name = responseOne.name;
            let brewType = responseOne.brewery_type;
            let zip = responseOne.postal_code;
            let city = responseOne.city;
            let state = responseOne[0].state;
            let phone = responseOne.phone;
            let website = responseOne.website_url;
            const lat = responseOne[0].latitude;
            const long = responseOne[0].longitude;
            const street = responseOne[0].street;

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
            currentBrew.append(`<p>Website: <a href="${responseOne[0].website_url}"> ${responseOne[0].website_url} </a></p>`);

            sepAddress(street);





            const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"


            const mapQuest = `https://www.mapquestapi.com/staticmap/v5/map?locations=${lat},${long},${state}&key=${mapQKey}&zoom=16&banner=${streetNumb}+${streetName}`;
            $("img.map").attr("src", mapQuest);
            console.log(mapQuest);

            // $.ajax({
            //     url: mapQuest,
            //     method: "GET"
            // }).then(function (responseTwo) {

            //     console.log(responseTwo.data.image);
            // });
        });
    })
})
