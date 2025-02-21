import {DatePicker, Table, Tag} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {APIStaticsDetail, APIStaticsDetailByUid} from "../../api";
import {baseHost} from "../../http/axiosInstance";
import AppLayout from "../../components/Layout";
import styles from "./index.module.scss";
import backIcon from "../../assets/images/home/back-icon.svg";
import downloadIcon from "../../assets/images/home/downloadIcon.svg";
import SizeBox from "../../components/SizeBox";
import UserSubDetailModal from "./componments/UserSubDetailModal";
import locale from "antd/locale/ja_JP";


const getSubColumn = (getDetailModal:(userId:string)=>void ) =>{
    return [
        {
            title: '受信箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'ギフトカードの種類と枚数',
            dataIndex: 'type',
            key: 'type',
            render:(_:string, r:DataItem)=>{
                return  <Tag onClick={()=>getDetailModal(r.email)} color={getColor(r.id)}>{_}</Tag>
            }
        },
        {
            title: '時間',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '招待コード',
            dataIndex: 'referralCode',
            key: 'referralCode',
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
          title: '招待コード',
          dataIndex: 'referCode',
          key: 'referCode',
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
            title: '時間',
            dataIndex: 'time',
            key: 'time',
        },
    ]
};

const NoActionColumns = [
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
        title: '招待数',
        dataIndex: 'referCount',
        key: 'referCode',
    },
    {
        title: '時間',
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

const SecondUserTablePageAll = () =>{
    const [dataSource, setDataSource] = useState<AllDataItem[]>([]);
    const [total, setTotal] = useState(0)
    const [details, setDetails] = useState(false)
    const referCode = useRef<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const time1Ref = useRef<[string, string] | null>(null);
    const [openDetailsModal, setOpenDetailsModal] = useState(false)
    const userIdRef = useRef<string>();
    const getData = (startTime?:string, endTime?:string) =>{
        setLoading(true)
        APIStaticsDetailByUid({
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

    const openDetails = (userId:string) =>{
        setOpenDetailsModal(true)
        userIdRef.current = userId
    }

    useEffect(()=>{
        getData()
    }, [])

    const toDetails = (code:string) =>{
        referCode.current = code
        setDetails(true)
    }

    const downloadTop = () =>{
        const userId = localStorage.getItem("id");
        const a = document.createElement("a");
        if(time1Ref.current){
            a.href = `${baseHost}/api/v1/gcUserBooking/downloadByUid?userId=${userId}&start=${time1Ref.current[0]}&end=${time1Ref.current[1]}`;
        } else {
            a.href = `${baseHost}/api/v1/gcUserBooking/downloadByUid?userId=${userId}`;
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
        <div className={styles.confirmPage}>
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
                        console.log("No date selected");
                    }
                }}></DatePicker.RangePicker>
                <img onClick={downloadTop} src={downloadIcon}/>
            </div>
            <SizeBox h={10}></SizeBox>
            <Table locale={locale.Table} loading={loading} dataSource={dataSource} columns={AllColumns(toDetails, openDetails)} />
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
            {/*<Table loading={loading} dataSource={dataSource} columns={NoActionColumns} />*/}
        </div>
    </AppLayout>;
}

export default SecondUserTablePageAll
