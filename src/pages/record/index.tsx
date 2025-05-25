import React, {useEffect, useState} from "react";
import styles from "./index.module.scss";
import tiktokLogo from "../../assets/images/records/tikrecords.png"; // 你可以换成自己的logo
import { Tabs } from "antd";
import Header from "../../components/Header";
import {getOrderList, OrderItem, OrderRecord} from "../../api/newApi";

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

export default function RecordPage() {
  const [tab, setTab] = useState("mine");
  const [orderList, setOrderList] = useState<{
      order: OrderRecord;
      items: OrderItem[];
  }[]>([]);


  const getRecords = async () =>{
      const res = await getOrderList({
          status: 0,
          paymentMethod: "",
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          page: 1,
          pageSize: 10
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
                <div className={styles.sidebar}>
                    <button className={styles.menuBtn}>購入記録</button>
                </div>
                <div className={styles.content}>
                    <div className={styles.back}>&lt; かえる</div>
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
                      <div className={styles.cardList}>
                          {orderList.map((order) => (
                            <div className={styles.card} key={order.order.id}>
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
                                              <div key={item.id}>
                                                  {item.price} × {item.quantity}
                                              </div>
                                            ))}
                                        </div>
                                        <div>{order.order.paymentMethod ?? "--"}</div>
                                        <div>{order.order.createTime}</div>
                                        <div>
                                            <StatusTag status={(order.order.status as any)}></StatusTag>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          ))}
                      </div>
                    )}
                    {tab === "other" && (
                      <div className={styles.empty}>暂无数据</div>
                    )}
                </div>
            </div>
        </div>
    </>
  );
}

// 状态映射
const STATUS_MAP = {
    0: { text: '待支付', bgColor: '#333', color: '#ffb300' },
    1: { text: '已支付', bgColor: '#233323', color: '#4fff4f' },
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
            borderRadius: '8px',
            padding: '4px 16px',
            fontSize: '16px',
            display: 'inline-block',
            fontWeight: 'bold',
            letterSpacing: '2px',
        }}
      >
      {text}
    </span>
    );
};
