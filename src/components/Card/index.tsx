// src/components/Card/Card.tsx
import React, {useState} from 'react';
import styles from './index.module.scss';
import NumberInput from "../NumberInput";
import {useLogin} from "../../provider/loginContext";
import checkedIcon from "../../assets/images/home/checked-icon.svg"
import {APIBooking} from "../../api";
import {Button, message} from "antd";

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
  setAmount?:(id:number, amount:number)=>void
}

const Card: React.FC<CardProps> = ({id,  amount = 0, setAmount = (v) => {},  price, imgSrc,  onlyShow = false, cardAmount, zoom= 1, check = false, onCheck, createTime}) => {
  const [loading, setLoading] = useState(false);

  const { setOpenLoginModal, userInfo, } = useLogin()

  const submit = () =>{
    if(!userInfo){
      setOpenLoginModal(true)
      return;
    }
    setLoading(true)
    APIBooking({
      bookingItemList:[
        {
          id:id!,
          num:amount
        }
      ],
    }).then(resp=>{
      if(resp.data){
       return message.success("预约成功！")
      }
      return message.info("异常，请重试！")
    }).finally(()=>{
      setLoading(false)
    })
  }


  return (
    <div style={{
      zoom:zoom
    }} className={styles.card}>
      <img src={imgSrc} alt="Product" />
      <div className={styles.price}>{price}</div>
      {
        !onlyShow ? <>
          <NumberInput amount={amount} setAmount={(v)=>{setAmount(id!, v)}}></NumberInput>
          <Button loading={loading} onClick={submit} className={styles.bookButton}>现在预约</Button>
          <img onClick={()=>{
            if(onCheck) onCheck(id!);
          }} style={{
            background:check ? "#fff":"#000"
          }} className={styles.check_wrap} src={checkedIcon}></img>
        </> : <>
          <div className={styles.card_amount}>
            <div>您预定了：<span>{cardAmount}</span>张</div>
            <div>{createTime}</div>
          </div>
        </>
      }
    </div>
  );
};

export default Card;
