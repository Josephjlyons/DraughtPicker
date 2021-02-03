
$(document).ready(function () {

	var phoneNumber = 0;
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
            method: "GET",			
        }).then(function (responseOne) {

            function populateCarousel(data) {

                let $carouselInnerEl = $(".carousel-inner")
                let $carouselindicatorsEL = $(".carousel-indicators")

                $carouselindicatorsEL.empty();
                $carouselInnerEl.empty();
                for (let i = 0; i < data.length; i++) {
					phoneNumber = responseOne[i].phone;	
					//this will set a global variable (businessReview) - not sure why the return value comes back empty
					var review = getBusinessInfo(phoneNumber);
					review = businessReview;
                    let state = responseOne[i].state;
                    const lat = responseOne[i].latitude;
                    const long = responseOne[i].longitude;
                    const street = responseOne[i].street;
                    sepAddress(street);
                    const mapQuest = `https://www.mapquestapi.com/staticmap/v5/map?locations=${lat},${long},${state}&key=${mapQKey}&zoom=16&banner=${streetNumb}+${streetName}`;
                    let ilEL = $(`<li data-target="#myCarousel" data-slide-to="${i}" class="${i === 0 ? "active" : ""}"></li>`)
                    let divItemEL = $(`<div class="item ${i === 0 ? "active" : ""}"></div`)
                    let brewDataEL = `
                            <p>Name: ${data[i].name}</p>
                            <p>Brewery Type: ${data[i].brewery_type}</p>
                            <p>City: ${data[i].city}</p>
                            <p>Street Address: ${data[i].street}</p><br>
                            <p>Phone: ${data[i].phone}</p><br>
                            <p>Website: <a href="${data[i].website_url}"> ${data[i].website_url}</a></p><br>
							<p><span>Yelp Review: </span> ${review} </p><br>
                            // <img class="map" src="${lat === null ? /*this is just a place holder img need better one*/"./assets/brewery-picture.jpg" : mapQuest}" alt="This is a map of ${data[i].name} location">
					`;
                    divItemEL.append(brewDataEL)
                    $carouselindicatorsEL.append(ilEL)
                    $carouselInnerEl.append(divItemEL)
                }
            }

            populateCarousel(responseOne);

        });		
    })

})

function getBusinessInfo(phoneNumber)
{
	var businessInfo = "";
	var businessId = 0;
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
	var url = proxyUrl + "https://api.yelp.com/v3/businesses/search/phone?phone=" + "1" + phoneNumber;
$.ajax({
            type: "Get",
			 headers: {
				"Authorization": "Bearer TaaNwpILAqldJAkxnGfcnFBqEFTNBBxJF8i1sBBlDZMECp_uLJ2G4bZgZM0QL_eiNnuNVU1u2wsk_PoPje4cP8HhU0lrEEDFCmFomOMP50wBAhCtsfhNwyhxuS0YYHYx"
			},
            url: url,
			async: false,
            success: function (data, jqXHR, textStatus) {
                if (data.businesses)
                {
					if(data.businesses.length > 0)
						return getReview(data.businesses[0].id);
                }              
            },
            error: function (errorData, jqXHR) {
                alert(errorData.responseText);
				return businessInfo;
            }
        });
}
function getReview(id) {
var businessInfo = null;
var review = "";
	var businessId = 0;
	var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
	var url = proxyUrl + "https://api.yelp.com/v3/businesses/" + id + "/reviews";
$.ajax({
            type: "Get",
			 headers: {
				"Authorization": "Bearer TaaNwpILAqldJAkxnGfcnFBqEFTNBBxJF8i1sBBlDZMECp_uLJ2G4bZgZM0QL_eiNnuNVU1u2wsk_PoPje4cP8HhU0lrEEDFCmFomOMP50wBAhCtsfhNwyhxuS0YYHYx"
			},
            url: url,
			async: false,
            success: function (data, jqXHR, textStatus) {
                if (data.reviews)
                {
					if(data.reviews.length > 0)
						businessReview = data.reviews[0].rating + " stars" + " " + data.reviews[0].text;
					return businessReview;
                }              
            },
            error: function (errorData, jqXHR) {
                alert(errorData.responseText);
				return review;
            }
        });	
	
}
