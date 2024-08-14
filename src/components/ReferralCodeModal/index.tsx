import {Button, Input, message, Modal} from "antd";
import styles from './index.module.scss'
import {useLogin} from "../../provider/loginContext";
import SizeBox from "../SizeBox";
import {useEffect, useState} from "react";
import {APICheckVerificationCode} from "../../api";


const ReferralCodeModal = ({callback, openReferralCodeModal, setOpenReferralCodeModal}:{
  callback:()=>void
  openReferralCodeModal:boolean
  setOpenReferralCodeModal:React.Dispatch<React.SetStateAction<boolean>>
}) =>{
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useLogin()

  const submit = () =>{
    if(!code) return message.info("The referral code cannot be empty")
    setLoading(true)
    APICheckVerificationCode({
      referralCode:code
    }).then(resp=>{
      setLoading(false)
      if(resp.data.data === "1"){
        localStorage.setItem("referralCode", code)
        setUserInfo({
          email:userInfo?.email!,
          referralCode:code
        })
        callback()
        setOpenReferralCodeModal(false)
        return;
      }
      return message.error("Referral code error, please check and try again")
    }).catch(()=>{
      return message.error("An abnormal situation has occurred, please try again")
    }).finally(()=>{
      setLoading(false)
    })
  }

  const skip = () =>{
    localStorage.setItem("referralCode", "SKIP")
    callback()
    setOpenReferralCodeModal(false)
  }

  return <Modal title={null} footer={null} open={openReferralCodeModal} onCancel={()=>{
    setOpenReferralCodeModal(false)
    setCode("")
  }}>
    <div className={styles.referralCodeForm}>
      <label htmlFor="referralCode" className={styles.label}>Please enter your referral code:</label>
      <Input value={code} onChange={(e)=>{
        setCode(e.target.value)
      }} type="text" id="referralCode" className={styles.input} placeholder="Please input referral code" />
      <div className={styles.button_wrap}>
        <Button onClick={skip} type={"default"} className={styles.skip_button}>Skip</Button>
        <SizeBox w={30}></SizeBox>
        <Button loading={loading} onClick={submit} className={styles.button}>Submit</Button>
      </div>
    </div>
  </Modal>
}

export default ReferralCodeModal;
