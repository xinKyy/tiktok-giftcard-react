
import axiosInstance from "../http/axiosInstance";


export const APILogin = (params:{
  email:string,
  verifyCode:string
  password:string
}) =>{
  return axiosInstance.post("/any-starr/api/v1/gcUser/login", params)
}

export const APIGetCode = (params:{
  email:string,
}) =>{
  return axiosInstance.get("/any-starr/api/v1/gcUser/getCode", {params})
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

  return axiosInstance.post("/any-starr/api/v1/gcUserBooking/booking", params)
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

  return axiosInstance.get("/any-starr/api/v1/gcUserBooking/mine", {params})
}
