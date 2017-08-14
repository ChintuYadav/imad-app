//console.log('Loaded!');
var shorten=document.getElementById('shorten_btn');
shorten.onclick=function(){
  var request=new XMLHttpRequest();
  request.onreadystatechane=function(){
    if(request.readystate===XMLHttprequest.DONE){
        if(request.status===200){
            
        }
    }  
  };
  var input=document.getElementById('url-field');
  var url=input.value;
  console.log(url);
  request.open('http://google.com');
  //request.open('POST', 'http://chintuyadavsr336.imad.hasura-app.io/');
  request.send(null);
};