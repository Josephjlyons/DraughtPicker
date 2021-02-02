$(document).ready(function () {


    // Variable For User Input 

    let searchBtn = $("#searchBtn");
    const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"

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




        $.ajax({
            url: brewZip,
            method: "GET"
        }).then(function (responseOne) {

            console.log(responseOne[0].latitude)
            console.log(responseOne[0].longitude)
            function populateCarousel(data) {
                // carousel.empty();

                let $carouselInnerEl = $(".carousel-inner")
                let $carouselindicatorsEL = $(".carousel-indicators")
                for (let i = 0; i < data.length; i++) {
                    let state = responseOne[i].state;
                    const lat = responseOne[i].latitude;
                    const long = responseOne[i].longitude;
                    const street = responseOne[i].street;
                    sepAddress(street);
                    const mapQuest = `https://www.mapquestapi.com/staticmap/v5/map?locations=${lat},${long},${state}&key=${mapQKey}&zoom=16&banner=${streetNumb}+${streetName}`;
                    let ilEL = $(`<li data-target="#myCarousel" data-slide-to="${i}" class="${i === 0 ? "active" : ""}"></li>`)
                    let divItemEL = $(`<div class="item ${i === 0 ? "active" : ""}"></div`)
                    let brewDataEL = $(`
                            <p>Name: ${data[i].name}</p><br><br>
                            <p>Brewery Type: ${data[i].brewery_type}</p><br><br>
                            <p>City: ${data[i].city}</p><br><br>
                            <p>Street Address: ${data[i].street}</p><br><br>
                            <p>Phone: ${data[i].phone}</p><br><br>
                            <p>Website: <a href="${data[i].website_url}"> ${data[i].website_url}</a></p><br><br>
                            <img class="map" src="${mapQuest}" alt="This is a map of ${data[i].name} location">
                        `)
                    divItemEL.append(brewDataEL)
                    $carouselindicatorsEL.append(ilEL)
                    $carouselInnerEl.append(divItemEL)
                }
            }

            populateCarousel(responseOne);

        });
    })
})
