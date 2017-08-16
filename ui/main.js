$('.btn-shorten').on('click', function(){
  // AJAX call to /api/shorten with the URL that the user entered in the input box
  $.ajax({
    url: '/createurl',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val()},
    success: function(data){
        var short_url="yeah! you got it man";
        // display the shortened URL to the user that is returned by the server
        var resultHTML = '<a class="result" href="' + short_url + '">'
            + data.shortUrl + '</a>';
        $("h2").html(resultHTML);
        //$("#link").css({'display':'block'});
        $("#link").slideDown(900);
    }
  });

});