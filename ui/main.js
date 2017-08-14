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
        request.open('get', 'http://chintuyadavsr336.imad.hasura-app.io/article-one', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({url: url}));  
        shorten.value = 'Registering...';
};