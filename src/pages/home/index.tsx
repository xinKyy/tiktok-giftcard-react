import styles from "./index.module.scss"
import Header from "../../components/Header";
import Card from "../../components/Card";

const Home = () =>{
  return <div className={styles.app}>
    <div className={styles.container}>
      <button className={styles.bookAllButton}>一键预约</button>
      <div className={styles.cardList}>
        <Card price={2500} imgSrc="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7330417489756553222~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=48965&refresh_token=5b1b5237575d5bd85ed9b408cbe9befc&x-expires=1723388400&x-signature=3q9KSyV47SlDRl5HpNOweBe%2Bl2k%3D&shp=a5d48078&shcp=81f88b70" />
        <Card price={5000} imgSrc="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7330417489756553222~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=48965&refresh_token=5b1b5237575d5bd85ed9b408cbe9befc&x-expires=1723388400&x-signature=3q9KSyV47SlDRl5HpNOweBe%2Bl2k%3D&shp=a5d48078&shcp=81f88b70" />
        <Card price={10000} imgSrc="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7330417489756553222~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=48965&refresh_token=5b1b5237575d5bd85ed9b408cbe9befc&x-expires=1723388400&x-signature=3q9KSyV47SlDRl5HpNOweBe%2Bl2k%3D&shp=a5d48078&shcp=81f88b70" />
      </div>
    </div>
  </div>
}

export default Home
