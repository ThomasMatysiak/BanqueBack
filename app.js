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
        res.status(500).send({error: err});
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

router.post('/api/event/create', function(req, res) {
    var title = req.body.title;
    var dateDebut = req.body.dateDebut;
    var dateFin = req.body.dateFin;
    var idCreateur = req.body.idCreateur;

    con.query('INSERT INTO evenement(idCreateur, titre, dateDebut, dateFin) VALUES("' + idCreateur + '","' + title + '","' + dateDebut + '","' + dateFin + '");', function(err, result) {
        if (!err) {
            var insertId = result.insertId;
            con.query('INSERT INTO membre_evenement(idEvenement, idUtilisateur) VALUES("' + insertId + '","' + idCreateur + '");', function(err, result) {
                if (!err) {
                    var insertId = result.insertId;
                    res.status(201).send(result);
                }
                else {
                    res.status(500).send({error: "MySQL error"});
                }
            });
        }
        else {
            res.status(500).send({error: "MySQL error"});
        }
    });
});

router.get('/api/event/:idUtilisateur', function(req, res) {
    var idUtilisateur = req.param("idUtilisateur");
    con.query('SELECT e.id, e.idCreateur, e.titre, e.dateDebut, e.dateFin FROM evenement e INNER JOIN membre_evenement me ON me.idEvenement = e.id WHERE me.idUtilisateur = ' + idUtilisateur, function(err, rows, fields) {
        if (!err) {
            res.status(201).send(rows);
        }
        else {
            res.status(500).send({error: "MySQL error"});
        }
    });
});

router.get('/api/event/:idEvent/details', function(req, res) {
    var idEvent = req.param("idEvent");
    con.query('SELECT e.id, e.idCreateur, e.titre, e.dateDebut, e.dateFin, (SELECT COALESCE(sum(d.montantDepense), 0) FROM depense d WHERE d.idEvenement = e.id) as totalDepense, (SELECT count(id) FROM membre_evenement me WHERE me.idEvenement = e.id) as nbparticipants FROM evenement e WHERE e.id = ' + idEvent + ';', function(err, rows, fields) {
        if (!err) {
            res.status(201).send(rows);
        }
        else {
            res.status(500).send({error: err});
        }
    });
});

router.get('/api/event/:idEvent/depenses', function(req, res) {
    var idEvent = req.param("idEvent");
    var rowResult = null;

    con.query('SELECT d.id, d.libelle, d.date, d.montantDepense, (SELECT u.username FROM utilisateur u WHERE u.id = d.idPayeur) as payeur, d.participants FROM depense d WHERE d.idEvenement = ' + idEvent + ';', function(err, rows, fields) {
        if (!err) {
            res.status(201).send(rows);
        }
        else {
            res.status(500).send({error: err});
        }
    });
});

router.post('/api/user/addEvent/:idEvent', function(req, res) {
    var idEvent = req.param("idEvent");
    var username = req.body.username;

    con.query('SELECT * FROM utilisateur u WHERE u.username = "' + username+ '"', function(err, rows, fields) {
        if (!err) {
            if (rows.length == 0) {
                res.status(500).send({error: "L'utilisateur n'existe pas"});
            }
        }
        else {
            res.status(500).send({error: err});
        }
    })
    con.query('INSERT INTO membre_evenement(idEvenement, idUtilisateur) VALUES(' + idEvent + ', (SELECT u.id FROM utilisateur u WHERE u.username = "'+ username+'"));', function(err, result) {
        if (!err) {
            res.status(201).send(result);
        }
        else {
            res.status(500).send({error: err});
        }
    });
});

router.get('/api/event/:idEvent/member/:idUser', function(req, res) {
    var idEvent = req.param("idEvent");
    var idUtilisateur = req.param("idUser");

    con.query('SELECT (SELECT u.username FROM utilisateur u WHERE u.id = me.idUtilisateur) as username, me.idUtilisateur FROM membre_evenement me WHERE me.idEvenement = ' + idEvent + ' AND me.idUtilisateur != ' + idUtilisateur, function(err, rows, fields) {
        if (!err) {
            res.status(201).send(rows);
        }
        else {
            res.status(500).send({error: err});
        }
    });
});

router.post('/api/event/depense', function(req, res) {
    var idUtilisateur = req.body.idUtilisateur;
    var idEvent = req.body.idEvent;
    var libelle = req.body.libelle;
    var date = req.body.date;
    var montantDepense = req.body.montantDepense;
    var participants = req.body.participants;

    con.query('INSERT INTO depense(idEvenement, idPayeur, libelle, date, montantDepense, payeurInclus, participants) VALUES (' + idEvent + ',' + idUtilisateur + ',"' + libelle + '","' + date + '",' + montantDepense + ',1,"' + participants + '");', function(err, result) {
        if (!err) {
            res.status(201).send(result);
        }
        else {
            res.status(500).send({error: err});
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
