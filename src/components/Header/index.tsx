// src/components/Header/Header.tsx
import React, {useEffect, useMemo} from 'react';
import styles from './index.module.scss';
import {useLogin} from "../../provider/loginContext";
import {Popover} from "antd";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {

  const { userInfo, setOpenLoginModal, setUserInfo, setOpenMessagesModal} = useLogin()
  const navigate = useNavigate()
  const toReferCode = () => {
      navigate('/referCode');
  }


  const content = (
    <div className={styles.pop_content}>
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
          userInfo?.email ?
          <Popover trigger={"click"} placement={"bottom"} content={content}>
            <span>{userInfo.email}</span>
          </Popover> :   <button onClick={()=>setOpenLoginModal(true)} className={styles.bookAllButton}>ログイン</button>
        }
      </div>
    </header>
  );
};

export default Header;
