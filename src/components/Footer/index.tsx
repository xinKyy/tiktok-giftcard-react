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
      <a target={"_blank"} href={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/123%29%20%E4%BC%9A%E7%A4%BE%E6%A6%82%E8%A6%81%E3%80%80%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%80%80%E8%BF%94%E5%93%81%E3%83%BB%E4%BA%A4%E6%8F%9B%E3%83%BB%E3%82%AD%E3%83%A3%E3%83%B3%E3%82%BB%E3%83%AB%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.docx"}>
        <div className={"flex items-center flex-1"}>
          <img src={personIcon}></img>
          <div className={styles.item}>会社概要</div>
        </div>
      </a>
      <div className={"flex items-center flex-1"}>
        <img src={emailIcon}></img>
        <div className={styles.item}>お問い合わせ</div>
      </div>
      <div className={"flex items-center flex-1"}>
        <img src={weizIcon}></img>
        <div className={styles.item}>返品・返金ポリシー</div>
      </div>
      <a target={"_blank"} href={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/6%EF%BC%89%20%E7%89%B9%E5%95%86%E6%B3%95.xlsx"}>
        <div className={"flex items-center flex-1"}>
          <img src={copyIcon}></img>
          <div className={styles.item}>特定商取引法に基づく表示</div>
        </div>
      </a>
      <a target={"_blank"} href={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/5%EF%BC%89%20%E5%88%A9%E7%94%A8%E8%A6%8F%E7%B4%84.docx"}>
        <div className={"flex items-center flex-1"}>
          <img src={bookIcon}></img>
          <div className={styles.item}>利用規約</div>
        </div>
      </a>
      <a target={"_blank"} href={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/tiktok_assets/4%29%20%E3%83%95%E3%82%9A%E3%83%A9%E3%82%A4%E3%83%8F%E3%82%99%E3%82%B7%E3%83%BC%E3%83%9B%E3%82%9A%E3%83%AA%E3%82%B7%E3%83%BC.docx"}>
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
