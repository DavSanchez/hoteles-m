const express = require('express')
const path = require('path')
const pg = require('pg')
const pgp = require('pg-promise')
//pgp.pg.defaults.poolSize = 20
const db = pgp(process.env.DATABASE_URL);
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/redir', (req, res) => res.render('pages/redir'))
  .get('/habdoble', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=1')
    .then(function(data) {
        // success;
        response.render('pages/habdoble', { results: result.rows });
    })
    .catch(function(error) {
        // error;
        console.error(err); response.send("Error " + err);
    });
  })
  .get('/habsimple', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=2')
    .then(function(data) {
        // success;
        response.render('pages/habsimple', { results: result.rows });
    })
    .catch(function(error) {
        // error;
        console.error(err); response.send("Error " + err);
    });
  })
  .get('/playa', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=3')
    .then(function(data) {
        // success;
        response.render('pages/playa', { results: result.rows });
    })
    .catch(function(error) {
        // error;
        console.error(err); response.send("Error " + err);
    });
  })
  .get('/admin', function (request, response) {  // TODO
    db.multi('SELECT * FROM administrador_table; SELECT * FROM clientes_table; SELECT * FROM servicios_table;')
      .then(data => {
        // data[0] = result from the first query;
        // data[1] = result from the second query;
        response.render('pages/admin', {
          resultsAdmin: data[0].rows,
          resultsClientes: data[1].rows,
          resultsServicios: data[2].rows
        });
      })
      .catch(error => {
        console.error(err); response.send("Error " + err); // error
      });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))