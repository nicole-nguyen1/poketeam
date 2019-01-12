require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/queries');

const port = process.env.PORT || 3000;

const app = express();

//====================
//MIDDLEWARE
//====================
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(bodyParser.json());

//====================
//ENDPOINTS
//====================

app.get('/pokedex', function (req, res) {
  db.selectPokedex((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(data);
    }
  })
});

app.get('/team', function (req, res) {
  db.selectAllFromTeam((err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(data);
    }
  })
});

app.post('/team', function (req, res) {
  console.log(req.body.name);
  pokeapi.getPokeStats(req.body.name)
    .then(JSON.parse)
    .then(db.save)
    .then(() => {
      res.send(`Succesfully added ${req.body.name} to database`);
    })
    .catch((err) => console.error(err));
});

app.delete('/team/:id', function (req, res) {
  db.deleteRecord(req.params.id, (err, data) => {
    if (err) {
      res.send(`Error: Could not delete record ${req.params.id}`)
    } else {
      res.send(`TEAM: Successfully removed record ${req.params.id} from database`);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));