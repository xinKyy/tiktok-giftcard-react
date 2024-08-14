import styles from "./index.module.scss"
import Card from "../../components/Card";

import backIcon from "../../assets/images/home/back-icon.svg"
import giftCard from "../../assets/images/home/gifcard.png"
import React, {useEffect, useRef, useState} from "react";
import SizeBox from "../../components/SizeBox";
import {APIAfterCheck, APIBooking, APIStatistics, APIStatisticsItem} from "../../api";
import {useLogin} from "../../provider/loginContext";
import {Button, message, Table} from "antd";
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

  const [inConfirm, setInConfirm] = useState<"home" | "confirm" | "table">("home");
  const codeRef = useRef<string | null>(null);

  const onCheck = (id:number) =>{
    const cardIndex = cardList.findIndex(item=>id === item.id)
    if(cardIndex !== -1){
      cardList[cardIndex].check = !cardList[cardIndex].check
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
      return message.info("Please select the Gift Card you want to book!")
    }

    let code = localStorage.getItem("referralCode")

    if(!code || code === "null") {
      setOpenReferralCodeModal(true)
      return;
    }

    codeRef.current = code

    if(code === "SKIP"){
      code = null
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
        <Button onClick={submitBook} loading={loading} className={styles.bookAllButton}>One click appointment</Button>
        {
          userInfo?.role === "admin" &&
          <Button onClick={()=>{
            setInConfirm("table")
          }} className={styles.bookAllButton} type={"primary"} style={{
            marginBottom:"10px",
            marginLeft:"auto"
          }}>Admin</Button>
        }
      </div>
    </div>
    if(inConfirm === "confirm") return <ConfirmOrder code={codeRef.current} cancel={()=>{
      setInConfirm("home")
    }} bookList={confirmList}></ConfirmOrder>

    if(inConfirm === "table") return <TablePage cancel={()=>{
      setInConfirm("home")
    }}></TablePage>
  }

  return <div className={styles.app}>
    {
      renderPage()
    }
    <ReferralCodeModal openReferralCodeModal={openReferralCodeModal} setOpenReferralCodeModal={setOpenReferralCodeModal} callback={submitBook}></ReferralCodeModal>
  </div>
}

const ConfirmOrder = ({cancel, bookList, code}:{
  cancel:()=>void,
  bookList:{
    id:number,
    num:number,
  }[],
  code:string | null | undefined
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
      if(resp.data){
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
      <img src={backIcon}></img> Back
    </div>

    <div className={styles.section_title}>Please Confirm:</div>

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
                  <span className={styles.label}>Type:</span>
                  <span className={styles.value}>{item.id}</span>
                </div>
                <div>
                  <span className={styles.label}>Quantities:</span>
                  <span className={styles.value}>{item.num}</span>
                </div>
              </div>
            })
          }
        </div>
        <div>
          <div className={styles.item}>
            <span className={styles.label}>Time:</span>
            <span style={{color:"#000"}} className={styles.value}>{time}</span>
          </div>
          <div className={styles.buttons}>
            <button onClick={cancel} className={styles.cancelButton}>Cancel</button>
            <Button loading={loading} onClick={confirm} className={styles.confirmButton}>Confirm</Button>
          </div>
        </div>
      </div>
    </div>

    <SuccessModal open={openSuccess} cancelHome={cancel} cancel={()=>setOpenSuccess(false)}></SuccessModal>
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


class DataItem{
  email:string = ""
  type:string=""
  time:string = ""
  referralCode:string = ""
}

const TablePageAll = ({cancel}:{
  cancel:()=>void
}) =>{
  const [dataSource, setDataSource] = useState<DataItem[]>([]);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const getData = (pageNum:number) =>{
    setLoading(true)
    APIStatistics().then(resp=>{
      if(resp.data.data.records && resp.data.data.records.length >= 1){
        const list = resp.data.data.records;
        const tmp = list.map((item:any)=>{
          return {
            email:item.email,
            type:`${item.skuId} x ${item.num}`,
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
      <img src={backIcon}></img> Back
    </div>
    <div className={styles.section_title}>预约名单</div>
    <Table loading={loading} pagination={{
      total:total,
      pageSize:10,
      onChange:(pageNum, pageSize)=>{
        getData(pageNum)
      }
    }} dataSource={dataSource} columns={columns} />
  </div>;
}

const TablePage = ({cancel}:{
  cancel:()=>void
}) =>{
  const [dataSource, setDataSource] = useState<DataItem[]>([]);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const getData = (pageNum:number) =>{
    setLoading(true)
    APIStatisticsItem({
      pageSize:10,
      pageNum:pageNum
    }).then(resp=>{
      if(resp.data.data.records && resp.data.data.records.length >= 1){
        const list = resp.data.data.records;
        const tmp = list.map((item:any)=>{
          return {
            email:item.email,
            type:`${item.skuId} x ${item.num}`,
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
      <img src={backIcon}></img> Back
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
