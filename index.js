const express = require('express')
const path = require('path')
const pg = require('pg')
//const pgp = require('pg-promise')({})
//pgp.pg.defaults.poolSize = 20
//const db = pgp(process.env.DATABASE_URL);
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/redir', (req, res) => res.render('pages/redir')).get('/habdoble', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      client.query('SELECT * FROM servicios_table WHERE id_servicio=1', function (err, result) {
        done();
        if (err) { console.error(err); response.send("Error " + err); }
        else { response.render('pages/habdoble', { results: result.rows }); }
      });
    });
  })
  .get('/habsimple', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      client.query('SELECT * FROM servicios_table WHERE id_servicio=2', function (err, result) {
        done();
        if (err) { console.error(err); response.send("Error " + err); }
        else { response.render('pages/habsimple', { results: result.rows }); }
      });
    });
  })
  .get('/playa', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      client.query('SELECT * FROM servicios_table WHERE id_servicio=3', function (err, result) {
        done();
        if (err) { console.error(err); response.send("Error " + err); }
        else { response.render('pages/playa', { results: result.rows }); }
      });
    });
  })
  /*.get('/admin', function (request, response) {  // TODO
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
  })*/
  .listen(PORT, () => console.log(`Listening on ${PORT}`))