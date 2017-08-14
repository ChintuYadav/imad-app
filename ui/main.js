//console.log('Loaded!');
var shorten=document.getElementById('shorten_btn');
shorten.onclick=function(){
    
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  register.value = 'Registered!';
              } else {
                  register.value = 'Register';
              }
          }
        };
        var url = document.getElementById('url-field').value;
        console.log(url);
        request.open('POST', '/shorten', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({url: url}));  
        register.value = 'Registering...';
};