// src/components/LoginForm/LoginForm.tsx
import React, {useRef, useState} from 'react';
import styles from './index.module.scss';
import {Button, Form, Input, message, Modal} from "antd";
import {useLogin} from "../../provider/loginContext";
import {APIGetCode, APILogin} from "../../api";
import TipsModal from "../TipsModal";

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
    APILogin({
      email: v.email,
      verifyCode: v.verifyCode,
      password:"111111"
    }).then(resp =>{
      console.log(resp, "loginResp")
      if(resp.data.data){
        if(resp.data.data.user){
          const user = resp.data.data.user
          localStorage.setItem("token", user.token)
          localStorage.setItem("id", user.id)
          localStorage.setItem("referralCode", resp.data.data.fullReferralCode)
          const user1 = {
            email: v.email,
            role:resp.data.data.role,
            referralCode: resp.data.data.fullReferralCode
          }
          localStorage.setItem("userInfo", JSON.stringify(user1))
          setUserInfo(user1)
          setOpenLoginModal(false);
          message.success("ログイン成功")
          form.resetFields();

          const localLogin = localStorage.getItem("localLogin")

          if(resp.data.data.newUser === "1" || localLogin !== "1"){
            setOpenTipsModal(true)
            localStorage.setItem("localLogin", "1")
          }
        }
      } else{
        message.error("ログインエラー")
      }
    }).finally(()=>{
      setLoading(false);
    }).catch(e=>{
      message.error("ログインエラー")
    })
  }

  const getCode = () =>{
    const v = form.getFieldsValue();
    setSendCodeLoading(true)
    APIGetCode({
      email:v.email
    }).then(resp=>{
      if(resp.data.data){
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
          <p>予約情報を送信するためにいくつかの情報が必要です</p>
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
                  message: "The input is not a valid email address!",
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
            <Button loading={loading} htmlType={"submit"} className={styles.loginButton}>ログイン</Button>
          </Form>
          {/*<div className={styles.signupLink}>*/}
          {/*  <p>Already have an account? <a onClick={()=>setIsRegis(!isRegis)}>{*/}
          {/*    isRegis ? "Sign up" : "Log in"*/}
          {/*  }</a></p>*/}
          {/*</div>*/}
        </div>
      </Modal>
      <TipsModal open={openTipsModal} cancel={()=>{
        setOpenTipsModal(false)
      }}></TipsModal>
    </div>
  );
};

export default LoginForm;
