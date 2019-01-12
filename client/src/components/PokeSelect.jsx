import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import PokeStats from './PokeStats.jsx';

class PokeSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemon: '',
      pokeStats: []
    }
    this.selectPoke = props.onPokeSelect;
  }

  change = (e) => {
    const selectedPokemon = e.target.value;
    console.log(`Previous selected pokemon is: ${this.state.selectedPokemon}`);
    console.log(`After setState: ${selectedPokemon}`);
    
    this.setState( { selectedPokemon });
    //this.fetchStats(selectedPokemon);  
  }

  // fetchStats = (monster) => {
  //   console.log(`fetch stats is being called for ${monster}`);
  //   console.log(`https://pokeapi.co/api/v2/pokemon/${monster}`);
  //   fetch(`https://pokeapi.co/api/v2/pokemon/${monster}`)
  //     .then(response => response.json())
  //     .then(data => this.setState({ pokeStats: data }))
  //     .then(console.log(`fetch for ${monster} complete`));
  // }

  select = () => {
    this.selectPoke(this.state.selectedPokemon);
  }

  render() {
    // return (
    //   <div>
    //     <Dropdown 
    //       placeholder='Select a Pokemon' 
    //       onChange={this.change} 
    //       fluid selection
    //       loading
    //       options={this.props.pokemons.map((monster, index) => ({
    //         key: index,
    //         value: monster,
    //         text: ""
    //       }))} />
    //     <Button primary onClick={this.select}>Add to team</Button>
    //   </div>
    // )
    return (
      <div id="poke-select">
        <select onChange={this.change} value={this.state.selectedPokemon} id='select-poke'>
          <option>Select a Pokemon</option>
          {this.props.pokemons.map((monster, index) => <option key={index}>{monster.name}</option>)}
        </select>
        <button onClick={this.select}>Add to team</button>
        {/* <PokeStats selectedMon={this.state.selectedPokemon} stats={this.state.pokeStats}/> */}
      </div>
    )
  }
}
//import ListItem from './ListItem.jsx';

export default PokeSelect;