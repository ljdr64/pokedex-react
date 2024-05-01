import React, { useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import css from './header.module.scss';
import logo from '../../../assets/pokemon.png';

export default function Header({ obtenerSearch }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      const currentValue = inputRef.current.value;
      obtenerSearch(currentValue);
    }
  };

  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className={css.div_search}>
          <div onClick={handleClick}>
            <FaIcons.FaSearch />
          </div>
          <input ref={inputRef} type="search" placeholder="Buscar" />
        </div>
      </div>
    </nav>
  );
}
