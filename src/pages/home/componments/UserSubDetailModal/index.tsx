import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import {Modal, Spin} from "antd";
import giftCard from "../../../../assets/images/home/gifcard.png"
import {APIMyBooking, MyBookingParams} from "../../../../api";
import MessageCard from "../../../../components/MessageCard";

class CardItem{
  price:string = ""
  createTime:string = ""
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
}

interface Result {
  price: string;
  createTime: string;
}


const UserSubDetailModal = ({open, setOpen, userId}:{open:boolean, setOpen:(open:boolean)=>void, userId:string}) => {
  const [loading, setLoading] = useState(false);
  const [cardList, setCardList] = useState<CardItem[]>([])
  const getMyBooking = () =>{
      console.log(userId, "userId")
    if(!userId) return;

    setLoading(true)
    // const params = new MyBookingParams(1, 1000)
    const params = {
        pageNum:1,
        pageSize:1000,
        userId:userId
    } as MyBookingParams
    APIMyBooking(params).then(resp=>{
      console.log(resp, "Resp")
      if(resp.data.data.records && resp.data.data.records.length >= 1){
        const data = resp.data.data.records
        const grouped: { [key: string]: Result } = data.reduce((acc:any, item:Booking) => {
          const { bookingGroup, skuId, bookingNum, createTime } = item;
          if (!acc[bookingGroup]) {
            acc[bookingGroup] = {
              price: `${skuId}x${bookingNum}`,
              createTime
            };
          } else {
            acc[bookingGroup].price += `,  ${skuId}x${bookingNum}`;
            acc[bookingGroup].createTime = acc[bookingGroup].createTime < createTime
              ? acc[bookingGroup].createTime
              : createTime;
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

  useEffect(()=>{
      if(open){
          getMyBooking();
      }
  }, [open])

  return (
    <Modal width={700} title={null} footer={null} open={open} onCancel={()=>setOpen(false)}>
      <div>
        <div className={styles.section_title}>以下の予約が確認されました:</div>
        <div className={styles.loginForm}>
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
                    createTime={item.createTime}
                    imgSrc={giftCard}></MessageCard>
                })
              }
            </div>
          </Spin>
        </div>
      </div>
    </Modal>
  );
};

export default UserSubDetailModal;
