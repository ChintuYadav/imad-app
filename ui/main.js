//console.log('Loaded!');
var shorten=document.getElementById('shorten_btn');
shorten.onclick=function(){
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState===XMLHTTPRequest.DONE){
            if(request.status===200){
                
            }
        }
    };
    var input=document.getElementById('url-field');
    var url=input.value;
    console.log(url);
    request.open('POST', 'http://chintuyadavsr336.imad.hasura-app.io/shorten', true);
    //request.setReqestHeader('Content-Type', 'application/json');
    request.send(JSON.strinfigy({url:url}));
};