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
  id?:number;
  price: number;
  imgSrc: string;
  onlyShow?:boolean;
  cardAmount?:number;
  zoom?:number
  check?:boolean;
  onCheck?:(id:number)=>void;
  amount?:number,
  createTime?:string,
  setAmount?:(id:number, amount:number)=>void,
  value?:number,
  submit?:(bookingItemList:{
    id:number,
    num:number
  }[])=>void
}

const Card: React.FC<CardProps> = ({id, value, submit,  amount = 0, setAmount = (v) => {},  price, imgSrc,  onlyShow = false, cardAmount, zoom= 1, check = false, onCheck, createTime}) => {
  return (
    <div style={{
      zoom:zoom
    }} className={styles.card}>
      <img src={imgSrc} alt="Product" />
      <div className={styles.price}>{price}</div>
      {
        !onlyShow ? <>
          <NumberInput amount={amount} setAmount={(v)=>{setAmount(id!, v)}}></NumberInput>
          <Button disabled={!value || value <= 0} onClick={()=>{
           if(submit) submit([{
              id:id!,
              num:amount
            }])
          }} className={styles.bookButton}>Subscribe</Button>
          <div className={styles.value_wrap}>
            Available today: <span>
            {value}
          </span>
          </div>
          <div onClick={()=>{
            if(onCheck) onCheck(id!);
          }} >
            {
              check ? <img className={styles.check_wrap} src={checkedIcon}></img> :  <div style={{
                border:"2px solid #fff"
              }} className={styles.check_wrap}>
              </div>
            }
          </div>
        </> : <>
          <div className={styles.card_amount}>
            <div>You have made a reservation：<span>{cardAmount}</span></div>
            <div>{createTime}</div>
          </div>
        </>
      }
    </div>
  );
};

export default Card;
