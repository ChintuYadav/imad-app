var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
//var Convert = require('urlconvert.js');
var config = {
    user: 'chintuyadavsr336',
    database: 'chintuyadavsr336',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/wallpaper.png', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'wallpaper.png'));
});

app.post('/createurl', function(req, res){ 
    var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
    var base = alphabet.length;
    var url = req.body.url;
    var shortUrl='';
    var code='';
    //res.send(url);
    console.log(url);
    var count=0;
    //select exists (select true from table_name where table_column=?);
    pool.query('SELECT * FROM "Shorten" WHERE "long_url" = $1 LIMIT 1',[url],function(err, result){
        if(err){
            res.status(500).send("Flag: "+err.toString());
        }
        else{
            if(result.rows.length===0){
                pool.query('INSERT INTO "Shorten" ( "long_url") VALUES ($1);',[url],function(err,result){
                    if(err){
                        res.status(500).send("Flag: "+err.toString());  
                    }
                    else{
                        counter = result.rows[0];
                        flag = "From query";
                        var Id=result.row[0].id;
                        var converted='';
                        while(Id){
                            var rem=Id%base;
                            Id=Math.floor(Id/base);
                            converted=alphabet[rem].toString()+converted;
                        }
                        pool.query('INSERT INTO "Shorten" ( "short_url") VALUES ($1) WHERE "long_url"=$2;',[converted, url] ,function(err, result){
                            if(err){
                                result.status(500).send("Flag: "+error.toString());
                            }
                            else{
                                converted="http://chintuyadavsr336.imad.hasura-app.io/"+converted;
                                result.send({'shortUrl': converted});
                            }
                        });
                    }
                });
            }
            else{
                var Id = result.rows[0].id;
                var converted='';
                while(Id){
                    var rem=Id%base;
                    Id=Math.floor(Id/base);
                    converted=alphabet[rem].toString()+converted;
                }
                converted="http://chintuyadavsr336.imad.hasura-app.io/"+converted;
                res.send({'shortUrl': converted});
            }
        }
        
    });
    /**/

});

app.get('/:redirect', function(req, res){
    var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
    var base = alphabet.length;
    var str=req.params.redirect;
    var codeid;
    var decoded = 0;
    res.send(str);
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
