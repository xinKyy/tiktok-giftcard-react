import React, {useState} from 'react';
import styles from './index.module.scss';
import tikTokIcon from '../../assets/images/header/logo-black.png';
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
              tiktokギフトカードへようこそ！
          </div>
        </div>
        <div className={styles.content}>
            3種類のギフトカードからお選びいただけます。お好みに合わせてギフトカードの種類と枚数を選択してください。
          <br />
            複数のギフトカードを選択したい場合は、希望するギフトカード（右上隅）にチェックを入れて、予約をクリックしてください。
          <br /><br />
          <span style={{fontWeight:"bold"}}>
             アカウントの「メッセージ」を選択すると、予約内容を確認できます。
予約の方、お待ちしております。
          </span>
        </div>
        <button onClick={cancel} className={styles.button}>OK</button>
      </div>
    </Modal>
  );
};

export default TipsModal;
