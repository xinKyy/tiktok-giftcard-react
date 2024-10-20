// src/components/LoginForm/LoginForm.tsx
import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import {Modal, Spin, TabsProps} from "antd";
import {useLogin} from "../../provider/loginContext";
import { Tabs } from 'antd';
import giftCard from "../../assets/images/home/gifcard.png"
import {APIMyBooking, MyBookingParams} from "../../api";
import MessageCard from "../MessageCard";

class CardItem{
  price:string = ""
  createTime:string = ""
  realEmail:string = ""
}

interface Booking {
  id: number;
  userId: number;
  skuId: number;
  bookingNum: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  referralCode: string;
  bookingGroup: string;
  realEmail:string;
}

interface Result {
  price: string;
  createTime: string;
  realEmail:string;
}


const MessagesModal = () => {
  const {openMessagesModal, setOpenMessagesModal, userInfo} = useLogin()
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '自己买的',
      children: <Card1 type={1}/>,
    },
    {
      key: '2',
      label: '别人送的',
      children:  <Card1 type={2}/>,
    },
    {
      key: '3',
      label: '我送别人的',
      children:  <Card1 type={3}/>,
    },
  ];

  return (
    <Modal width={700} title={null} footer={null} open={openMessagesModal} onCancel={()=>setOpenMessagesModal(false)}>
      <div>
        <div className={styles.section_title}>以下の予約が確認されました:</div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </Modal>
  );
};

const Card1 = ({type}:{type:number}) =>{
  const [loading, setLoading] = useState(false);
  const [cardList, setCardList] = useState<CardItem[]>([])
  const {openMessagesModal, setOpenMessagesModal, userInfo} = useLogin()

  const getMyBooking = () =>{
    setLoading(true)
    const params = new MyBookingParams(1, 1000, type)
    APIMyBooking(params).then(resp=>{
      console.log(resp, "Resp")
      if(resp.data.data.records && resp.data.data.records.length >= 1){
        const data = resp.data.data.records
        const grouped: { [key: string]: Result } = data.reduce((acc:any, item:Booking) => {
          const { bookingGroup, skuId, bookingNum, createTime, realEmail } = item;
          if (!acc[bookingGroup]) {
            acc[bookingGroup] = {
              price: `${skuId}x${bookingNum}`,
              createTime,
              realEmail:realEmail
            };
          } else {
            acc[bookingGroup].price += `,  ${skuId}x${bookingNum}`;
            acc[bookingGroup].createTime = acc[bookingGroup].createTime < createTime
              ? acc[bookingGroup].createTime
              : createTime;
            acc[bookingGroup].realEmail = realEmail
          }
          return acc;
        }, {} as { [key: string]: Result });

        const result = Object.values(grouped);

        // const list = resp.data.data.records.map((item:any)=>{
        //   return {
        //     price:item.skuId,
        //     createTime:item.createTime
        //   } as CardItem
        // })
        setCardList(result);
      }
    }).finally(()=>{
      setLoading(false)
    }).catch(e=>{

    })
  }

  useEffect(() =>{
    if(openMessagesModal){
      getMyBooking();
    } else {
      setCardList([])
    }
  }, [openMessagesModal])

  useEffect(() => {
    if(!userInfo){
      setCardList([])
    }
  }, [userInfo]);
  return <div className={styles.loginForm}>
    {
      cardList.length <= 0 && !loading && <div>
        まだ予約を入れていないようですね。
      </div>
    }
    <Spin spinning={loading}>
      <div className={styles.card_wrap}>
        {
          cardList.map(item=>{
            return <MessageCard
              price={item.price}
              realEmail={item?.realEmail}
              createTime={item.createTime}
              imgSrc={giftCard}></MessageCard>
          })
        }
      </div>
    </Spin>
  </div>

}


export default MessagesModal;
