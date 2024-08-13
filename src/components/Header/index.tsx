// src/components/Header/Header.tsx
import React from 'react';
import styles from './index.module.scss';
import logo from  "../../assets/images/header/logo.png"
import {useLogin} from "../../provider/loginContext";
import {Popover} from "antd";
import MessagesModal from "../MessagesModal";

const Header: React.FC = () => {

  const { userInfo, setOpenLoginModal, setUserInfo, setOpenMessagesModal} = useLogin()

  const content = (
    <div className={styles.pop_content}>
      <div>Referral Code: {userInfo?.referralCode}</div>
      <div onClick={()=>setOpenMessagesModal(true)}>Messages</div>
      <div onClick={()=>{
        localStorage.removeItem("userInfo")
        localStorage.removeItem("token")
        localStorage.removeItem("referralCode")
        localStorage.removeItem("id")
        setUserInfo(null)
      }}>Logout</div>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Tik Tok" />
      </div>
      <div className={styles.userInfo}>
        {
          userInfo ?
          <Popover placement={"bottom"} content={content}>
            <span>Hello, {userInfo.email}</span>
          </Popover> :   <button onClick={()=>setOpenLoginModal(true)} className={styles.bookAllButton}>Login</button>
        }
      </div>
    </header>
  );
};

export default Header;
