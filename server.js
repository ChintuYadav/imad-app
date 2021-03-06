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
    var alphabet = "1234567890abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
    var base = alphabet.length;
    var url = req.body.url;
    var shortUrl='';
    var code='';
    //res.send(url);
    console.log(url);
    //select exists (select true from table_name where table_column=?);
    pool.query('SELECT * FROM "Shorten" WHERE "long_url" = $1 LIMIT 1;',[url],function(err, result){
        if(err){
            result.status(500).send("Flag: "+err.toString());
        }
        else{
            var converted='';
            var num=0;
            if(result.rows.length===0){
                
                pool.query('INSERT INTO "Shorten" ( "long_url") VALUES ($1);',[url],function(err,result){
                    if(err){
                        res.status(500).send("Flag: "+err.toString());  
                    }
                    else{
                        pool.query('SELECT * FROM "Shorten" WHERE "long_url"=$1 ',[url], function(error, result1){
                            if(error){
                                res.status(500).send(error.toString());
                            }
                            else{
                                if(result1.rows.length===0){
                                    res.send({'shortUrl': 100});
                                }
                                else{
                                    num=result1.rows[0].id;
                                    var Id=num;
                                    while(Id){
                                        var rem=Id%base;
                                        Id=Math.floor(Id/base);
                                        converted=alphabet[rem].toString()+converted;
                                    }
                                    pool.query('UPDATE "Shorten" SET "short_url" =$1 WHERE "id"= $2',[converted, num], function(error1, result2){
                                        if(error1){
                                            res.status(500).send(error.toString());
                                        }
                                        else{
                                            converted="http://chintuyadavsr336.imad.hasura-app.io/"+converted;
                                            res.send({'shortUrl': converted});
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
                
              
            }
            else{
                pool.query('SELECT * FROM "Shorten" WHERE "long_url" =$1 LIMIT 1;',[url], function(err, result){
                    if(err){
                        res.status(500).send(err.toString());
                    }
                    else{
                        var converted='';
                        converted=result.rows[0].short_url;
                        converted="http://chintuyadavsr336.imad.hasura-app.io/"+converted;
                        res.send({'shortUrl': converted});
                    }
                });
            }
        }
        
    });
    /**/

});

app.get('/:redirect', function(req, res){
    var short_url=req.params.redirect;
    pool.query('SELECT "long_url" FROM "Shorten" WHERE "short_url"= $1;',[short_url], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.send("The requested URL is not found");
            }
            else{
                var long=result.rows[0].long_url;
                res.writeHead(302, {'Location': long});
                res.end();
            }
        }
    });
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
