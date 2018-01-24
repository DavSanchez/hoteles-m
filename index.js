const express = require('express');
const path = require('path');
const pg = require('pg');
const pgp = require('pg-promise')();
pgp.pg.defaults.poolSize = 20;
const db = pgp(process.env.DATABASE_URL);
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/redir', (req, res) => res.render('pages/redir'))
  .get('/habdoble', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=1')
    .then(data => {
      response.render('pages/habdoble', { "results": data.rows });
    })
    .catch(err => {
      console.error(err); response.send("Error " + err); // error
    });
  })
  .get('/habsimple', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=2')
    .then(data => {
      response.render('pages/habsimple', { "results": data.rows });
    })
    .catch(err => {
      console.error(err); response.send("Error " + err); // error
    });
  })
  .get('/playa', function (request, response) {
    db.any('SELECT * FROM servicios_table WHERE id_servicio=3')
    .then(data => {
      response.render('pages/playa', { "results": data.rows });
    })
    .catch(err => {
      console.error(err); response.send("Error " + err); // error
    });
  })
  .get('/admin', function (request, response) {  // TODO
    db.multi('SELECT * FROM administrador_table; SELECT * FROM clientes_table; SELECT * FROM servicios_table;')
      .then(data => {
        // data[0] = result from the first query;
        // data[1] = result from the second query;
        response.render('pages/admin', {
          "results"Admin: data[0].rows,
          "results"Clientes: data[1].rows,
          "results"Servicios: data[2].rows
        });
      })
      .catch(err => {
        console.error(err); response.send("Error " + err); // error
      });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))