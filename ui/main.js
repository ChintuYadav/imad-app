//console.log('Loaded!');
var shorten=document.getElementById('shorten_btn');
shorten.onclick=function(){
    var input=document.getElementById('url-field');
    var url=input.value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            request.open('get', 'http://chintuyadavsr336.imad.hasura-app.io/shorten', true);
            request.setReqestHeader('Content-Type', 'application/json');
            request.send();
        }
    };
    console.log(url);
    
    //
};