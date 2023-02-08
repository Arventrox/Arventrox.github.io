import React from 'react';
// import summonersRift_image from '../../../assets/images/summoners_rift_img.jpeg';
import video from '../../../assets/videos/map-south-intro.webm';
import style from './Banner.module.scss';

const Banner = () => {
  return (
    <div className={style.banner}>
      {/* <img src={summonersRift_image}></img> */}
      <video className={style.video} src={video} autoPlay muted></video>
      <div className={style.shadow}></div>
    </div>
  );
};

export default Banner;
