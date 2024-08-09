// src/components/Card/Card.tsx
import React from 'react';
import styles from './index.module.scss';

interface CardProps {
  price: number;
  imgSrc: string;
}

const Card: React.FC<CardProps> = ({ price, imgSrc }) => {
  return (
    <div className={styles.card}>
      <img src={imgSrc} alt="Product" />
      <div className={styles.price}>{price}</div>
      <div className={styles.quantityControl}>
        <button>-</button>
        <span>1</span>
        <button>+</button>
      </div>
      <button className={styles.bookButton}>现在预约</button>
      <div className={styles.checkIcon}>✔️</div>
    </div>
  );
};

export default Card;
