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
        };




        $.ajax({
            url: brewZip,
            method: "GET"
        }).then(function (responseOne) {
            // console.log(responseOne)

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



            sepAddress(street);


            function populateCarousel(data) {
                let carousel = $(".carousel")
                // carousel.empty();

                let $carouselInnerEl = $(".carousel-inner")
                let $carouselindicatorsEL = $(".carousel-indicators")
                //   console.log(data);
                for (let i = 0; i < data.length; i++) {
                        let ilEL = $(`<li data-target="#myCarousel" data-slide-to="${i}" class="${i === 0? "active": ""}"></li>`)
                        let divItemEL = $(`<div class="item ${i === 0? "active": ""}"></div`)
                        let brewDataEL = $(`
                            <p>Name: ${data[i].name}</p><br><br>
                            <p>Brewery Type: ${data[i].brewery_type}</p><br><br>
                            <p>City: ${data[i].city}</p><br><br>
                            <p>Street Address: ${data[i].street}</p><br><br>
                            <p>Phone: ${data[i].phone}</p><br><br>
                            <p>Website: <a href="${data[i].website_url}"> ${data[i].website_url}</a></p><br><br>
                            <img class="map" src="//:0" alt="">
                        `)
                        divItemEL.append(brewDataEL)
                        $carouselindicatorsEL.append(ilEL)
                        $carouselInnerEl.append(divItemEL)
                }
            }

            populateCarousel(responseOne);


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
