// src/components/Card/Card.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import NumberInput from "../NumberInput";
import {useLogin} from "../../provider/loginContext";

interface CardProps {
  price: number;
  imgSrc: string;
  onlyShow?:boolean;
  cardAmount?:number;
  zoom?:number
}

const Card: React.FC<CardProps> = ({ price, imgSrc,  onlyShow = false, cardAmount, zoom= 1}) => {
  const [amount, setAmount] = useState(1);

  const { setOpenLoginModal, userInfo, } = useLogin()

  const submit = () =>{
    if(!userInfo){
      setOpenLoginModal(true)
      return;
    }
  }

  return (
    <div style={{
      zoom:zoom
    }} className={styles.card}>
      <img src={imgSrc} alt="Product" />
      <div className={styles.price}>{price}</div>
      {
        !onlyShow ? <>
          <NumberInput amount={amount} setAmount={(v)=>{setAmount(v)}}></NumberInput>
          <button onClick={submit} className={styles.bookButton}>现在预约</button>
        </> : <>
          <div className={styles.card_amount}>
            <div>您预定了：<span>{cardAmount}</span>张</div>
            <div>2024年5月</div>
          </div>
        </>
      }
    </div>
  );
};

export default Card;
