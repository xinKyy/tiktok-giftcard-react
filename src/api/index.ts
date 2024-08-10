
import axiosInstance from "../http/axiosInstance";


export const APILogin = (params:{
  email:string,
  password:string
}) =>{
  return axiosInstance.post("/any-starr/api/v1/gcUser/login", params)
}
