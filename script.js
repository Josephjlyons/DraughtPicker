
const mapQuest

$.ajax({
    url: queryURLOne,
    method: "GET"
}).then(function(response) {


console.log(response);
    
    
    
    $.ajax({
    url: mapQuest,
    method: "GET"
    }).then(function(responseTwo) {

    console.log(responseTwo);

    
    });
});