import {Button, Input, message, Modal} from "antd";
import styles from './index.module.scss'
import {useLogin} from "../../provider/loginContext";
import SizeBox from "../SizeBox";
import {useEffect, useState} from "react";
import {APIBindReferCode, APICheckVerificationCode} from "../../api";


const ReferralCodeModal = ({callback, openReferralCodeModal, setOpenReferralCodeModal}:{
  callback:()=>void
  openReferralCodeModal:boolean
  setOpenReferralCodeModal:React.Dispatch<React.SetStateAction<boolean>>
}) =>{
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo, getUserInfo} = useLogin()

  const submit = () =>{
    if(!code) return message.info("The referral code cannot be empty")
    setLoading(true)
    APIBindReferCode({
      code:code
    }).then(resp=>{
      setLoading(false)
      if(resp.data.data){
        localStorage.setItem("referralCode", code)
        setUserInfo({
          email:userInfo?.email!
        })
        callback()
        setOpenReferralCodeModal(false)
        getUserInfo();
        return;
      }
      return message.error("コードが間違っていないか、再確認してください")
    }).catch(()=>{
      return message.error("異常が発生しました。再試行してください")
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
      <label htmlFor="referralCode" className={styles.label}>紹介コードを入力してください:</label>
      <Input value={code} onChange={(e)=>{
        setCode(e.target.value)
      }} type="text" id="referralCode" className={styles.input} placeholder="紹介コードを入力" />
      <div className={styles.button_wrap}>
        {/*<Button onClick={skip} type={"default"} className={styles.skip_button}>スキップ</Button>*/}
        {/*<SizeBox w={30}></SizeBox>*/}
        <Button loading={loading} onClick={submit} className={styles.button}>送信</Button>
      </div>
    </div>
  </Modal>
}

export default ReferralCodeModal;
