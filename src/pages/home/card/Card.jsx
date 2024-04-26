import React, { useEffect, useState } from 'react';
import css from './card.module.scss';
import { URL_POKEMON, URL_ESPECIES } from '../../../api/apiRest';
import axios from 'axios';

export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [especiePokemon, setEspeciePokemon] = useState({});
  const [baseEvolution, setBaseEvolution] = useState({});
  const [firstEvolution, setFirstEvolution] = useState({});
  const [secondEvolution, setSecondEvolution] = useState({});

  useEffect(() => {
    const dataPokemon = async () => {
      try {
        const response = await axios.get(`${card.url}`);
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
        if (itemPokemon.id) {
          const response = await axios.get(`${URL_ESPECIES}${itemPokemon.id}`);
          setEspeciePokemon(response.data);
        }
      } catch (error) {
        console.error('Error al cargar datos del Pokémon:', error);
      }
    };

    dataEspecie();
  }, [itemPokemon.id]);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        if (especiePokemon.evolution_chain) {
          const baseEvolutionId = especiePokemon.evolution_chain.base_evolution;
          const firstEvolutionId =
            especiePokemon.evolution_chain.first_evolution;
          const secondEvolutionId =
            especiePokemon.evolution_chain.second_evolution;

          if (baseEvolutionId) {
            const response = await axios.get(
              `${URL_POKEMON}${baseEvolutionId}`
            );
            setBaseEvolution(response.data);
          }

          if (firstEvolutionId) {
            const response = await axios.get(
              `${URL_POKEMON}${firstEvolutionId}`
            );
            setFirstEvolution(response.data);
          }

          if (secondEvolutionId) {
            const response = await axios.get(
              `${URL_POKEMON}${secondEvolutionId}`
            );
            setSecondEvolution(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (especiePokemon.evolution_chain) {
      fetchEvolutions();
    }
  }, [especiePokemon]);

  const baseImageSrc = baseEvolution.sprites?.official_artwork;
  const firstImageSrc = firstEvolution.sprites?.official_artwork;
  const secondImageSrc = secondEvolution.sprites?.official_artwork;

  const imageSrc = itemPokemon.sprites?.official_artwork;
  let pokeId =
    itemPokemon.id < 1000
      ? (itemPokemon.id + 1000).toString().slice(-3)
      : itemPokemon.id;

  return (
    <div className={css.card}>
      <img className={css.img_poke} src={imageSrc} alt="pokemon" />
      <div className={`bg-${especiePokemon?.color} ${css.sub_card}`}>
        <strong className={css.id_card}> {pokeId} </strong>
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
          {baseImageSrc && (
            <div className={css.item_evo}>
              <img src={baseImageSrc} alt="evo" className={css.img} />
              <h6 className={css.evo_name}>{baseEvolution.name}</h6>
            </div>
          )}
          {firstImageSrc && (
            <div className={css.item_evo}>
              <img src={firstImageSrc} alt="evo" className={css.img} />
              <h6 className={css.evo_name}>{firstEvolution.name}</h6>
            </div>
          )}
          {secondImageSrc && (
            <div className={css.item_evo}>
              <img src={secondImageSrc} alt="evo" className={css.img} />
              <h6 className={css.evo_name}>{secondEvolution.name}</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
