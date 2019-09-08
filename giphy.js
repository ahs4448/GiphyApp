    
    var giph


    $("a").on("click", function (event) {

      let myButton = $("<button>")


if($("#srchbar").val() === ""){
  alert("Please type the gif you're looking for in the search bar")
} else{

      $("#GifBoundaries").append(myButton)
}
      myButton.text($("#srchbar").val());

      // for creating the button

      myButton.addClass("GifButton")

    })


    $(document).on("click", ".GifButton", function (event) {



      $('#GifArea').empty()

      giph = $(this).text()
      console.log($(this).text());

      let API = "https://api.giphy.com/v1/gifs/search?q="
        + giph + "&api_key=0Qf6BgSbh5i77eHrNvGpxe2TFMzBS1zD&limit=10";

      $.ajax({
        url: API,
        method: "GET"
      })
        .then(function (response) {
     
          for (var i = 0; i < response.data.length; i++) {
           
            var paused = response.data[i].images.fixed_height_still.url;
            var animated = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;

            var image = $("<img>");
            
            image.attr("src", animated);
            image.attr('data-state', paused)
            image.attr('data-still', paused)
            image.attr('data-animate', animated)
            image.text(rating)

            
            $("#GifArea").append(image)
          }
          $("img").on("click", function () {
              var state = $(this).attr("data-state");

              if (state === "paused") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animated");
              }
              else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "paused");
              }
            });
          console.log(response);
        })
        .catch(function (response) {
          console.log('request failed ' + response)
        })
    })

    /* First, we have 2 different values from the response data,one value is the paused gifs and the other is the animated gifs
       second, the image tag that holds either the paused or animated gifs need a corresponding attribute to hold either one
    
      */