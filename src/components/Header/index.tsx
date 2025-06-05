// src/components/Header/Header.tsx
import React, {useEffect, useMemo} from 'react';
import styles from './index.module.scss';
import {useLogin} from "../../provider/loginContext";
import {message, Popover} from "antd";
import {useNavigate} from "react-router-dom";
import eventSub, {EventName} from "../../util/EventSub";
import logo from  "../../assets/images/header/logo.png"

const Header: React.FC = () => {

  const { userInfo, setOpenLoginModal, setUserInfo, setOpenMessagesModal} = useLogin()
  const navigate = useNavigate()
  const toReferCode = () => {
      navigate('/referCode');
  }

  const logout = () =>{
      localStorage.removeItem("userInfo")
      localStorage.removeItem("token")
      localStorage.removeItem("referralCode")
      localStorage.removeItem("id")
      setUserInfo(null)
      window.location.href = "/"
  }

  const listenLogout =  ()=>{
      message.info("ログインの有効期限が切れました。再度お試しください。")
      logout()
  }

  const initNc = () =>{
      eventSub.subscribe(EventName.NoAuth, listenLogout)
  }
    useEffect(() => {
        initNc()
        return ()=>{
            eventSub.unsubscribe(EventName.NoAuth, listenLogout)
        }
    }, []);


  const content = (
    <div className={styles.pop_content}>
        <div onClick={()=>{
            navigate("/records")
        }}>購入記録</div>
      <div onClick={()=>{
          logout()
      }}>ログアウト</div>
    </div>
  );


  return (
    <header className={styles.header}>
      <div onClick={()=>navigate("/")} className={styles.logo}>
        <img src={logo} alt="Tik Tok" />
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
