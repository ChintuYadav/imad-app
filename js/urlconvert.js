var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;
function converturl(num) {
    var converted='';
    while(num){
        var rem=num%base;
        num=Math.flooe(num/base);
        converted=alphabet[rem].toString()+converted;
    }
    return converted;
}