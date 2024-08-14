import styles from "./index.module.scss"
import Card from "../../components/Card";
import logo from "../../assets/images/header/logo.png"
import giftCard from "../../assets/images/home/gifcard.png"
import React, {useState} from "react";
import SizeBox from "../../components/SizeBox";
import {APIBooking} from "../../api";
import {useLogin} from "../../provider/loginContext";
import {Button, message} from "antd";
import ReferralCodeModal from "../../components/ReferralCodeModal";

const Home = () =>{
  const [cardList, setCardList] = useState([
    {
      id:2500,
      price:2500,
      check:true,
      amount:1
    },
    {
      id:5000,
      price:5000,
      check:true,
      amount:1
    },
    {
      id:10000,
      price:10000,
      check:true,
      amount:1
    },
  ]);

  const [ openReferralCodeModal, setOpenReferralCodeModal]= useState(false);
  const { userInfo, setOpenLoginModal} = useLogin()
  const [loading, setLoading] = useState(false);

  const onCheck = (id:number) =>{
    const cardIndex = cardList.findIndex(item=>id === item.id)
    if(cardIndex !== -1){
      cardList[cardIndex].check = !cardList[cardIndex].check
    }
    setCardList(cardList.slice());
  }

  const setAmountById = (id:number, amount:number) =>{
    const cardIndex = cardList.findIndex(item=>id === item.id)
    if(cardIndex !== -1){
      cardList[cardIndex].amount = amount
    }
    setCardList(cardList.slice());
  }

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

    const bookingItemList = cardList.filter(item=>item.check).map(item=>{
      return {
        id:item.id!,
        num:item.amount
      }
    })
    if(bookingItemList.length <= 0){
      return message.info("Please select the Gift Card you want to book!")
    }
    setLoading(true)
    APIBooking({
      bookingItemList: bookingItemList,
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


  return <div className={styles.app}>
    <div className={styles.container}>
      <div className={styles.cardList}>
        {
          cardList.map(item=>{
            return <Card id={item.id} amount={item.amount} setAmount={setAmountById} onCheck={onCheck} price={item.price} imgSrc={giftCard} check={item.check}/>
          })
        }
      </div>
      <Button onClick={submit} loading={loading} className={styles.bookAllButton}>One click appointment</Button>
    </div>
    <ReferralCodeModal openReferralCodeModal={openReferralCodeModal} setOpenReferralCodeModal={setOpenReferralCodeModal} callback={submit}></ReferralCodeModal>
  </div>
}

export default Home
