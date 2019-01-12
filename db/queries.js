const knex = require('knex');
const db = require('./index');

module.exports = {
  selectAllFromTeam: () => {
    db.knex('team').select();
  },

  selectPokedex: () => {
    db.knex('pokedex').select();
  },

  save: (monster) => {
    if(monster.type.length > 1) {
      db.knex('team').insert({
        name,
        sprite,
        type1,
        type2,
        hp,
        attack,
        sp_attack,
        defense,
        sp_defense,
        speed
      });
    } else {
      db.knex('team').insert({
        name,
        sprite,
        type1,
        hp,
        attack,
        sp_attack,
        defense,
        sp_defense,
        speed
      });
    }
  },

  deleteRecord: (id) => {
    db.knex('team').where('id', id).del();
  }
}