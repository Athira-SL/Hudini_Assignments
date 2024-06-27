'use client';

import { useEffect, useState } from 'react';
import Pokemon from './Pokemon';

export default function App() {
  const [status, setStatus] = useState('empty');
  const [pokeList, setPokeList] = useState([]);
  const pokeApi = 'https://pokeapi.co/api/v2/pokemon?limit=30';

  // async function fetchPokemon(url) {
  //   setStatus('loading');
  //   const pokeListArr = await fetch(url)
  //     .then((data) => data.json())
  //     .then(({ results }) => {
  //       return Promise.all(
  //         results.map((item) => {
  //           return fetch(item.url)
  //             .then((response) => response.json())
  //             .then((pokeResp) => {
  //               console.log({ pokeResp });
  //               const { id, name, height, stats, weight, types, sprites } =
  //                 pokeResp;

  //               return { id, name, height, stats, weight, types, sprites };
  //             });
  //         })
  //       ).then((pokeData) => pokeData);
  //     });

  //   setPokeList(pokeListArr);
  //   setTimeout(() => {
  //     setStatus('loaded');
  //   }, 2000);
  // }

  // if (status === 'empty')
  //   return <button onClick={() => fetchPokemon(pokeApi)}>Fetch Pokemon</button>;
  useEffect(() => {
    async function fetchPokemon(url) {
      setStatus('loading');
      const pokeListArr = await fetch(url)
        .then((data) => data.json())
        .then(({ results }) => {
          return Promise.all(
            results.map((item) => {
              return fetch(item.url)
                .then((response) => response.json())
                .then((pokeResp) => {
                  console.log({ pokeResp });
                  const { id, name, height, stats, weight, types, sprites } =
                    pokeResp;

                  return { id, name, height, stats, weight, types, sprites };
                });
            })
          ).then((pokeData) => pokeData);
        });
      setPokeList(pokeListArr);
      setStatus('loaded');
    }
    fetchPokemon(pokeApi);
  }, []);

  if (status === 'loading') return <div className="pokemon-loader"></div>;

  return (
    status === 'loaded' && (
      <ul className="poke-list">
        {pokeList.map((pokemon) => {
          const { id } = pokemon;

          return <Pokemon key={id} pokemon={pokemon} />;
        })}
      </ul>
    )
  );
}
