import React, {useEffect, useState} from "react";
import {Button, Input, message, Tooltip} from "antd";
import {APIBooking} from "../../api";
import styles from "../home/index.module.scss";
import backIcon from "../../assets/images/home/back-icon.svg";
import giftCard from "../../assets/images/home/gifcard.png";
import Header from "../../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import {createPayment, getOrderDetail, OrderDetailResponse, OrderItem} from "../../api/newApi";

const ConfirmOrder = () =>{
  const { id } = useParams()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<OrderItem[]>([])
  const [orderDetails, setOrderDetails] = useState<OrderDetailResponse>()
  const cancel = () => {
    navigate(-1);
  }

  const getDetail = async () =>{
      if (!id) {
          return
      }
      const res = await getOrderDetail(id)
      if (res.code === 200){
          setCardList(res.data.items)
          setOrderDetails(res.data)
      }
      console.log(res, "getOrderDetail")
  }

    useEffect(() => {
        getDetail()
    }, []);

  const confirm = async () =>{
      if (loading) return
      setLoading(true);
      const res = await createPayment({orderId: orderDetails?.order.id!, paymentMethodId: 6002})
      if (res.code === 200){
          navigate(`/pay/${res.data}`)
      }
      setLoading(false);
  }

  return  <>
    <Header></Header>
    <div style={{
      maxWidth: "1200px",
      margin:"100px auto",
    }} className={styles.confirmPage}>
      <div onClick={cancel} className={styles.back}>
        <img src={backIcon}></img> 戻る
      </div>

      <div className={styles.section_title}>購入情報をご確認ください</div>

      <div className={styles.confirmationBox}>
        <div className={styles.image}>
          <img src={giftCard} alt="Item" />
        </div>
        <div className={styles.details}>
          <div>
              {
                  cardList.map(item =>{
                     return <div className={styles.item}>
                          <div>
                              <span className={styles.label}>タイプ:</span>
                              <span className={styles.value}>{item.price}</span>
                          </div>
                          <div>
                              <span className={styles.label}>数量:</span>
                              <span className={styles.value}>{item.quantity}</span>
                          </div>
                      </div>
                  })
              }
          </div>
          <div>
            <div className={styles.item}>
              <span className={styles.label}>時間:</span>
              <span style={{color:"#fff"}} className={styles.value}>{orderDetails?.order?.createTime ?? "--"}</span>
            </div>
            <div className={styles.buttons}>
              <button onClick={cancel} className={styles.cancelButton}>編集</button>
              <Button loading={loading} onClick={confirm} className={styles.confirmButton}>確認</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttons_mobile}>
        <button onClick={cancel} className={styles.cancelButton}>編集</button>
        <Button loading={loading} onClick={confirm} className={styles.confirmButton}>確認</Button>
      </div>
    </div>
  </>
}

export default ConfirmOrder
