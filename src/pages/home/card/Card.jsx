import React, { useEffect, useState } from 'react';
import css from './card.module.scss';
import { URL_POKEMON, URL_ESPECIES } from '../../../api/apiRest';
import axios from 'axios';

export default function Card({ card, onPokemonClick }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [especiePokemon, setEspeciePokemon] = useState({});
  const [evolucion, setEvolucion] = useState({});

  const urlImg = (numImg) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numImg}.png`;
  };

  useEffect(() => {
    const dataPokemon = async () => {
      try {
        const lastSlashIndex = card.url.lastIndexOf('/');
        const idString = card.url.slice(lastSlashIndex + 1);
        const response = await axios.get(`${URL_POKEMON}${idString}`);
        setItemPokemon(response.data);
      } catch (error) {
        console.error('Error al cargar datos del Pokémon:', error);
      }
    };

    dataPokemon();
  }, [card.url]);

  useEffect(() => {
    const dataEspecie = async () => {
      try {
        const lastSlashIndex = card.url.lastIndexOf('/');
        const idString = card.url.slice(lastSlashIndex + 1);
        const response = await axios.get(`${URL_ESPECIES}${idString}`);

        setEspeciePokemon(response.data);
        const evolutionChain = response.data.evolution_chain;

        if (Array.isArray(evolutionChain) && evolutionChain.length > 0) {
          const { base_evolution, first_evolution, second_evolution } =
            evolutionChain[0];

          setEvolucion({ base_evolution, first_evolution, second_evolution });
        } else {
          console.warn(
            'La cadena de evolución está vacía o no tiene suficientes datos.'
          );
        }
      } catch (error) {
        console.error('Error al cargar datos del Pokémon: ', error);
      }
    };

    dataEspecie();
  }, [card.url, URL_ESPECIES]);

  let pokeId =
    itemPokemon.id < 100
      ? (itemPokemon.id + 1000).toString().slice(-3)
      : itemPokemon.id;

  return (
    <div className={css.card}>
      {itemPokemon.id && (
        <img
          className={css.img_poke}
          src={urlImg(itemPokemon.id)}
          alt="pokemon"
        />
      )}
      <div className={`bg-${especiePokemon?.color} ${css.sub_card}`}>
        <strong className={css.id_card}>#{pokeId} </strong>
        <strong className={css.name_card}> {itemPokemon.name} </strong>
        <h4 className={css.altura_poke}>Altura: {itemPokemon.height / 10} m</h4>
        <h4 className={css.peso_poke}> Peso: {itemPokemon.weight / 10} kg </h4>
        <h4 className={css.habitat_poke}>Habitat: {especiePokemon.habitat}</h4>

        <div className={css.div_stats}>
          {itemPokemon.stats &&
            Object.entries(itemPokemon.stats).map(([stat, value], index) => (
              <h6 key={index} className={css.item_stats}>
                <span className={css.name}>{stat}</span>
                <progress value={value} max={110}></progress>
                <span className={css.numero}>{value}</span>
              </h6>
            ))}
        </div>

        <div className={css.div_type_color}>
          {itemPokemon.types &&
            itemPokemon.types.map((type, index) => {
              return (
                <h6 key={index} className={`color-${type} ${css.color_type}`}>
                  {type}
                </h6>
              );
            })}
        </div>

        <div className={css.div_evolution}>
          {evolucion.base_evolution && (
            <div className={css.item_evo}>
              <img
                src={urlImg(evolucion.base_evolution?.id)}
                alt="evo"
                className={css.img}
                onClick={() => {
                  onPokemonClick(evolucion.base_evolution?.name);
                }}
              />
              <h6 className={css.evo_name}>{evolucion.base_evolution?.name}</h6>
            </div>
          )}
          {evolucion.first_evolution && (
            <div className={css.item_evo}>
              <img
                src={urlImg(evolucion.first_evolution?.id)}
                alt="evo"
                className={css.img}
                onClick={() => {
                  onPokemonClick(evolucion.first_evolution?.name);
                }}
              />
              <h6 className={css.evo_name}>
                {evolucion.first_evolution?.name}
              </h6>
            </div>
          )}
          {evolucion.second_evolution && (
            <div className={css.item_evo}>
              <img
                src={urlImg(evolucion.second_evolution?.id)}
                alt="evo"
                className={css.img}
                onClick={() => {
                  onPokemonClick(evolucion.second_evolution?.name);
                }}
              />
              <h6 className={css.evo_name}>
                {evolucion.second_evolution?.name}
              </h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
