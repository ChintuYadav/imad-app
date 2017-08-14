//console.log('Loaded!');
var shorten=document.getElementById('shorten_btn');
shorten.onclick=function(){
  var input=document.getElementById('url-field');
  var url=input.value;
  console.log(url);
  request.open('POST', 'http://chintuyadavsr336.imad.hasura-app.io/');
  request.send(null);
};