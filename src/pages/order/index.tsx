import React, {useEffect, useState} from "react";
import {Button, Input, message, Tooltip} from "antd";
import {APIBooking} from "../../api";
import styles from "../home/index.module.scss";
import backIcon from "../../assets/images/home/back-icon.svg";
import giftCard from "../../assets/images/home/gifcard.png";
import Header from "../../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import {
    createPayment,
    getOrderDetail,
    getPaymentList,
    OrderDetailResponse,
    OrderItem,
    PaymentMethod
} from "../../api/newApi";
import AppLayout from "../../components/Layout";

const ConfirmOrder = () =>{
  const { id } = useParams()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<OrderItem[]>([])
  const [orderDetails, setOrderDetails] = useState<OrderDetailResponse>()
  const [paymentList, setPaymentList] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
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
        getPaymentMethods();
    }, []);

  const confirm = async () =>{
      if (loading) return
      if (!selectedPaymentMethod) return message.info("お支払い方法を選択してください");
      setLoading(true);
      const res = await createPayment({orderId: orderDetails?.order.id!, paymentMethodId: selectedPaymentMethod!})
      if (res.code === 200){
          navigate(`/pay/${res.data}`)
      }
      setLoading(false);
  }

  const getPaymentMethods = async () => {
      const res = await getPaymentList();
      if (res.code === 200){
          if (res.data.length > 0) {
              setSelectedPaymentMethod(res.data[0].id);
              setPaymentList(res.data)
          }
      }
  }


  return  <AppLayout>
    <div className={styles.confirmPage}>
      <div onClick={cancel} className={styles.back}>
        <img src={backIcon}></img> 戻る
      </div>

      <div className={"order_confirm"}>
          <div>
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
                      </div>
                  </div>
              </div>
          </div>
          <div>
              <div className={styles.section_title}>お支払い方法をお選びください：</div>
              <div className={"pay_wrap"}>
                  {
                      paymentList.map((item) => {
                          return <div onClick={()=>setSelectedPaymentMethod(item.id)} key={item.id} className={`pay-item ${ selectedPaymentMethod === item.id ? "checked" : ""}`}>
                              <img src={item.paymentIcon} alt={item.paymentName} />
                              <div>{item.paymentName}</div>
                          </div>
                      })
                  }
              </div>
          </div>
      </div>
        <div className={"flex justify-center"} style={{
            marginTop:"50px"
        }}>
            <Button style={{
                width:"200px"
            }} loading={loading} onClick={confirm} className={"confirmButton"}>確認</Button>
        </div>
    </div>
      </AppLayout>
}

export default ConfirmOrder
