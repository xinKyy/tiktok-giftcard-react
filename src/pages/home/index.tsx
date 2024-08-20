import styles from "./index.module.scss"
import Card from "../../components/Card";

import backIcon from "../../assets/images/home/back-icon.svg"
import giftCard from "../../assets/images/home/gifcard.png"
import React, {useEffect, useRef, useState} from "react";
import SizeBox from "../../components/SizeBox";
import {APIAfterCheck, APIBooking, APIStatistics, APIStatisticsItem} from "../../api";
import {useLogin} from "../../provider/loginContext";
import {Button, message, Table, Tag} from "antd";
import ReferralCodeModal from "../../components/ReferralCodeModal";
import TipsModal from "../../components/TipsModal";
import SuccessModal from "../../components/SuccessModal";

const Home = () =>{
  const [cardList, setCardList] = useState([
    {
      id:2500,
      price:2500,
      check:false,
      amount:1,
      value:5,
    },
    {
      id:5000,
      price:5000,
      check:false,
      amount:1,
      value:5,
    },
    {
      id:10000,
      price:10000,
      check:false,
      amount:1,
      value:5,
    },
  ]);

  const resetCardList = () =>{
    cardList.forEach(item=>{
      item.check = false;
      item.amount = 1;
    })
    setCardList(cardList.slice())
  }

  const [ openReferralCodeModal, setOpenReferralCodeModal]= useState(false);
  const [ isAdmin, setIsAdmin]= useState(false);

  const [confirmList, setConfirmList] = useState([
    {
      id:2500,
      num:1
    },
  ])

  const { userInfo, setOpenLoginModal} = useLogin()
  const [loading, setLoading] = useState(false);

  const {inConfirm, setInConfirm} = useLogin();
  const codeRef = useRef<string | null>(null);

  const onCheck = (id:number) =>{
    const cardIndex = cardList.findIndex(item=>id === item.id)
    if(cardIndex !== -1){
      if(cardList[cardIndex].value && cardList[cardIndex].value >= 1){
        cardList[cardIndex].check = !cardList[cardIndex].check
      } else {
        message.info(`本日の${cardList[cardIndex].id}枚のギフトカード予約が終了しました。別のギフトカードを予約してください。`)
      }
    }
    setCardList(cardList.slice());
  }

  const setAmountById = (id:number, amount:number) =>{
    const cardIndex = cardList.findIndex(item=>id === item.id)
    if(cardIndex !== -1){
      cardList[cardIndex].amount = amount
    }
    setCardList(cardList.slice());
  }

  const submit = (bookingItemList:{
    id:number,
    num:number
  }[]) =>{
    if(!userInfo){
      setOpenLoginModal(true)
      return;
    }
    if(bookingItemList.length <= 0){
      return message.info("予約したいギフトカードを選択してください！")
    }

    let code = localStorage.getItem("referralCode")

    if(!code || code === "null") {
      setOpenReferralCodeModal(true)
      return;
    }

    codeRef.current = code

    if(code === "SKIP"){
      codeRef.current = null
    }

    toConfirm(bookingItemList)
  }

  const toConfirm = (bookingItemList:{
    id:number,
    num:number
  }[]) =>{
    setConfirmList(bookingItemList)
    setInConfirm("confirm")
  }

  const getAfterCheck = () =>{
    APIAfterCheck().then(resp=>{
      if(resp.data.success && resp.data.success){
        const list = resp.data.success;
        cardList.forEach(item=>{
          item.value = list[item.id]
        })
        setCardList(cardList.slice());
      }
    });
  }

  useEffect(()=>{
    getAfterCheck();
  }, [inConfirm])

  const submitBook = () =>{
    const bookList = cardList.filter(item=>item.check).map(item=>{
      return {
        id:item.id,
        num:item.amount
      }
    })
    submit(bookList)
  }

  const renderPage = () =>{
    if(inConfirm === "home") return  <div className={styles.container}>
      <div className={styles.cardList}>
        {
          cardList.map(item=>{
            return <Card value={item.value} submit={submit} id={item.id} amount={item.amount} setAmount={setAmountById} onCheck={onCheck} price={item.price} imgSrc={giftCard} check={item.check}/>
          })
        }
      </div>
      <div style={{
        display:"flex",
        alignItems:"center"
      }}>
        <Button onClick={submitBook} loading={loading} className={styles.bookAllButton}>カートに追加</Button>
        {
          // userInfo?.role === "admin" &&
          // <Button onClick={()=>{
          //   setInConfirm("table")
          // }} className={styles.bookAllButton} type={"primary"} style={{
          //   marginBottom:"10px",
          //   marginLeft:"auto"
          // }}>Admin</Button>
        }
      </div>
    </div>
    if(inConfirm === "confirm") return <ConfirmOrder onSuccess={()=>{
      resetCardList()
      setInConfirm("home")
    }} code={codeRef.current} cancel={()=>{
      setInConfirm("home")
    }} bookList={confirmList}></ConfirmOrder>

    if(inConfirm === "table") return <TablePageAll cancel={()=>{
      setInConfirm("home")
    }}></TablePageAll>
  }

  return <div className={`animated fadeIn animate__fadeInUp ${styles.app}`}>
    {
      renderPage()
    }
    <ReferralCodeModal openReferralCodeModal={openReferralCodeModal} setOpenReferralCodeModal={setOpenReferralCodeModal} callback={submitBook}></ReferralCodeModal>
  </div>
}

const ConfirmOrder = ({cancel, bookList, code, onSuccess}:{
  cancel:()=>void,
  bookList:{
    id:number,
    num:number,
  }[],
  code:string | null | undefined,
  onSuccess:()=>void
}) =>{
  const [time, setTime] = useState(new Date().toLocaleString())
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const confirm = () =>{
    setLoading(true)
    APIBooking({
      bookingItemList: bookList,
      referralCode:code
    }).then((resp:any)=>{
      setLoading(false)
      if(resp.code === "1" && resp.data){
        setLoading(false)
        setOpenSuccess(true)
        return ;
      }
      return message.error("Appointment failed, please try again")
    }).finally(()=>{
      setLoading(false)
    }).catch(e=>{
      return message.error("Appointment failed, please try again")
    })
  }

  return  <div className={styles.confirmPage}>
    <div onClick={cancel} className={styles.back}>
      <img src={backIcon}></img> 戻る
    </div>

    <div className={styles.section_title}>確認してください</div>

    <div className={styles.confirmationBox}>
      <div className={styles.image}>
        <img src={giftCard} alt="Item" />
      </div>
      <div className={styles.details}>
        <div>
          {
            bookList.map(item=>{
              return <div className={styles.item}>
                <div>
                  <span className={styles.label}>タイプ:</span>
                  <span className={styles.value}>{item.id}</span>
                </div>
                <div>
                  <span className={styles.label}>数量:</span>
                  <span className={styles.value}>{item.num}</span>
                </div>
              </div>
            })
          }
        </div>
        <div>
          <div className={styles.item}>
            <span className={styles.label}>時間:</span>
            <span style={{color:"#fff"}} className={styles.value}>{time}</span>
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


    <SuccessModal open={openSuccess} cancelHome={onSuccess} cancel={()=>setOpenSuccess(false)}></SuccessModal>
  </div>
}



const columns = [
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '礼品卡种类及数量',
    dataIndex: 'type',
    key: 'type',
    render:(_:string, r:DataItem)=>{
      return  <Tag color={getColor(r.id)}>{_}</Tag>
    }
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '邀请码',
    dataIndex: 'referralCode',
    key: 'referralCode',
  },
];

const colorMap = {
  "2500":"success",
  "5000":"warning",
  "10000":"red",
}

const getColor = (key:string): "success" | "warning" | "red" =>{
  // @ts-ignore
  return colorMap[key]
}


const AllColumns = (toDetails:(user:string)=>void)=>{
  return [
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '礼品卡种类及数量',
      dataIndex: 'statistics',
      key: 'statistics',
      render:(_:StatisticsItem[], r:any)=>{
        return <div>
          {
            _.map(item=>{
              return <Tag color={getColor(item.key)}>{item.key}x{item.value}</Tag>
            })
          }
        </div>
      }
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      dataIndex: 'userId',
      key: 'userId',
      render:(_:string, re:any)=>{
        return <div style={{
          color:"var(--primary-color)",
          cursor:"pointer"
        }} onClick={()=>toDetails(_)}>查看详情</div>
      }
    },
  ]
};


class DataItem{
  email:string = ""
  type:string=""
  time:string = ""
  referralCode:string = ""
  id:string = ""
}

class AllDataItem{
  email:string = ""
  statistics:StatisticsItem[] = []
  time:string = ""
  userId:string = ""
}

class StatisticsItem{
  key:string = ""
  value:string = ""
}

const TablePageAll = ({cancel}:{
  cancel:()=>void
}) =>{
  const [dataSource, setDataSource] = useState<AllDataItem[]>([]);
  const [total, setTotal] = useState(0)
  const [details, setDetails] = useState(false)
  const userIdRef = useRef<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getData = () =>{
    setLoading(true)
    APIStatistics().then(resp=>{
      if(resp.data.data){
        const list = resp.data.data;
        const tmp = list.map((item:any)=>{
          const result = Object.entries(item.statistics).map(([key, value]) => {
            return {
              key:key,
              value:value
            } as StatisticsItem
          });
          return {
            email:item.email,
            statistics:result,
            time:item.time,
            userId:item.userId
          } as AllDataItem
        })
        setDataSource(tmp)
        setTotal(resp.data.data.total)
      }
    }).finally(()=>{
      setLoading(false)
    })
  }

  useEffect(()=>{
    getData()
  }, [])

  const toDetails = (user:string) =>{
    userIdRef.current = user
    setDetails(true)
  }

  return <>
    {
      !details ? <div className={styles.confirmPage}>
        <div onClick={cancel} className={styles.back}>
          <img src={backIcon}></img> 戻る
        </div>
        <div className={styles.section_title}>预约名单</div>
        <Table loading={loading} dataSource={dataSource} columns={AllColumns(toDetails)} />
      </div> : <TablePage cancel={()=>{setDetails(false)}} userId={userIdRef.current}></TablePage>
    }
  </>;
}

const TablePage = ({cancel, userId}:{
  cancel:()=>void,
  userId:string | null
}) =>{
  const [dataSource, setDataSource] = useState<DataItem[]>([]);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const getData = (pageNum:number) =>{
    if(userId === null) return;
    setLoading(true)
    APIStatisticsItem({
      pageNum:pageNum,
      pageSize:10,
      userId:userId
    }).then(resp=>{
      if(resp.data.data.records && resp.data.data.records.length >= 1){
        const list = resp.data.data.records;
        const tmp = list.map((item:any)=>{
          return {
            email:item.email,
            type:`${item.skuId} x ${item.num}`,
            id:item.skuId,
            time:item.time,
            referralCode:item.referralCode
          } as DataItem
        })
        setDataSource(tmp)
        setTotal(resp.data.data.total)
      }
    }).finally(()=>{
      setLoading(false)
    })
  }

  useEffect(()=>{
    getData(1)
  }, [])

  return <div className={styles.confirmPage}>
    <div onClick={cancel} className={styles.back}>
      <img src={backIcon}></img> 戻る
    </div>

    <Table loading={loading} pagination={{
      total:total,
      pageSize:10,
      onChange:(pageNum, pageSize)=>{
        getData(pageNum)
      }
    }} dataSource={dataSource} columns={columns} />
  </div>;
}

export default Home
