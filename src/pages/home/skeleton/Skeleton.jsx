import React from 'react';
import css from './skeleton.module.scss';

export default function SkeletonCard() {
  return (
    <div>
      {
        <div className={css.skeleton_card}>
          <img className={css.skeleton_img} />
          <div className={css.skeleton_sub_card}>
            <strong className={css.skeleton_text}></strong>
            <strong className={css.skeleton_text}></strong>
            <div className={css.skeleton_text}></div> {/* Simula altura */}
            <div className={css.skeleton_text}></div> {/* Simula peso */}
            <div className={css.skeleton_text}></div> {/* Simula hábitat */}
            <div className={css.skeleton_div_stats}>
              <span className={css.skeleton_text}></span>
              <span className={css.skeleton_text}></span>
            </div>
            <div className={css.skeleton_div_type}>
              <div className={css.skeleton_type_color}></div>
              <div className={css.skeleton_type_color}></div>
            </div>
            <div className={css.skeleton_div_evolution}>
              <div className={css.skeleton_item_evo}></div>
              <div className={css.skeleton_item_evo}></div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
