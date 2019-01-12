import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Team from './components/Team.jsx';
import PokeSelect from './components/PokeSelect.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedex: [],
      team: []
    }
    // this.selectPoke.bind(this); //bind that function to this app component
    // this.fetchTeam.bind(this);
    //this.removePoke.bind(this);
  }

  componentDidMount() {
    this.catchAllPokemon();
    this.fetchTeam();
  }

  catchAllPokemon() {
    fetch('/pokedex')
      .then(response => response.json())
      .then(data => this.setState({ pokedex: data }));
  }

  fetchTeam = () => {
    fetch('/team')
      .then(response => response.json())
      .then(response => { this.setState({ team: response }) })
      .then(response => console.log(response))
      .then(response => console.log('finished fetching from /team'))
      .catch(err => console.error(err));
  }

  selectPoke = (monster) => {
    // axios
    //   .post('/team', {name: monster})
    //   .then(response => {
    //     console.log(response);
    //     this.fetchTeam();
    //   })
    //   .catch(err => console.error(err));

    $.ajax({
      method: 'POST',
      url: '/team',
      contentType: 'application/json',
      data: JSON.stringify({ name: monster }),
      success: function (data) {
        this.fetchTeam();
      }.bind(this),
      error: function (err) {
        console.error(err);
      }.bind(this)
    });
  }

  removePoke = (monsterId) => {
    console.log('remove button is working');
    console.log(monsterId);
    $.ajax({
      method: 'DELETE',
      url: `/team/${monsterId}`,
      success: function (data) {
        this.fetchTeam();
      }.bind(this),
      error: function (err) {
        console.error(err);
      }.bind(this)
    })
  };

  render() {
    return (<div>
      <h1>Poketeam</h1>
      <PokeSelect pokemons={this.state.pokedex} onPokeSelect={this.selectPoke} />
      <Team team={this.state.team} onPokeRemove={this.removePoke} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));