import React, { useEffect, useState } from 'react';
import css from './card.module.scss';
import { URL_ESPECIES } from '../../../api/apiRest';
import axios from 'axios';

export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [especiePokemon, setEspeciePokemon] = useState({});

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

  if (itemPokemon) console.log(itemPokemon);
  const imageSrc = itemPokemon.sprites?.official_artwork;

  return (
    <div className={css.card}>
      <img className={css.img_poke} src={imageSrc} alt="pokemon" />
      <div className={`bg-${especiePokemon?.color} ${css.sub_card}`}>
        <strong className={css.id_card}> 011 </strong>
        <strong className={css.name_card}> name </strong>
        <h4 className={css.altura_poke}> 10cm </h4>
        <h4 className={css.peso_poke}> peso </h4>
        <h4 className={css.habitat_poke}> habitat </h4>

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
      </div>
    </div>
  );
}
