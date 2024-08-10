import styles from "./index.module.scss"
import Card from "../../components/Card";
import logo from "../../assets/images/header/logo.svg"
import giftCard from "../../assets/images/home/gifcard.png"
import {useState} from "react";

const Home = () =>{


  const [cardList, setCardList] = useState([
    {
      id:2500,
      price:2500,
      check:true
    },
    {
      id:5000,
      price:5000,
      check:true
    },
    {
      price:10000,
      check:true
    },
  ]);

  const onCheck = (id:number) =>{
    console.log(id, "IDIDID")
    const cardIndex = cardList.findIndex(item=>id === item.id)
    if(cardIndex !== -1){
      cardList[cardIndex].check = !cardList[cardIndex].check
    }
    setCardList(cardList.slice());
  }


  return <div className={styles.app}>
    <div className={styles.container}>
      <div className={styles.cardList}>
        {
          cardList.map(item=>{
            return <Card id={item.id} onCheck={onCheck} price={item.price} imgSrc={giftCard} check={item.check}/>
          })
        }
      </div>
      <button className={styles.bookAllButton}>一键预约</button>
    </div>
  </div>
}

export default Home
