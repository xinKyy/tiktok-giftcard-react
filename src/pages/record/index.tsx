import React, {useEffect, useMemo, useState} from "react";
import styles from "./index.module.scss";
import tiktokLogo from "../../assets/images/records/tikrecords.png"; // 你可以换成自己的logo
import { Tabs } from "antd";
import Header from "../../components/Header";
import {getOrderList, OrderItem, OrderRecord} from "../../api/newApi";
import {useNavigate} from "react-router-dom";
import backIcon from "../../assets/images/home/back-icon.svg";
import emptyIcon from "../../assets/images/records/empty-icon.png";

const { TabPane } = Tabs;

const orderList = [
  {
    id: 1,
    items: [
      { type: 2500, count: 3 },
      { type: 5000, count: 3 },
      { type: 10000, count: 3 },
    ],
    pay: "xxxxxxxxx",
    time: "2025/5/8 15:34:07",
  },
  {
    id: 2,
    items: [
      { type: 2500, count: 3 },
      { type: 5000, count: 3 },
      { type: 10000, count: 3 },
    ],
    pay: "xxxxxxxxx",
    time: "2025/5/8 15:34:07",
  },
];

interface IV1OrderRecordObj{
    order: OrderRecord;
    items: OrderItem[];
}

export default function RecordPage() {
  const [tab, setTab] = useState("mine");
  const navigate = useNavigate()
  const [orderList, setOrderList] = useState<IV1OrderRecordObj[]>([]);


  const orders = useMemo(()=>{
      const tab1Orders = orderList.filter(item => [0, 1, 4].includes(item.order.status));
      const tab2Orders = orderList.filter(item => ![0, 1, 4].includes(item.order.status));
      return {
            tab1Orders,
            tab2Orders
      }
  }, [orderList])


  const getRecords = async () =>{
      const res = await getOrderList({
          paymentMethod: "",
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          page: 1,
          pageSize: 1000
      })
      if (res.code === 200){
          const orders = res.data.records.map(item=>{
              return {
                  order: item,
                  items: res.data.orderItems[item.id]
              }
          })
          setOrderList(orders)
      }
  }

    useEffect(() => {
        getRecords()
    }, []);

  return (
    <>
        <Header></Header>
        <div className={styles.bg}>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div onClick={()=>navigate(-1)} className={styles.back}>
                        <img src={backIcon}></img> 戻る
                    </div>
                    <div className={styles.title}>購入記録</div>
                    <div className={styles.tabs}>
                        <div
                          className={`${styles.tab} ${tab === "mine" ? styles.active : ""}`}
                          onClick={() => setTab("mine")}
                        >
                            私の購入品
                        </div>
                        <div
                          className={`${styles.tab} ${tab === "other" ? styles.active : ""}`}
                          onClick={() => setTab("other")}
                        >
                            例外注文
                        </div>
                    </div>
                    {tab === "mine" && (
                      <>
                          {
                              orders.tab1Orders.length > 0 ?   <div className={styles.cardList}>
                                  {orders.tab1Orders.map((order) => (
                                    <OrderRecordsItem order={order} key={order.order.orderNo}></OrderRecordsItem>
                                  ))}
                              </div> : <div style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }}>
                                  <EmptyIcon></EmptyIcon>
                              </div>
                          }
                      </>
                    )}
                    {tab === "other" && (
                      <>
                          {
                              orders.tab2Orders.length > 0 ?   <div className={styles.cardList}>
                                  {orders.tab2Orders.map((order) => (
                                    <OrderRecordsItem order={order} key={order.order.orderNo}></OrderRecordsItem>
                                  ))}
                              </div> : <div style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }}>
                                  <EmptyIcon></EmptyIcon>
                              </div>
                          }
                      </>
                    )}
                </div>
            </div>
        </div>
    </>
  );
}


const OrderRecordsItem = ({order}:{
    order:IV1OrderRecordObj
}) =>{
    const navigate = useNavigate()
    return <div onClick={()=>{
        if (order.order.status === 0){
            if (order.order.token){
                navigate(`/pay/${order.order.token}`)
            } else{
                navigate(`/order/${order.order.id}`)
            }
        }
    }} className={styles.card} key={order.order.id}>
        <div className={styles.cardLeft}>
            <img src={tiktokLogo} alt="tiktok" />
        </div>
        <div className={styles.cardRight}>
            <div className={styles.row}>
                <span>種類</span>
                <span>支払方法</span>
                <span>時間</span>
                <span>状況</span>
            </div>
            <div className={styles.row}>
                <div>
                    {order.items.map((item) => (
                      <div key={item.id} className={"font-bold"}>
                          {item.price} × {item.quantity}
                      </div>
                    ))}
                </div>
                <div className={"font-bold"}>{order.order.paymentMethod ?? "--"}</div>
                <div>{order.order.createTime}</div>
                <div>
                    <StatusTag status={(order.order.status as any)}></StatusTag>
                </div>
            </div>
        </div>
    </div>
}

// 状态映射
const STATUS_MAP = {
    0: { text: '待支付', bgColor: '#333', color: '#ffb300' },
    1: { text: '已支付', bgColor: '#23BC3F1A', color: '#69FF4C' },
    2: { text: '支付失败', bgColor: '#331a1a', color: '#fe2c55' },
    3: { text: '已取消', bgColor: '#444', color: '#bbb' },
    4: { text: '审核中', bgColor: '#1a2a44', color: '#4faaff' },
    5: { text: '已拒绝', bgColor: '#442222', color: '#fe2c55' },
    6: { text: '已获取卡密', bgColor: '#223344', color: '#4faaff' },
    7: { text: '已关闭', bgColor: '#222', color: '#888' },
};

const StatusTag = ({ status }:{
    status: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
}) => {
    const { text, bgColor, color } = STATUS_MAP[status] || {
        text: '未知',
        bgColor: '#222',
        color: '#fff',
    };

    return (
      <span
        style={{
            background: bgColor,
            color,
            borderRadius: '4px',
            padding: '4px 16px',
            fontSize: '10px',
            display: 'inline-block',
            fontWeight: 'bold',
            letterSpacing: '2px',
        }}
      >
      {text}
    </span>
    );
};


export const EmptyIcon = () =>{
    return <div>
        <img src={emptyIcon} className={"empty_icon"} />
    </div>
}
