// src/components/Card/Card.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import NumberInput from "../NumberInput";
import {useLogin} from "../../provider/loginContext";
import checkedIcon from "../../assets/images/home/checked-icon.svg"
import {APIBooking} from "../../api";
import {Button, message} from "antd";
import ReferralCodeModal from "../ReferralCodeModal";

interface CardProps {
  price: string;
  imgSrc: string;
  zoom?:number
  createTime:string
}

const MessageCard: React.FC<CardProps> = ({price, imgSrc, zoom= 1, createTime}) => {
  return (
    <div style={{
      zoom:zoom
    }} className={styles.card}>
      <div>
        <img src={imgSrc} alt="Product" />
        <div className={styles.price}>{price}</div>
      </div>
      <div className={styles.card_amount}>
        <div>{createTime}</div>
      </div>
    </div>
  );
};

export default MessageCard;
