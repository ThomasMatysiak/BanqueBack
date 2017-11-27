// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mysql = require('mysql');
var hat = require('hat');
var http = require('http');
var server = {};
// configure app to use bodyParser()
// this will let us get the data from a POST
server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DEBUT VARIABLE

// FIN VARIABLE

// DEBUT FONCTION UTILES POUR LE CODE

// FIN FONCTION UTILES POUR LE CODE

// DEBUT ROUTE API
var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "banquedb"
});

/* Connexion via MySQL
con.connect();
con.query('SELECT * from utilisateur', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.', err);
});

con.end();
*/


/* Connexion utilisateur */
router.get('/api/user/:username/:password', function(req,res) {
    con.query('SELECT * from utilisateur WHERE username = "' + req.param("username") + '" AND password = "' + req.param("password") + '"', function(err, rows, fields) {
      if (!err) {
        if (rows.length == 0) {
            res.status(404).send({error: "L'utilisateur n'existe pas"});
        }
        else {
            res.status(200).send(rows);
        }
      }
      else {
        res.status(500).send({error: "MySQL error"});
      }
    });
});

/* Création utilisateur */
router.post('/api/user/create', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    con.query('SELECT * from utilisateur WHERE username = "' + username + '";', function(err, rows, fields) {
      if (!err) {
        if (rows.length != 0) {
            res.status(226).send({error: "L'utilisateur existe deja"});
        }
        else {
            con.query('INSERT INTO utilisateur(username, password) VALUES("' + username + '","' + password + '");', function(err, rows, fields) {
                if (!err) {
                    res.status(201).send(rows);
                }
                else {
                    res.status(500).send({error: "MySQL error"});
                }
            });
        }
      }
      else {
        res.status(500).send({error: "L'utilisateur n'existe pas"});
        console.log('Error while performing Query.', err);
      }
    });
});


/* CORS REQUEST */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', router);
// FIN ROUTE API

// START THE SERVER
server.listen('8080', function(){
    var host = server.address().address,
        port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
