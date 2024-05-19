import React, { useRef, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import css from './header.module.scss';
import logo from '../../../assets/pokemon.png';

export default function Header({ obtenerSearch }) {
  const inputRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => {
    if (inputRef.current) {
      const currentValue = inputRef.current.value;
      obtenerSearch(currentValue);
    }
  };

  return (
    <header>
      <nav className={css.header}>
        <div className={css.div_header}>
          <div className={css.div_header_left}>
            <div className={css.div_logo}>
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div className={css.div_menu}>
              <div className={css.menu}>
                <button onClick={toggleMenu}>Imagenes</button>
                {menuOpen && (
                  <ul className={css.menuItems}>
                    <li>official-artwork</li>
                    <li>home</li>
                    <li>dream-world</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className={css.div_search}>
            <div onClick={handleClick}>
              <FaIcons.FaSearch />
            </div>
            <input ref={inputRef} type="search" placeholder="Buscar" />
          </div>
        </div>
      </nav>
      <nav className={css.header_small}>
        <div className={css.div_header_small}>
          <div className={css.div_menu_small}>
            <div className={css.menu}>
              <button onClick={toggleMenu}>Imagenes</button>
              {menuOpen && (
                <ul className={css.menuItems}>
                  <li>official-artwork</li>
                  <li>home</li>
                  <li>dream-world</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
