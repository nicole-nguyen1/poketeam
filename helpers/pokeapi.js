const request = require('request');
const Promise = require('bluebird');

module.exports = {
  getPokeStats: async (name) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let data = await response.json();
    return data;
  },
  
  getPokedex: async () => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokedex/1`);
    return response;
  }
}

// let getPokeStats = (name) => {
//   console.log(`name is ${name}`);
//   return new Promise(((resolve, reject) => {
//     request(`https://pokeapi.co/api/v2/pokemon/${name}`, (error, response, body) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(body);
//       }
//     });
//   }))
// }

// module.exports.getPokeStats = getPokeStats;