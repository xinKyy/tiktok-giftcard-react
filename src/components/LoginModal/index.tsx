// src/components/LoginForm/LoginForm.tsx
import React, {useRef, useState} from 'react';
import styles from './index.module.scss';
import {Button, Form, Input, message, Modal} from "antd";
import {useLogin} from "../../provider/loginContext";
import TipsModal from "../TipsModal";
import {login, sendVerificationCode, UserInfo} from "../../api/newApi";
import eventSub, {EventName} from "../../util/EventSub";

const LoginForm = () => {
  const {openLoginModal, setOpenLoginModal, setUserInfo} = useLogin()
  const [loading, setLoading] = useState(false);
  const [ openTipsModal, setOpenTipsModal]= useState(false);
  const [sendCodeLoading, setSendCodeLoading] = useState(false)

  const [sendNum, setSendNum] = useState<number | null>(null);

  const timer = useRef<any>();
  const currentTimer = useRef(60)

  const [form] = Form.useForm();

  const onSubmit = () =>{
    const v = form.getFieldsValue();
    setLoading(true);
    login({
      username: v.email,
      verificationCode:v.verifyCode,
    }).then(resp=>{
      if (resp.code === 200){
        const token = resp.data.token
        const refreshToken = resp.data.refreshToken
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        const user1 = {
          email: v.email,
        } as UserInfo
        localStorage.setItem("userInfo", JSON.stringify(user1))
        setUserInfo(user1)
        setOpenLoginModal(false);
        form.resetFields();
        message.success("ログイン成功")
        setTimeout(() => {
            eventSub.publish(EventName.LoginSuccess)
        }, 300)
      } else {
          message.info("認証コードが正しくありません")
      }
    }).finally(() => {
      setLoading(false);
    })
  }

  const getCode = () =>{
    const v = form.getFieldsValue();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(v.email)) return;
    setSendCodeLoading(true)
    sendVerificationCode({
      email:v.email,
      type: 2
    }).then(resp =>{
      if (resp.code === 200) {
        message.success("認証コードの送信に成功")
        openTimer();
        setSendCodeLoading(false)
        return;
      }
      message.error("送信に失敗しました。再試行してください")
    }).catch(e=>{
      message.error("送信に失敗しました。再試行してください")
    }).finally(()=>{
      setSendCodeLoading(false)
    })
  }

  const openTimer = () =>{
    timer.current = setInterval(()=>{
      if(currentTimer.current && currentTimer.current >= 1){
        currentTimer.current = currentTimer.current - 1
        setSendNum(currentTimer.current)
      } else {
        clearInterval(timer.current)
        timer.current = null
        setSendNum(null)
        currentTimer.current = 60
      }
    }, 1000)
  }

  return (
    <div className={styles.login_page}>
      <Modal rootClassName={"login_page"} className={"login_page"} title={null} footer={null} open={openLoginModal} onCancel={()=>setOpenLoginModal(false)}>
        <div className={styles.loginForm}>
          <div className={styles.logo}>
          </div>
          <h2>ようこそ！</h2>
          <p>カードを購入するには、ログインが必要です。</p>
          <Form autoComplete={"off"} form={form} onFinish={onSubmit}>
            <div className={styles.inputGroup}>
              <label>メール</label>
              <Form.Item rules={[
                {
                  required:true,
                  message:"メールアドレスを入力してください"
                },
                {
                  type: "email",
                  message: "入力されたメールアドレスは有効ではありません",
                },
              ]} name={"email"}>
                <Input type="email" placeholder="メールアドレスを入力してください" />
              </Form.Item>
            </div>
            {
              // isRegis && <div className={styles.inputGroupWithButton}>
              //   <div className={styles.inputGroup}>
              //     <label>captcha</label>
              //     <input type="text" placeholder="Please enter your captcha" />
              //   </div>
              //   <button type="button" className={styles.captchaButton}>sent</button>
              // </div>
            }

            {/*<div className={styles.inputGroup}>*/}
            {/*  <label>Password   <span className={styles.des}>(First login is considered as registration.)</span></label>*/}
            {/*  <Form.Item rules={[*/}
            {/*    {*/}
            {/*      required:true,*/}
            {/*      message:"Please enter your password!"*/}
            {/*    },*/}
            {/*  ]} name={"password"}>*/}
            {/*    <Input type={"password"} placeholder="Please enter referral code!" />*/}
            {/*  </Form.Item>*/}
            {/*</div>*/}

            <div className={styles.inputGroup}>
              <label>認証コード</label>
              <Form.Item rules={[
                {
                  required:true,
                  message:"認証コードを入力してください"
                },
              ]} name={"verifyCode"}>
                <div className={styles.code_wrap}>
                  <Input placeholder="認証コードを入力してください" />
                  <Button loading={sendCodeLoading} disabled={sendNum != null} onClick={getCode} className={styles.send_btn}> {sendNum != null ? `${sendNum} s` : "コードを送信"}</Button>
                </div>
              </Form.Item>
            </div>
            {/*<div className={styles.forgotPassword}>*/}
            {/*  <a href="/forgot-password">Forgot password</a>*/}
            {/*</div>*/}
            <Button loading={loading} htmlType={"submit"} className={styles.loginButton}>登録・ログイン</Button>
          </Form>
        </div>
      </Modal>
      <TipsModal open={openTipsModal} cancel={()=>{
        setOpenTipsModal(false)
      }}></TipsModal>
    </div>
  );
};

export default LoginForm;
