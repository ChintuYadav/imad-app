$('.btn-shorten').on('click', function(){
  // AJAX call to /api/shorten with the URL that the user entered in the input box
  $.ajax({
    url: '/createurl',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val()},
    success: function(data){
        var short_url=data.shortUrl;
        // display the shortened URL to the user that is returned by the server
        var resultHTML = '<a class="result" href="' + short_url + '" target="_blank">'
            + data.shortUrl + '</a>'+'<button class="btn btn-primary" id="copy_btn">copy</button>';
        //$("#link").html(resultHTML);
        //("#link").css({'display':'block'});
        $("#link").slideDown(500);
        $("#dialog_title_span").html(resultHTML);
    }
  });

});
$(".btn-primary").click(function(){ 
    $("#link").css("background-color","yellow");
});
$('.form-control').on('click', function(){
  $('#link').slideUp(500);
});