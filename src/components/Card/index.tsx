// src/components/Card/Card.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import NumberInput from "../NumberInput";
import {useLogin} from "../../provider/loginContext";
import checkedIcon from "../../assets/images/home/checked-icon.svg"

interface CardProps {
  id?:number;
  price: number;
  imgSrc: string;
  onlyShow?:boolean;
  cardAmount?:number;
  zoom?:number
  check?:boolean;
  onCheck?:(id:number)=>void;
}

const Card: React.FC<CardProps> = ({id,  price, imgSrc,  onlyShow = false, cardAmount, zoom= 1, check = false, onCheck}) => {
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
          <img onClick={()=>{
            if(onCheck) onCheck(id!);
          }} style={{
            background:check ? "#fff":"#000"
          }} className={styles.check_wrap} src={checkedIcon}></img>
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
