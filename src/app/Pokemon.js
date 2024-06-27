function Type({ type }) {
  return <span class="poke-type">{type}</span>;
}

export default function Pokemon({ pokemon }) {
  // const img = sprites.other.dream_world.front_default;
  const { name, height, weight, types, sprites } = pokemon;
  return (
    <li className="poke-item">
      <img
        alt={name}
        width="200px"
        height="200px"
        src={sprites.other.dream_world.front_default}
      />
      <h2>{name}</h2>
      <p>
        <b>Height: {height}</b>
      </p>
      <p>
        <b>Weight: {weight} </b>
      </p>
      <p>
        <b>Types: {types.map((i) => i.type.name)}</b>
      </p>
    </li>
  );
}

// function Type({ type }) {
//   return <span class="poke-type">{type}</span>;
// }

// export default function Pokemon({ pokemon }) {
//   // const img = sprites.other.dream_world.front_default;

//   return (
//     <li className="poke-item">
//       <img alt={''} width="200px" height="200px" src={img} />
//       <h2></h2>
//       <p>
//         <b>Height:</b>
//       </p>
//       <p>
//         <b>Weight:</b>
//       </p>
//       <p>
//         <b>Types:</b>
//       </p>
//     </li>
//   );
// }
