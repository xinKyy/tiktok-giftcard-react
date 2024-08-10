// src/components/LoginForm/LoginForm.tsx
import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import {Modal} from "antd";
import {useLogin} from "../../provider/loginContext";
import Card from "../Card";
import giftCard from "../../assets/images/home/gifcard.png"
import {APIMyBooking, MyBookingParams} from "../../api";

class CardItem{
  price:number = 0
  cardAmount:number = 0
  createTime:string = ""
}

const MessagesModal = () => {
  const {openMessagesModal, setOpenMessagesModal} = useLogin()
  const [loading, setLoading] = useState(false);
  const [cardList, setCardList] = useState<CardItem[]>([])

  const getMyBooking = () =>{
    setLoading(true)
    const params = new MyBookingParams(1, 1000)
    APIMyBooking(params).then(resp=>{
      console.log(resp, "Resp")
      if(resp.data.data.records && resp.data.data.records.length >= 1){
        const list = resp.data.data.records.map((item:any)=>{
          return {
            price:item.skuId,
            cardAmount:item.bookingNum,
            createTime:item.createTime
          } as CardItem
        })
        setCardList(list);
      }
    }).finally(()=>{
      setLoading(false)
    })
  }

  useEffect(() =>{
    if(openMessagesModal){
      getMyBooking();
    }
  }, [openMessagesModal])

  return (
    <Modal width={700} title={null} footer={null} open={openMessagesModal} onCancel={()=>setOpenMessagesModal(false)}>
      <div>
        <div className={styles.section_title}>您已确认以下预约：</div>
        <div className={styles.loginForm}>

          <div className={styles.card_wrap}>
            {
              cardList.map(item=>{
                return <Card price={item.price} createTime={item.createTime} imgSrc={giftCard} onlyShow={true} cardAmount={item.cardAmount} zoom={0.8}></Card>
              })
            }
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MessagesModal;
