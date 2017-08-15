//console.log('Loaded!');
var shorten=document.getElementById('shorten_btn');
shorten.onclick=function(){
    
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  shorten.value = 'Registered!';
              } else {
                  register.value = 'Register';
              }
          }
        };
        var url = document.getElementById('url-field').value;
        console.log(url);
        request.open('GET', '/createurl/'+url, true);
        //request.setRequestHeader('Content-Type', 'application/json');
        request.send(null);  
        shorten.value = 'Registering...';
};