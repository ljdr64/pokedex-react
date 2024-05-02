import React from 'react';
import css from './footer.module.scss';

export default function Footer() {
  return (
    <footer>
      <section className={css.section_links__footer}>
        <section className={css.left}>
          <a href="https://pokemon-api-opal.vercel.app" target="_blank">
            <span></span>
          </a>
          <p>
            Powered by&nbsp;
            <a href="https://pokemon-api-opal.vercel.app" target="_blank">
              PokeInfo API
            </a>
            <br />
            &copy; 2024 PokeInfo-Dex. Todos los derechos reservados.
          </p>
        </section>
      </section>
      <section className={css.section_autor__footer}>
        <p className={css.ljdr__detail}>
          <a
            href="https://www.linkedin.com/in/laureano-rodriguez-0715b5210"
            target="_blank"
          >
            <span></span>
          </a>
          &nbsp; &nbsp; &nbsp; &nbsp; Desarrollado por Laureano Rodriguez © 2024
        </p>
      </section>
    </footer>
  );
}
