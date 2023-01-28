import React from 'react';
import style from './LoadingSpinner.module.scss';
import spinner from '../../../assets/images/spinner.png';

const LoadingSpinner = () => {
  return (
    <span className={style.loader}>
      <img src={spinner}></img>
    </span>
  );
};

export default LoadingSpinner;
