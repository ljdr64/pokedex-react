import React, { useEffect, useState } from 'react';
import css from './layout.module.scss';
import Header from '../header/Header';
import Card from '../card/Card';
import Footer from '../footer/Footer';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { URL_POKEMON } from '../../../api/apiRest';

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchEvo, setSearchEvo] = useState('');
  const limit = 20;

  const manejarClick = (nombrePokemon) => {
    obtenerSearchEvo(nombrePokemon);
  };

  useEffect(() => {
    const api = async () => {
      try {
        setSearchEvo('');
        const xp = (xpage - 1) * limit;

        const apiPoke = await axios.get(
          `${URL_POKEMON}?offset=${xp}&limit=${limit}`
        );

        setArrayPokemon(apiPoke.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    api();
    getGlobalPokemons();
  }, [xpage, search]);

  const getGlobalPokemons = async () => {
    try {
      const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1025`);
      const promises = res.data.results.map((pokemon) => {
        return pokemon;
      });

      const results = await Promise.all(promises);

      setGlobalPokemon(results);
    } catch (error) {
      console.error(error);
    }
  };

  let total = globalPokemon?.length;
  const xp = (xpage - 1) * limit;

  let filterPokemons = arrayPokemon;
  if (search?.length > 0) {
    filterPokemons = globalPokemon?.filter((pokemon) =>
      pokemon?.name?.includes(search)
    );
    total = filterPokemons?.length;

    filterPokemons = filterPokemons.slice(xp, xp + limit);
  } else {
    filterPokemons = arrayPokemon;
    total = globalPokemon?.length;
  }

  const obtenerSearch = (e) => {
    const texto = e.toLowerCase();
    setSearch(texto);
    setXpage(1);
    setSearchEvo('');
  };

  if (searchEvo) {
    filterPokemons = globalPokemon?.filter((pokemon) => {
      return pokemon?.name === searchEvo;
    });
    total = 1;
  }

  const obtenerSearchEvo = (e) => {
    const texto = e.toLowerCase();
    setSearchEvo(texto);
  };

  const numberTotalPages = Math.ceil(total / limit) || 1;
  const numberInitialPage = xpage > numberTotalPages ? 1 : xpage;

  const cardContentClass = searchEvo
    ? css.card_content_special
    : css.card_content;

  return (
    <div className={css.layout}>
      <Header obtenerSearch={obtenerSearch} />

      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span
            className={css.item_izquierdo}
            onClick={() => {
              if (numberInitialPage === 1) {
                return console.log('No puedo retroceder');
              } else {
                setXpage(xpage - 1);
              }
            }}
          >
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.item}> {numberInitialPage} </span>
          <span className={css.item}> DE </span>
          <span className={css.item}> {numberTotalPages}</span>
          <span
            className={css.item_derecho}
            onClick={() => {
              if (xpage >= numberTotalPages) {
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

      <div className={cardContentClass}>
        {filterPokemons.map((card, index) => {
          return <Card key={index} card={card} onPokemonClick={manejarClick} />;
        })}
      </div>
      <Footer />
    </div>
  );
}
