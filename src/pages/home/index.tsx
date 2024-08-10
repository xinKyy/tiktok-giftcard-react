import styles from "./index.module.scss"
import Card from "../../components/Card";
import logo from "../../assets/images/header/logo.svg"
import giftCard from "../../assets/images/home/gifcard.png"
import {useState} from "react";
import SizeBox from "../../components/SizeBox";
import {APIBooking} from "../../api";
import {useLogin} from "../../provider/loginContext";
import {Button, message} from "antd";

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
      price:10000,
      check:true,
      amount:1
    },
  ]);

  const { setOpenLoginModal, userInfo, } = useLogin();
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

    const bookingItemList = cardList.filter(item=>item.check).map(item=>{
      return {
        id:item.id!,
        num:item.amount
      }
    })
    setLoading(true)
    APIBooking({
      bookingItemList: bookingItemList,
    }).then(resp=>{
      if(resp.data){
        return message.success("预约成功！")
      }
      return message.info("异常，请重试！")
    }).finally(()=>{
      setLoading(false)
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
      <Button onClick={submit} loading={loading} className={styles.bookAllButton}>一键预约</Button>
    </div>
  </div>
}

export default Home
