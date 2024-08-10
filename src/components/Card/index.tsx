// src/components/Card/Card.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import NumberInput from "../NumberInput";

interface CardProps {
  price: number;
  imgSrc: string;
}

const Card: React.FC<CardProps> = ({ price, imgSrc }) => {
  const [amount, setAmount] = useState(1);
  return (
    <div className={styles.card}>
      <img src={imgSrc} alt="Product" />
      <div className={styles.price}>{price}</div>
      <NumberInput amount={amount} setAmount={(v)=>{setAmount(v)}}></NumberInput>
      <button className={styles.bookButton}>现在预约</button>
      <div className={styles.checkIcon}>✔️</div>
    </div>
  );
};

export default Card;
