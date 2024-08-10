import styles from "./index.module.scss"
import Card from "../../components/Card";
import logo from "../../assets/images/header/logo.svg"
import giftCard from "../../assets/images/home/gifcard.png"

const Home = () =>{
  return <div className={styles.app}>
    <div className={styles.container}>
      <button className={styles.bookAllButton}>一键预约</button>
      <div className={styles.cardList}>
        <Card price={2500} imgSrc={giftCard}/>
        <Card price={5000} imgSrc={giftCard}/>
        <Card price={10000} imgSrc={giftCard}/>
      </div>
    </div>
  </div>
}

export default Home
