import React from 'react';
import style from './Preloader.module.scss';
import preloader from './preloader.gif';

export const Preloader = () => {
  return (
    <div className={style.preloader}>
      <img className={style.preloader_img} src={preloader} alt="preloader" />
    </div>
  );
};
