// src/components/Header/Header.tsx
import React, {useEffect} from 'react';
import styles from './index.module.scss';
import {useLogin} from "../../provider/loginContext";
import {Popover} from "antd";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {

  const { userInfo, setOpenLoginModal, setUserInfo, setOpenMessagesModal, setInConfirm} = useLogin()
  const navigate = useNavigate()
  const toReferCode = () => {
      window.location.href = "/referCode"
      navigate('/referCode');
  }
  const content = (
    <div className={styles.pop_content}>
      <div onClick={toReferCode}>紹介コード</div>
      <div onClick={()=>setOpenMessagesModal(true)}>メッセージ</div>
      {
        userInfo?.role === "admin" && <div onClick={()=>{
        navigate("/admin")
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
