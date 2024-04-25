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
    <div>
      <img src={imageSrc} alt="pokemon" />
      <div>
        <strong> 011 </strong>
        <strong> name </strong>
        <h4> 10cm </h4>
        <h4> peso </h4>
        <h4> habitat </h4>
      </div>
    </div>
  );
}
