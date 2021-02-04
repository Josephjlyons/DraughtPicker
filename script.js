$(document).ready(function () {


    // Variables For User Input 

    let searchBtn = $("#searchBtn");
    const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"
    let favoriteArr = [];
    favoriteArr.length = 5

    if (localStorage.getItem("favoriteArr")) {
        cityArr = JSON.parse(localStorage.getItem('favoriteArr'))
    }

    for (let i = 0; i < favoriteArr.length; i++) {
    }



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
                    let city = data[i].city;
                    let streetAdd = data[i].street;
                    let phone = data[i].phone;
                    let webSite = data[i].website_url;
                    let type = data[i].brewery_type;

                    if (city === "" || city === "null"){
                        city = "Information was not provided.";
                    }
                    if (streetAdd === "" || streetAdd === "null"){
                        streetAdd = "Information was not provided.";
                    }
                    if (phone === "" || phone === "null"){
                        phone = "Information was not provided.";
                    }
                    else{
                        console.log(phone);
                        phone = [phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6)].join('');
                    }
                    if (webSite === "" || webSite === "null"){
                        webSite = "Information was not provided.";
                    }

                    type = type.charAt(0).toUpperCase() + type.slice(1);

                    let brewDataEL = $(`
                            <div>
                                <p>Name: ${data[i].name}</p><br>
                                <p>Brewery Type: ${data[i].brewery_type}</p><br>
                                <p>City: ${data[i].city}</p><br>
                                <p>Street Address: ${data[i].street}</p><br>
                                <p>Phone: ${data[i].phone}</p><br>
                                <p>Website: <a href="${data[i].website_url}"> ${data[i].website_url}</a></p><br>
                                <button class="favoritebtn" onclick="saveFavorite(${data})">favorite</buttons>
                            </div>
                            <img class="map" src="${lat === null ? /*this is just a place holder img need better one*/"./assets/mapNotAvailable.png" : mapQuest}" alt="This is a map of ${data[i].name} location"><br><br><br>
                            `)


                    divItemEL.append(brewDataEL)
                    $carouselInnerEl.append(divItemEL)
                }
            }
            function saveFavorite(res) {
                let input = {Name: res.name, website:res.website_url}
                favoriteArr.push(input)
                localStorage.setItem("favoriteArr", JSON.stringify(favoriteArr))
            };

            populateCarousel(responseOne);

        });
    })

})
