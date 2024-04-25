import React, { useEffect, useState } from 'react';
import css from './card.module.scss';
import { URL_POKEMON } from '../../../api/apiRest';
import axios from 'axios';

export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState(['initialValue']);

  useEffect(() => {
    const dataPokemon = async () => {
      try {
        const response = await axios.get(card.url);
        setItemPokemon(response.data);
      } catch (error) {
        console.error('Error al cargar datos del Pokémon:', error);
      }
    };

    dataPokemon();
  }, []);

  const imageSrc = itemPokemon.sprites?.official_artwork;

  return (
    <div className={css.card}>
      <img className={css.img_poke} src={imageSrc} alt="pokemon" />
      <div className={css.sub_card}>
        <strong className={css.id_card}> 011 </strong>
        <strong className={css.name_card}> name </strong>
        <h4 className={css.altura_poke}> 10cm </h4>
        <h4 className={css.peso_poke}> peso </h4>
        <h4 className={css.habitat_poke}> habitat </h4>
      </div>
    </div>
  );
}
