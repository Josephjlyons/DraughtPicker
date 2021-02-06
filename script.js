$(document).ready(function () {

    $('.collapsible').collapsible();
    // Variables For User Input 

    const searchBtn = $("#searchBtn");
    const mapQKey = "tm9ssbyvHrxMSsgIhCIymXmOzGvEGYZr"
    const favoritesListEl = $("#favoritesList")
    let favoriteArr = [];

    //Get favorites from local storage
    if (localStorage.getItem("favoriteArr")) {
        favoriteArr = JSON.parse(localStorage.getItem('favoriteArr'))
    }

    for (let i = 0; i < favoriteArr.length; i++) {
        let favoriteListLiEL = $(`
        <li>
            <div class="collapsible-header"><i class="material-icons"><span class="fas fa-beer"></span></i>${favoriteArr[i].Name}</div>
            <div class="collapsible-body">
                <p>${favoriteArr[i].brewType}</p><br>
                <p>${favoriteArr[i].city}</p><br>
                <p>${favoriteArr[i].StreetAdd}</p><br>
                <p>${favoriteArr[i].phone}</p><br>
                <p><a href="${favoriteArr[i].website}">${favoriteArr[i].website}</a></p>
            </div>
        </li>`)
        favoritesListEl.append(favoriteListLiEL)
    }
    function removeFavorite() {
        favoriteArr.shift()
        let remove = document.getElementById("favoritesList");
        remove.removeChild(remove.firstChild);
    }
    if (favoriteArr.length >= 4) {
        removeFavorite()
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
                    let brewDataEL = $(`
                            <div class="brewData">
                                <p>Name: <span class="name">${data[i].name}</span></p><br>
                                <p class="brewType">Brewery Type: ${data[i].brewery_type.charAt(0).toUpperCase() + data[i].brewery_type.slice(1)} </p><br>
                                <p class="city">City: ${data[i].city === "" ? "Information was not provided." : data[i].city}</p><br>
                                <p class="StreetAdd">Street Address: ${data[i].street === "" ? "Information was not provided." : data[i].street}</p><br>
                                <p class="phone">Phone: ${data[i].phone === "" ? "Information was not provided." : [data[i].phone.slice(0, 3) + "-" + data[i].phone.slice(3, 6) + "-" + data[i].phone.slice(6)].join('')}</p><br>
                                <p class="website">Website: ${data[i].website_url === "" ? "Information was not provided." : "<a href=" + data[i].website_url + ">" + data[i].website_url + "</a>"}</p><br>
                                <button class="favoriteBtn">Save To Favorites</button><br>                            
                            </div>
                            <img class="map" src="${lat === null ? "./assets/mapNotAvailable.png" : mapQuest}" alt="This is a map of ${data[i].name} location"><br><br><br>
                            `)
                    divItemEL.append(brewDataEL)
                    $carouselInnerEl.append(divItemEL)
                }
            }
            //Sets local storage
            $(".carousel-inner").on("click", ".active", function () {

                let input =
                {
                    Name: $(this).find(".name").text(),
                    brewType: $(this).find(".brewType").text(),
                    city: $(this).find(".city").text(),
                    StreetAdd: $(this).find(".StreetAdd").text(),
                    phone: $(this).find(".phone").text(),
                    website: $(this).find(".website").text(),
                }
                for (j = 0; j < favoriteArr.length; j++) {
                    if (favoriteArr[j].Name == input.Name) {
                        console.log("already in array")
                        return 0;
                    }
                };
                let favoriteListLiEL = $(`
                        <li>
                            <div class="collapsible-header"><i class="material-icons"><span class="fas fa-beer"></span></i>${input.Name}</div>
                            <div class="collapsible-body">
                                <p>${input.brewType}</p><br>
                                <p>${input.city}</p><br>
                                <p>${input.StreetAdd}</p><br>
                                <p>${input.phone}</p><br>
                                <p><a href="${input.website}">${input.website}</a></p>
                            </div>
                        </li>`)
                favoritesListEl.append(favoriteListLiEL)
                favoriteArr.push(input)
                localStorage.setItem("favoriteArr", JSON.stringify(favoriteArr))
                if (favoriteArr.length >= 5) {
                    removeFavorite()
                }
                console.log(favoriteArr)

            });

            populateCarousel(responseOne);

        });
    })


});
