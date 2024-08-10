// src/components/Header/Header.tsx
import React from 'react';
import styles from './index.module.scss';
import logo from  "../../assets/images/header/logo.svg"
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
        setUserInfo(null)
      }}>Logout</div>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Tik Tok" />
        <span>Tik Tok</span>
      </div>
      <div className={styles.userInfo}>
        {
          userInfo ?
          <Popover placement={"bottom"} content={content}>
            <span>Hello, {userInfo.email}</span>
          </Popover> :   <button onClick={()=>setOpenLoginModal(true)} className={styles.bookAllButton}>登陆</button>
        }
      </div>
    </header>
  );
};

export default Header;
