import React, {useState} from 'react';
import styles from './index.module.scss';
import tikTokIcon from '../../assets/images/header/logo.png';
import {Modal} from "antd"; // Assuming you have an SVG of the TikTok icon


interface Props{
  open:boolean,
  cancel:()=>void
}

const TipsModal = (props:Props) => {
  const {open, cancel} = props;
  return (
    <Modal  title={null} footer={null} open={open} onCancel={cancel}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <img src={tikTokIcon} className={styles.icon} />
          <div>
            Welcome to tiktokgiftcard!
          </div>
        </div>
        <div className={styles.content}>
          There are three types of gift cards for you to choose from, you can select the type of gift card and the number of cards according to your preference.
          <br />
          If you want to choose more than one gift card, please tick the desired gift cards (in the upper right corner) and click on Booking. You can view your booking by selecting "Messages" in your account.
          <br /><br />
          <span style={{fontWeight:"bold"}}>
             We wish you a pleasant booking experience!
          </span>
        </div>
        <button onClick={cancel} className={styles.button}>OK</button>
      </div>
    </Modal>
  );
};

export default TipsModal;
