import styles from "./index.module.scss"
import Card from "../../components/Card";

import backIcon from "../../assets/images/home/back-icon.svg"
import giftCard from "../../assets/images/home/gifcard.png"
import downloadIcon from "../../assets/images/home/downloadIcon.svg"
import React, {useEffect, useRef, useState} from "react";
import SizeBox from "../../components/SizeBox";
import {
    APIAfterCheck,
    APIBooking,
    APIDetailBySku,
    APIStaticsDetail,
    APIStaticsDetailByUid,
    APIStatistics,
    APIStatisticsItem
} from "../../api";
import {useLogin} from "../../provider/loginContext";
import {Button, DatePicker, message, Table, Tag} from "antd";
import ReferralCodeModal from "../../components/ReferralCodeModal";
import SuccessModal from "../../components/SuccessModal";
import AppLayout from "../../components/Layout";
import {useNavigate} from "react-router-dom";
import UserSubDetailModal from "./componments/UserSubDetailModal";
import axiosInstance, {baseHost} from "../../http/axiosInstance";

const Home = () =>{
  const [cardList, setCardList] = useState([
    {
      id:2500,
      price:2500,
      check:false,
      amount:0,
      value:5,
    },
    {
      id:5000,
      price:5000,
      check:false,
      amount:0,
      value:5,
    },
    {
      id:10000,
      price:10000,
      check:false,
      amount:0,
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
    const bookList = cardList.filter(item=>item.amount >= 1).map(item=>{
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
  }

    return  <AppLayout>
        <div className={`animated fadeIn animate__fadeInUp ${styles.app}`}>
            {
                renderPage()
            }
            <ReferralCodeModal openReferralCodeModal={openReferralCodeModal} setOpenReferralCodeModal={setOpenReferralCodeModal} callback={submitBook}></ReferralCodeModal>
        </div>
    </AppLayout>
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



const getSubColumn = (getDetailModal:(userId:string)=>void ) =>{
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
                return <div onClick={()=>getDetailModal(r.userId)}>
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
    ];
}

const colorMap = {
  "2500":"success",
  "5000":"warning",
  "10000":"red",
}

const getColor = (key:string): "success" | "warning" | "red" =>{
  // @ts-ignore
  return colorMap[key]
}


const AllColumns = (toDetails:(code:string)=>void, openDetails:(userId:string)=>void)=>{
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
        return <div onClick={()=>openDetails(r.userId)}>
          {
            _.map(item=>{
              return <Tag color={getColor(item.key)}>{item.key}x{item.value}</Tag>
            })
          }
        </div>
      }
    },
    {
      title: '邀请码',
      dataIndex: 'referCode',
      key: 'referCode',
    },
    {
      title: '邀请数量',
      dataIndex: 'referCount',
      key: 'referCode',
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

const NoActionColumns = [
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
        title: '邀请码',
        dataIndex: 'referCode',
        key: 'referCode',
    },
    {
        title: '邀请数量',
        dataIndex: 'referCount',
        key: 'referCode',
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
]


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
  referCode:string = ""
  referCount:number = 0
}

class StatisticsItem{
  key:string = ""
  value:string = ""
}

export const TablePageAll = () =>{
  const [dataSource, setDataSource] = useState<AllDataItem[]>([]);
  const [normalDataSource, setNormalDataSource] = useState<AllDataItem[]>([]);
  const [total, setTotal] = useState(0)
  const [details, setDetails] = useState(false)
  const [openDetailsModal, setOpenDetailsModal] = useState(false)
  const referCode = useRef<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [normalLoading, setNormalLoading] = useState(false)
  const navigate = useNavigate();
  const time1Ref = useRef<[string, string] | null>(null);
    const userIdRef = useRef<string>();
  const getData = (startTime?:string, endTime?:string) =>{
    setLoading(true)
      APIStaticsDetail({
          start:startTime,
          end:endTime
      }).then(resp=>{
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
            userId:item.userId,
              referCode:item.code,
              referCount:item.num
          } as AllDataItem
        })
        setDataSource(tmp)
        setTotal(resp.data.data.total)
      }
    }).finally(()=>{
      setLoading(false)
    })
  }

  const getNormalData = (startTime?:string, endTime?:string) =>{
      setNormalLoading(true)
      APIDetailBySku({}).then(resp=>{
            if(resp.data.data){
                const list = resp.data.data;
                const tmp = list.map((item:any)=>{
                    const bookingGroup = item.bookingGroup.split(", ");
                    return {
                        email:item.email,
                        statistics:[],
                        time:item.time,
                        userId:item.userId,
                        referCode:item.code,
                        referCount:item.num
                    } as AllDataItem
                })
                setNormalDataSource(tmp)
                setTotal(resp.data.data.total)
            }
        }).finally(()=>{
            setNormalLoading(false)
        })
    }

  useEffect(()=>{
    getData()
      // getNormalData()
  }, [])

  const toDetails = (code:string) =>{
      referCode.current = code
      setDetails(true)
  }

    const openDetails = (userId:string) =>{
        setOpenDetailsModal(true)
        userIdRef.current = userId
    }

  const downloadTop = () =>{
      const userId = localStorage.getItem("id");
      const a = document.createElement("a");
      if(time1Ref.current){
          a.href = `${baseHost}/api/v1/gcUserBooking/download?userId=${userId}&start=${time1Ref.current[0]}&end=${time1Ref.current[1]}`;
      } else {
          a.href = `${baseHost}/api/v1/gcUserBooking/download?userId=${userId}`;
      }
      a.click();
  }

  const downloadBottom = () =>{
      const userId = localStorage.getItem("id");
      const a = document.createElement("a");
      a.href = `${baseHost}/api/v1/gcUserBooking/download?userId=${userId}`;
      a.click();
  }

  return <AppLayout>
    {
      !details ? <div className={styles.confirmPage}>
        <div onClick={()=>navigate("/")} className={styles.back}>
          <img src={backIcon}></img> 戻る
        </div>
        <div className={styles.section_title}>预约名单</div>
        <div className={styles.end_wrap}>
            <DatePicker.RangePicker onChange={(dates:any)=>{
                if (dates) {
                    const startDate = dates[0].format('YYYY-MM-DD HH:mm:ss');
                    const endDate = dates[1].format('YYYY-MM-DD HH:mm:ss');
                    time1Ref.current = [startDate, endDate]
                    getData(startDate, endDate)
                } else {
                    time1Ref.current = null
                    console.log("No date selected");
                }
           }}></DatePicker.RangePicker>
            <img onClick={downloadTop} src={downloadIcon}/>
        </div>
        <SizeBox h={10}></SizeBox>
        <Table loading={loading} dataSource={dataSource} columns={AllColumns(toDetails, openDetails)} />
          <UserSubDetailModal userId={userIdRef.current!} open={openDetailsModal} setOpen={setOpenDetailsModal}></UserSubDetailModal>
        <SizeBox h={50}></SizeBox>
        {/*<div className={styles.end_wrap}>*/}
        {/*    <DatePicker.RangePicker onChange={(dates:any)=>{*/}
        {/*        if (dates) {*/}
        {/*            const startDate = dates[0].format('YYYY-MM-DD HH:mm:ss');*/}
        {/*            const endDate = dates[1].format('YYYY-MM-DD HH:mm:ss');*/}
        {/*            getData(startDate, endDate)*/}
        {/*        } else {*/}
        {/*            console.log("No date selected");*/}
        {/*        }*/}
        {/*    }}></DatePicker.RangePicker>*/}
        {/*    <img onClick={downloadBottom}  src={downloadIcon}/>*/}
        {/*</div>*/}
        {/*<SizeBox h={10}></SizeBox>*/}
        {/*<Table loading={loading} dataSource={normalDataSource} columns={NoActionColumns} />*/}
      </div> : <TablePage cancel={()=>{setDetails(false)}} code={referCode.current}></TablePage>
    }
  </AppLayout>;
}

const TablePage = ({cancel, code}:{
  cancel:()=>void,
  code:string | null
}) =>{
  const [dataSource, setDataSource] = useState<DataItem[]>([]);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const time1Ref = useRef<[string, string] | null>(null);
  const userId = useRef<string>();
  const getData = (startTime?:string, endTime?:string) =>{
    if(code === null) return;
    setLoading(true)
      APIStaticsDetailByUid({
          userId:code,
          start:startTime,
          end:endTime
      }).then(resp=>{
      if(resp.data.data && resp.data.data.length >= 1){
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
                  userId:item.userId,
                  referCode:item.code,
                  referCount:item.num
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

  const getDetailModal = (id:string) =>{
      userId.current = id
      setShowDetailModal(true)
  }

  const downloadTop = () =>{
        const a = document.createElement("a");
        if(time1Ref.current){
            a.href = `${baseHost}/api/v1/gcUserBooking/downloadByUid?userId=${code}`;
        } else {
            a.href = `${baseHost}/api/v1/gcUserBooking/downloadByUid?userId=${code}`;
        }
        a.click();
  }

  return <div className={styles.confirmPage}>
    <div onClick={cancel} className={styles.back}>
      <img src={backIcon}></img> 戻る
    </div>
      <div className={styles.end_wrap}>
          <DatePicker.RangePicker onChange={(dates:any)=>{
              if (dates) {
                  const startDate = dates[0].format('YYYY-MM-DD HH:mm:ss');
                  const endDate = dates[1].format('YYYY-MM-DD HH:mm:ss');
                  time1Ref.current = [startDate, endDate]
                  getData(startDate, endDate)
              } else {
                  time1Ref.current = null
                  console.log("No date selected");
              }
          }}></DatePicker.RangePicker>
          <img onClick={downloadTop} src={downloadIcon}/>
      </div>
      <SizeBox h={10}></SizeBox>
    <Table loading={loading} pagination={{
      total:total,
      pageSize:10,
      // onChange:(pageNum, pageSize)=>{
      //   getData(pageNum)
      // }
    }} dataSource={dataSource} columns={getSubColumn(getDetailModal)} />
      <UserSubDetailModal userId={userId.current!} open={showDetailModal} setOpen={setShowDetailModal}></UserSubDetailModal>
  </div>;
}

export default Home
