import React from 'react';
// import summonersRift_image from '../../../assets/images/summoners_rift_img.jpeg';
import style from './Banner.module.scss';

const Banner = () => {
  return (
    <div className={style.banner}>
      {/* <img src={summonersRift_image}></img> */}
      <video
        className={style.video}
        src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/video/position-assignment-intro/map-south-intro.webm'
        autoPlay
        muted
      ></video>
      <div className={style.shadow}></div>
    </div>
  );
};

export default Banner;
