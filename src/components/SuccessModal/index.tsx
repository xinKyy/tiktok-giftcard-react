import React, {useState} from 'react';
import styles from './index.module.scss';
import tikTokIcon from '../../assets/images/header/logo-black.png';
import {Modal} from "antd"; // Assuming you have an SVG of the TikTok icon


interface Props{
  open:boolean,
  cancel:()=>void,
  cancelHome:()=>void
}

const SuccessModal = (props:Props) => {
  const {open, cancel, cancelHome} = props;
  return (
    <Modal  title={null} footer={null} open={open} onCancel={()=>{
      cancel()
      cancelHome()
    }}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <img src={tikTokIcon} className={styles.icon} />
        </div>
        <div className={styles.content}>
            予約が正常に完了しました。
          <br />
          <span style={{fontWeight:"bold"}}>
          ありがとうございます！
          </span>
        </div>
        <button onClick={()=>{
          cancel()
          cancelHome()
        }} className={styles.button}>OK</button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
