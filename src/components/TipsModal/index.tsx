import React, {useState} from 'react';
import styles from './index.module.scss';
import tikTokIcon from '../../assets/images/header/logo-black.png';
import stepIcon from '../../assets/images/header/step_icon.png';
import {Modal} from "antd"; // Assuming you have an SVG of the TikTok icon


interface Props{
  open:boolean,
  cancel:()=>void
}

const TipsModal = (props:Props) => {
  const {open, cancel} = props;
  return (
    <Modal  centered title={null} footer={null} open={open} onCancel={cancel}>
      <div className={styles.popup}>
        <div className={styles.header}>
          {/*<img src={tikTokIcon} className={styles.icon} />*/}
          <div>
              TikTok ギフトカードの購入方法！
          </div>
        </div>
        <div className={styles.sub_header}><span>3</span>ステップで完結！</div>

          <div className={styles.step_wrap}>
              <img src={stepIcon}/>
              <div className={styles.des_wrap}>
                  <div className={styles.des_item}>
                      1.選択
                      <div>ギフトカードの種類を選択</div>
                  </div>
                  <div className={styles.des_item}>
                      2. 予約
                      <div>紹介コードを入力して予約！</div>
                  </div>
                  <div className={styles.des_item}>
                      3.購入完了！
                      <div>右上のメニューで注文を確認可能</div>
                  </div>
              </div>
          </div>

{/*        <div className={styles.content}>*/}
{/*            3種類のギフトカードからお選びいただけます。お好みに合わせてギフトカードの種類と枚数を選択してください。*/}
{/*          <br />*/}
{/*            複数のギフトカードを選択したい場合は、希望するギフトカード（右上隅）にチェックを入れて、予約をクリックしてください。*/}
{/*          <br /><br />*/}
{/*          <span style={{fontWeight:"bold"}}>*/}
{/*             アカウントの「メッセージ」を選択すると、予約内容を確認できます。*/}
{/*予約の方、お待ちしております。*/}
{/*          </span>*/}
{/*        </div>*/}
        <button onClick={cancel} className={styles.button}>OK</button>
      </div>
    </Modal>
  );
};

export default TipsModal;
