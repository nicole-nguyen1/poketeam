import React from 'react';

const PokeStats = (props) => {
  console.log(props);
  return (
    <div>
      <p>{props.selectedMon}</p>
      <p>{props.stats.name}</p>
        {/* <p>{props.stats.species.url}</p> */}
      {/* <img src={props.stats.sprites["front_default"]} /> */}
        {/* <img src={props.selectedMon.name} /> */}
    </div>
  );
};

export default PokeStats;