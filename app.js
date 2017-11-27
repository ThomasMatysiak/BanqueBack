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
  host: "localhost:3306",
  user: "root",
  password: "",
  database: "banquedb"
});

/* Connexion via MySQL
con.connect();
con.query('SELECT * from < table name >', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

con.end();
*/
router.get('/connect/:groupName', function(req, res) {
	//res.status(401).send({error: "La partie est en cours"});
	/*res.status(200).send({
		idJoueur: getPlayerWithGroupName(req.params.groupName).idJoueur,
		code: 200,
		nomJoueur: req.params.groupName,
		numJoueur: getPlayerWithGroupName(req.params.groupName).number
	});*/
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
