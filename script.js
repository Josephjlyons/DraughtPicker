$(document).ready(function () {


    // Variables For User Input 

    let searchBtn = $("#searchBtn");
    const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"
    let faArr = [];

    // Search button that controls zip code fetch from OpenbreweryDB 

    searchBtn.click(function () {

        let zipCode = $("#search-bar").val();
        let streetNumb = "";
        let streetName = "";

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
        };


        // API call to populate carousel with data entries 

        $.ajax({
            url: brewZip,
            method: "GET"
        }).then(function (responseOne) {

            function populateCarousel(data) {

                let $carouselInnerEl = $(".carousel-inner")

                $carouselindicatorsEL.empty();
                $carouselInnerEl.empty();
                // talk to long about this ugly thing
                for (let i = 0; i < data.length; i++) {
                    let state = responseOne[i].state;
                    const lat = responseOne[i].latitude;
                    const long = responseOne[i].longitude;
                    const street = responseOne[i].street;
                    sepAddress(street);
                    const mapQuest = `https://www.mapquestapi.com/staticmap/v5/map?locations=${lat},${long},${state}&key=${mapQKey}&zoom=16&defaultMarker=marker-26A69A&banner=${streetNumb}+${streetName}|26A69A`;
                    let divItemEL = $(`<div class="item ${i === 0 ? "active" : ""}"></div`)
                    let brewDataEL = $(`
                            <div>
                            <p>Name: ${data[i].name}</p> <br>
                            <p>Brewery Type: ${data[i].brewery_type} </p><br>
                            <p>City: ${data[i].city}</p><br>
                            <p>Street Address: ${data[i].street}</p><br>
                            <p>Phone: ${data[i].phone}</p><br>
                            <p>Website: <a href="${data[i].website_url}"> ${data[i].website_url}</a></p><br>
                           
                            
                            </div>
                            <img class="map" src="${lat === null ? /*this is just a place holder img need better one*/"./assets/brewery-picture.jpg" : mapQuest}" alt="This is a map of ${data[i].name} location"><br><br><br>
                            `)


                    divItemEL.append(brewDataEL)
                    $carouselInnerEl.append(divItemEL)
                }
            }

            populateCarousel(responseOne);

        });
    })

    
});
