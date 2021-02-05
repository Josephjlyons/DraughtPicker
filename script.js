$(document).ready(function () {

    $('.collapsible').collapsible();
    // Variables For User Input 

    let searchBtn = $("#searchBtn");
    const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"
    const favoritesListEl = $(".favoritesList")
    let favoriteArr = [];

    if (localStorage.getItem("favoriteArr")) {
        favoriteArr = JSON.parse(localStorage.getItem('favoriteArr'))
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
                for (let i = 0; i < data.length; i++) {
                    let state = responseOne[i].state;
                    const lat = responseOne[i].latitude;
                    const long = responseOne[i].longitude;
                    const street = responseOne[i].street;
                    sepAddress(street);
                    const mapQuest = `https://www.mapquestapi.com/staticmap/v5/map?locations=${lat},${long},${state}&key=${mapQKey}&zoom=16&size=400,350&defaultMarker=marker-26A69A&banner=${streetNumb}+${streetName}|26A69A`;
                    let divItemEL = $(`<div class="item ${i === 0 ? "active" : ""}"></div`)
                    let city = data[i].city;
                    let streetAdd = data[i].street;
                    let phone = data[i].phone;
                    let webSite = data[i].website_url;
                    let type = data[i].brewery_type;

                    if (city === "" || city === "null") {
                        city = "Information was not provided.";
                    }
                    if (streetAdd === "" || streetAdd === "null") {
                        streetAdd = "Information was not provided.";
                    }
                    if (phone === "" || phone === "null") {
                        phone = "Information was not provided.";
                    }
                    else {
                        phone = [phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6)].join('');
                    }
                    if (webSite === "" || webSite === null) {
                        webSite = "Information was not provided.";
                    }

                    type = type.charAt(0).toUpperCase() + type.slice(1);

                    let brewDataEL = $(`
                            <div class="brewData">
                                <p class="name">Name: ${data[i].name}</p><br>
                                <p class="brewType">Brewery Type: ${type} </p><br>
                                <p class="city">City: ${city}</p><br>
                                <p class="StreetAdd">Street Address: ${streetAdd}</p><br>
                                <p class="phone">Phone: ${phone}</p><br>
                                <p class="website">Website: <a href="${data[i].website_url}"> ${webSite}</a></p><br>
                                <button class="favoriteBtn">Save To Favorites</button><br>                            
                            </div>
                            <img class="map" src="${lat === null ? "./assets/mapNotAvailable.png" : mapQuest}" alt="This is a map of ${data[i].name} location"><br><br><br>
                            `)


                    divItemEL.append(brewDataEL)
                    $carouselInnerEl.append(divItemEL)
                }
            }

            $(".carousel-inner").on("click", ".active", function () {
                

                let favoriteArrLength = favoriteArr.length;

                input =
                {
                    Name: $(this).find(".name").text(),
                    brewType: $(this).find(".brewType").text(),
                    city: $(this).find(".city").text(),
                    StreetAdd: $(this).find(".StreetAdd").text(),
                    phone: $(this).find(".phone").text(),
                    website: $(this).find(".website").text(),
                }
                for(j=0; j<favoriteArr.length; j++){
                    if(favoriteArr[j].Name == input.Name ){
                        console.log("already in array")
                        return 0;
                    }
                }
                if (favoriteArrLength > 4) {
                    favoriteArr.splice(0, favoriteArrLength - 4);
                }
                favoriteArr.push(input)
                favoritesListEl.empty();
                for (let i = 0; i < favoriteArr.length; i++) {
                    let favoriteListLiEL = $(`
                    <li>
                        <div class="collapsible-header"><i class="material-icons"><span class="fas fa-beer"></span></i>${favoriteArr[i].Name}</div>
                        <div class="collapsible-body">
                            <span>${favoriteArr[i].brewType}</span><br>
                            <span>${favoriteArr[i].city}</span><br>
                            <span>${favoriteArr[i].StreetAdd}</span><br>
                            <span>${favoriteArr[i].phone}</span><br>
                            <span>${favoriteArr[i].website}</span>
                        </div>
                    </li>`)
                    favoritesListEl.append(favoriteListLiEL)
                }
                localStorage.setItem("favoriteArr", JSON.stringify(favoriteArr))
            });

            populateCarousel(responseOne);

        });
    })


});
