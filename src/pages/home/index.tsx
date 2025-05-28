import styles from "./index.module.scss"
import Card from "../../components/Card";
import locale from 'antd/locale/ja_JP'
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
import {OrderConfirmItem, useLogin} from "../../provider/loginContext";
import {Button, DatePicker, Input, message, Table, Tag, Tooltip, Carousel} from "antd";
import AppLayout from "../../components/Layout";
import {useNavigate} from "react-router-dom";
import UserSubDetailModal from "./componments/UserSubDetailModal";
import axiosInstance, {baseHost} from "../../http/axiosInstance";
import {createOrder, getGiftCardList, GiftCard} from "../../api/newApi";


export const toOrderConfirmMap = (items: OrderConfirmItem[]): Map<number, OrderConfirmItem> => {
    return items.reduce((map, item) => {
        map.set(item.giftCardId, item)
        return map
    }, new Map<number, OrderConfirmItem>())
}

const Home = () =>{
  const [cardList, setCardList] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setOpenLoginModal, orderConfirm, setOrderConfirm} = useLogin()

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
    setOrderConfirm(cardList.filter(item=>item.amount >= 1).map(item=>{
        return {
            giftCardId:item.id,
            quantity:item.amount,
            price: item.price
        }
    }))
  }

    const toOrder = async () =>{

      if (!userInfo){
          setOpenLoginModal(true)
          return
      }

      const bookList = cardList.filter(item=>item.amount >= 1).map(item=>{
        return {
            giftCardId:item.id,
            quantity:item.amount,
            price: item.price
        }
      })
     const queryJson = JSON.stringify(bookList)
        navigate(`/confirm/${encodeURIComponent(queryJson)}`)
    }

    const getCardList = async () =>{
      const localList = localStorage.getItem("giftCardList");
      if (localList){
          const local:GiftCard[] = JSON.parse(localList);
          setCardListFn(local)
      }
      const res = await getGiftCardList({page:1, size:100})
      setCardListFn(res.data)
      localStorage.setItem("giftCardList", JSON.stringify(res.data))
    }

    const setCardListFn = (v: GiftCard[]) =>{
        const map = toOrderConfirmMap(orderConfirm)
        v.forEach(item=>{
            if (map.has(item.id)){
                item.amount = map.get(item.id)?.quantity ?? 0
            }
        })
        setCardList(v)
    }

    useEffect(() => {
        getCardList()
    }, []);

    return  <AppLayout>
        <div className={`animated fadeIn animate__fadeInUp ${styles.app}`}>
          <div className={styles.container}>
            <div className={styles.cardList}>
              {
                cardList?.map(item=>{
                  return <Card value={item.value} submit={toOrder} id={item.id} amount={item.amount} setAmount={setAmountById} onCheck={onCheck} price={item.price} imgSrc={giftCard} check={item.check}/>
                })
              }
            </div>
            <div style={{
              display:"flex",
              alignItems:"center",
                marginBottom:"50px"
            }}>
              <Button onClick={toOrder} loading={loading} className={styles.bookAllButton}>認識する</Button>
            </div>
          </div>
        </div>
    </AppLayout>
}


const getSubColumn = (getDetailModal:(userId:string)=>void ) =>{
    return [
        {
            title: '受信箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'ギフトカードの種類と枚数',
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
            title: '時間',
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
      title: '受信箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'ギフトカードの種類と枚数',
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
      title: '招待コード',
      dataIndex: 'referCode',
      key: 'referCode',
    },
    {
      title: '招待数',
      dataIndex: 'referCount',
      key: 'referCode',
    },
    {
      title: '時間',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'リグ',
      dataIndex: 'userId',
      key: 'userId',
      render:(_:string, re:any)=>{
        return <div style={{
          color:"var(--primary-color)",
          cursor:"pointer"
        }} onClick={()=>toDetails(_)}>詳細を見る</div>
      }
    },
  ]
};

const NoActionColumns = (openDetails:(userId:string)=>void)=>{
    return [
        {
            title: '受信箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
          title: '受信者のEメール',
          dataIndex: 'realEmail',
          key: 'realEmail',
        },
        {
            title: 'ギフトカードの種類と枚数',
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
            title: '招待コード',
            dataIndex: 'referCode',
            key: 'referCode',
        },
        {
            title: '時間',
            dataIndex: 'time',
            key: 'time',
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
  referCode:string = ""
  referCount:number = 0
  realEmail:string = ""
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
  const time2Ref = useRef<[string, string] | null>(null);
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
      APIDetailBySku({start:startTime, end:endTime}).then(resp=>{
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
                        referCount:item.num,
                        realEmail:item.realEmail
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
      getNormalData()
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
        if(time2Ref.current){
            a.href = `${baseHost}/api/v1/gcUserBooking/downloadUserDetail?userId=${userId}&start=${time2Ref.current[0]}&end=${time2Ref.current[1]}`;
        } else {
            a.href = `${baseHost}/api/v1/gcUserBooking/downloadUserDetail?userId=${userId}`;
        }
        a.click();
    }


  return <AppLayout>
    {
      !details ? <div className={styles.confirmPage}>
        <div onClick={()=>navigate("/")} className={styles.back}>
          <img src={backIcon}></img> 戻る
        </div>
        <div className={styles.section_title}>予約リスト</div>
        <div className={styles.end_wrap}>
            <DatePicker.RangePicker locale={locale.DatePicker} onChange={(dates:any)=>{
                if (dates) {
                    const startDate = dates[0].format('YYYY-MM-DD HH:mm:ss');
                    let endDate = dates[1].format('YYYY-MM-DD HH:mm:ss');
                    endDate = endDate.split(" ")[0] + " 23:59:59"
                    time1Ref.current = [startDate, endDate]
                    getData(startDate, endDate)
                } else {
                    time1Ref.current = null
                    getData()
                }
           }}></DatePicker.RangePicker>
            <img onClick={downloadTop} src={downloadIcon}/>
        </div>
        <SizeBox h={10}></SizeBox>
        <Table locale={locale.Table}loading={loading} dataSource={dataSource} columns={AllColumns(toDetails, openDetails)} />
          <UserSubDetailModal userId={userIdRef.current!} open={openDetailsModal} setOpen={setOpenDetailsModal}></UserSubDetailModal>
        <SizeBox h={50}></SizeBox>
        <div className={styles.end_wrap}>
            <DatePicker.RangePicker locale={locale.DatePicker} onChange={(dates:any)=>{
                if (dates) {
                    const startDate = dates[0].format('YYYY-MM-DD HH:mm:ss');
                    let endDate = dates[1].format('YYYY-MM-DD HH:mm:ss');
                    endDate = endDate.split(" ")[0] + " 23:59:59"
                    time2Ref.current = [startDate, endDate]
                    getNormalData(startDate, endDate)
                } else {
                    time2Ref.current = null
                    getNormalData()
                }
            }}></DatePicker.RangePicker>
            <img onClick={downloadBottom}  src={downloadIcon}/>
        </div>
        <SizeBox h={10}></SizeBox>
        <Table  locale={locale.Table} loading={normalLoading} dataSource={normalDataSource} columns={NoActionColumns(openDetails)} />
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
          <DatePicker.RangePicker locale={locale.DatePicker} onChange={(dates:any)=>{
              if (dates) {
                  const startDate = dates[0].format('YYYY-MM-DD HH:mm:ss');
                  let endDate = dates[1].format('YYYY-MM-DD HH:mm:ss');
                  endDate = endDate.split(" ")[0] + " 23:59:59"
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
    <Table locale={locale.Table}  loading={loading} pagination={{
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
