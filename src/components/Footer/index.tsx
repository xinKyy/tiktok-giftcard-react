import styles from "./index.module.scss"

const weizIcon = "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/icon/weiz.png"
const bookIcon = "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/icon/book.png"
const copyIcon = "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/icon/copy.png"
const emailIcon = "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/icon/email.png"
const personIcon = "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/icon/person.png"
const ruleIcon = "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/icon/rule.png"

const Footer = () =>{

  return <div className={styles.footer_wrap}>
    <div className={styles.footer_icon_wrap}>
      <a href={"/about?id=1"}>
        <div className={"flex items-center flex-1"}>
          <img src={personIcon}></img>
          <div className={styles.item}>会社概要</div>
        </div>
      </a>
      <a  href={"/about?id=2"}>
        <div className={"flex items-center flex-1"}>
          <img src={emailIcon}></img>
          <div className={styles.item}>お問い合わせ</div>
        </div>
      </a>
      <a  href={"/about?id=3"}>
        <div className={"flex items-center flex-1"}>
          <img src={weizIcon}></img>
          <div className={styles.item}>返品・返金ポリシー</div>
        </div>
      </a>
      <a  href={"/about?id=4"}>
        <div className={"flex items-center flex-1"}>
          <img src={copyIcon}></img>
          <div className={styles.item}>特定商取引法に基づく表示</div>
        </div>
      </a>
      <a href={"/about?id=5"}>
        <div className={"flex items-center flex-1"}>
          <img src={bookIcon}></img>
          <div className={styles.item}>利用規約</div>
        </div>
      </a>
      <a href={"/about?id=6"}>
        <div className={"flex items-center flex-1"}>
          <img src={ruleIcon}></img>
          <div className={styles.item}>プライバシーポリシー</div>
        </div>
      </a>
    </div>
    <div className={`${styles.bottom_text} flex items-center justify-center`}>
      abComo ecommerce pte ltd.2021 All rights reserved
    </div>
  </div>
}

export default Footer;
