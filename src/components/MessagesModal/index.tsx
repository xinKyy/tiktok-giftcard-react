// src/components/LoginForm/LoginForm.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import {Modal} from "antd";
import {useLogin} from "../../provider/loginContext";
import Card from "../Card";
import giftCard from "../../assets/images/home/gifcard.png"
const MessagesModal = () => {
  const {openMessagesModal, setOpenMessagesModal} = useLogin()

  return (
    <Modal width={700} title={null} footer={null} open={openMessagesModal} onCancel={()=>setOpenMessagesModal(false)}>
      <div className={styles.loginForm}>
        <div className={styles.section_title}>您已确认以下预约：</div>
        <div className={styles.card_wrap}>
          <Card price={2000} imgSrc={giftCard} onlyShow={true} cardAmount={2000} zoom={0.8}></Card>
          <Card price={2000} imgSrc={giftCard} onlyShow={true} cardAmount={2000} zoom={0.8}></Card>
          <Card price={2000} imgSrc={giftCard} onlyShow={true} cardAmount={2000} zoom={0.8}></Card>
        </div>
      </div>
    </Modal>
  );
};

export default MessagesModal;
