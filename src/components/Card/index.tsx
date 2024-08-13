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
  setAmount?:(id:number, amount:number)=>void
}

const Card: React.FC<CardProps> = ({id,  amount = 0, setAmount = (v) => {},  price, imgSrc,  onlyShow = false, cardAmount, zoom= 1, check = false, onCheck, createTime}) => {
  const [loading, setLoading] = useState(false);
  const [ openReferralCodeModal, setOpenReferralCodeModal]= useState(false);
  const { setOpenLoginModal, userInfo } = useLogin()

  const submit = () =>{
    if(!userInfo){
      setOpenLoginModal(true)
      return;
    }

    let code = localStorage.getItem("referralCode")
    if(!code || code === "null") {
      setOpenReferralCodeModal(true)
      return;
    }

    if(code === "SKIP"){
      code = null
    }

    setLoading(true)
    APIBooking({
      bookingItemList:[
        {
          id:id!,
          num:amount
        }
      ],
      referralCode:code
    }).then((resp:any)=>{
      setLoading(false)
      if(resp.code === "47000"){
        localStorage.removeItem("referralCode")
        return message.error("Referral Code Error!")
      }

      if(resp.data){
       setLoading(false)
       return message.success("Appointment successful! We will send you an email!")
      }
      return message.error("Appointment failed, please try again")
    }).finally(()=>{
      setLoading(false)
    }).catch(e=>{
      return message.error("Appointment failed, please try again")
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
          <Button loading={loading} onClick={submit} className={styles.bookButton}>Subscribe</Button>
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
      <ReferralCodeModal openReferralCodeModal={openReferralCodeModal} setOpenReferralCodeModal={setOpenReferralCodeModal} callback={submit}></ReferralCodeModal>
    </div>
  );
};

export default Card;
