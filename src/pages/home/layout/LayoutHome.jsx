import React, { useEffect, useState } from 'react';
import css from './layout.module.scss';
import Header from '../header/Header';
import Card from '../card/Card';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { URL_POKEMON } from '../../../api/apiRest';

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState(1025);
  const [xpage, setXpage] = useState(1);

  useEffect(() => {
    const api = async () => {
      const limit = 15;
      const xp = (xpage - 1) * limit;

      const apiPoke = await axios.get(
        `${URL_POKEMON}?offset=${xp}&limit=${limit}`
      );

      setArrayPokemon(apiPoke.data.results);
    };

    api();
    getGlobalPokemons();
  }, [xpage]);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}`);
    setGlobalPokemon(res.data.count);
  };

  let total = 1025;

  if (globalPokemon) total = globalPokemon;

  return (
    <div className={css.layout}>
      <Header />

      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span
            className={css.item_izquierdo}
            onClick={() => {
              if (xpage === 1) {
                return console.log('No puedo retroceder');
              } else {
                setXpage(xpage - 1);
              }
            }}
          >
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.item}> {xpage} </span>
          <span className={css.item}> DE </span>
          <span className={css.item}> {Math.round(total / 15)}</span>
          <span
            className={css.item_derecho}
            onClick={() => {
              if (xpage === 67) {
                return console.log('Es el ultimo');
              } else {
                setXpage(xpage + 1);
              }
            }}
          >
            <FaIcons.FaAngleRight />
          </span>
        </div>
      </section>

      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
