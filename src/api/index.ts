
import axiosInstance from "../http/axiosInstance";


export const APILogin = (params:{
  email:string,
  verifyCode:string
  password:string
}) =>{
  return axiosInstance.post("/api/v1/gcUser/login", params)
}

export const APIGetCode = (params:{
  email:string,
}) =>{
  return axiosInstance.get("/api/v1/gcUser/getCode", {params})
}

export const APIBooking = (params:{
  bookingItemList:{
    id:number,
    num:number,
  }[],
  userId?:string | null
  referralCode?:string | null | undefined
}) =>{

  params.userId = localStorage.getItem("id")

  return axiosInstance.post("/api/v1/gcUserBooking/booking", params)
}


export class MyBookingParams{
  pageNum:number = 1
  pageSize?:number = 10
  userId?:string | null


  constructor(pageNum:number, pageSize:number = 10) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.userId = localStorage.getItem("id")
  }
}

export const APIMyBooking = (params:MyBookingParams) =>{

  return axiosInstance.get("/api/v1/gcUserBooking/mine", {params})
}

export const APIAfterCheck = () =>{
  const id = localStorage.getItem("id");
  return axiosInstance.get("/api/v1/gcUserBooking/afterCheck", {
    params: {
      id:id
    }
  })
}

export const APICheckVerificationCode = (params:{
  referralCode:string
}) =>{
  // 返回 data 为1:正确。 0：错误
  return axiosInstance.get("/api/v1/gcUserBooking/checkVerificationCode", {params})
}

export const APIStatistics = () =>{
  const params = {
    userId:localStorage.getItem("id")
  }
  return axiosInstance.get("/api/v1/gcUserBooking/statistics", {params})
}

export const APIStatisticsItem = (params:{
  pageNum:number,
  pageSize:number,
  userId:string
}) =>{
  return axiosInstance.get("/api/v1/gcUserBooking/statisticsItem", {params})
}

export const APIGenerateCode = (params:{
    num?:number,
    codes?:string,
    userId?:string | null
}) =>{
    params.userId = localStorage.getItem("id")
    return axiosInstance.get("/api/v1/gcCode/create", {params})
}

// 绑定邀请码
export const APIBindReferCode = (params:{
    userId?:string | null,
    code:string
}) =>{
    params.userId = localStorage.getItem("id")
    return axiosInstance.get("/api/v1/gcBind/create", {params})
}

// 一级用户查看
export const APIStaticsDetail = (params:{
    userId?:string | null,
    code?:string | null,
    start?:string,
    end?:string
}) =>{
    if(!params.userId){
        params.userId = localStorage.getItem("id")
    }
    return axiosInstance.get("/api/v1/gcUserBooking/statisticsDetail", {params})
}

// 一级用户下载
export const APIStaticsDetailDownload = (params:{
    userId?:string | null,
}) =>{
    params.userId = localStorage.getItem("id")
    return axiosInstance.get("/api/v1/gcUserBooking/download", {params})
}


// 二级用户查看
export const APIStaticsDetailByUid = (params:{
    userId?:string | null,
    start?:string,
    end?:string
}) =>{
    if(!params.userId){
        params.userId = localStorage.getItem("id")
    }
    return axiosInstance.get("/api/v1/gcUserBooking/statistics/detailByUid", {params})
}

// 二级用户下载
export const APIStaticsDownloadByUid = (params:{
    userId?:string | null,
}) =>{
    params.userId = localStorage.getItem("id")
    return axiosInstance.get("/api/v1/gcUserBooking/downloadByUid", {params})
}

// 普通用户查询
export const APIDetailBySku = (params:{
    userId?:string | null,
    start?:string,
    end?:string
}) =>{
    params.userId = localStorage.getItem("id")
    return axiosInstance.get("/api/v1/gcUserBooking/statistics/detailBySku", {params})
}

// 普通用户下载
export const APIDetailBySkuDownloadUserDetail = (params:{
    userId?:string | null
}) =>{
    params.userId = localStorage.getItem("id")
    return axiosInstance.get("/api/v1/gcUserBooking/downloadUserDetail", {params})
}


export const APIGetUserInfo = (params:{
    userId?:string | null
}) =>{
    params.userId = localStorage.getItem("id")
    return axiosInstance.get("/api/v1/gcUser/getUserInfo", {params})
}
