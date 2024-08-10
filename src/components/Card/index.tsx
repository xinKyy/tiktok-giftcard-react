// src/components/Card/Card.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import NumberInput from "../NumberInput";
import {useLogin} from "../../provider/loginContext";

interface CardProps {
  price: number;
  imgSrc: string;
}

const Card: React.FC<CardProps> = ({ price, imgSrc }) => {
  const [amount, setAmount] = useState(1);

  const { setOpenLoginModal, userInfo, } = useLogin()

  const submit = () =>{
    if(!userInfo){
      setOpenLoginModal(true)
      return;
    }
  }

  return (
    <div className={styles.card}>
      <img src={imgSrc} alt="Product" />
      <div className={styles.price}>{price}</div>
      <NumberInput amount={amount} setAmount={(v)=>{setAmount(v)}}></NumberInput>
      <button onClick={submit} className={styles.bookButton}>现在预约</button>
    </div>
  );
};

export default Card;
