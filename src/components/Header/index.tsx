// src/components/Header/Header.tsx
import React, {useEffect} from 'react';
import styles from './index.module.scss';
import logo from  "../../assets/images/header/logo.png"
import {useLogin} from "../../provider/loginContext";
import {Popover} from "antd";
import MessagesModal from "../MessagesModal";

const Header: React.FC = () => {

  const { userInfo, setOpenLoginModal, setUserInfo, setOpenMessagesModal, setInConfirm} = useLogin()

  const content = (
    <div className={styles.pop_content}>
      <div>紹介コード: {userInfo?.referralCode}</div>
      <div onClick={()=>setOpenMessagesModal(true)}>メッセージ</div>
      {
        userInfo?.role === "admin" && <div onClick={()=>{
        setInConfirm("table")
      }}>管理者</div>
      }
      <div onClick={()=>{
        localStorage.removeItem("userInfo")
        localStorage.removeItem("token")
        localStorage.removeItem("referralCode")
        localStorage.removeItem("id")
        setUserInfo(null)
        window.location.href = "/"
      }}>ログアウト</div>
    </div>
  );


  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={"https://tiktokmaill.s3.ap-southeast-1.amazonaws.com/logo_tk.png"} alt="Tik Tok" />
      </div>
      <div className={styles.userInfo}>
        {
          userInfo ?
          <Popover trigger={"click"} placement={"bottom"} content={content}>
            <span>{userInfo.email}</span>
          </Popover> :   <button onClick={()=>setOpenLoginModal(true)} className={styles.bookAllButton}>ログイン</button>
        }
      </div>
    </header>
  );
};

export default Header;
