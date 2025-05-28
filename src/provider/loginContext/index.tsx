import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {APIGetUserInfo} from "../../api";
import {getUserInfoNewAPI, UserInfo} from "../../api/newApi";


export interface OrderConfirmItem{
    giftCardId: number
    quantity: number
    price: number
}

// 定义共享状态和更新函数的类型
interface LoginContextType {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  orderConfirm: OrderConfirmItem[];
  setOrderConfirm: React.Dispatch<React.SetStateAction<OrderConfirmItem[]>>;
  openLoginModal:boolean;
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMessagesModal:boolean;
  setOpenMessagesModal: React.Dispatch<React.SetStateAction<boolean>>;
  openReferralCodeModal:boolean;
  setOpenReferralCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
  inConfirm:"home" | "confirm" | "table";
  setInConfirm: React.Dispatch<React.SetStateAction<"home" | "confirm" | "table">>;
  getUserInfo:()=>void,
  getUserInfoAsync:()=>Promise<[any, Error | null | unknown]>
}

// 创建一个Context并指定类型
const LoginContext = createContext<LoginContextType | undefined>(undefined);


// 定义Provider组件的Props类型
interface LoginProviderProps {
  children: ReactNode;
}

// 创建Provider组件
export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openMessagesModal, setOpenMessagesModal] = useState<boolean>(false);
  const [openReferralCodeModal, setOpenReferralCodeModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [orderConfirm, setOrderConfirm] = useState<OrderConfirmItem[]>([]);

  const [inConfirm, setInConfirm] = useState<"home" | "confirm" | "table">("home");

  useEffect(()=>{
    const user = localStorage.getItem("userInfo")
    if(user){
      const tempUser = JSON.parse(user);
      setUserInfo({
        email:tempUser.email,
      })
      localStorage.setItem("userInfo", JSON.stringify(tempUser));
      getUserInfo()
    }
  }, [])

  const getUserInfo = () =>{
      getUserInfoNewAPI().then(resp =>{
          console.log(resp, "getUserInfoNewAPI")
          if (resp.code === 200 && resp.data){
              setUserInfo(resp.data);
          }
      })
  }
  const getUserInfoAsync = async ():Promise<[any, Error | null | unknown]> =>{
       try{
           const resp = await getUserInfoNewAPI()
           const data = resp.data;
           return [data, null]
       } catch (e){
           return [null, e]
       }
    }

  return (
    <LoginContext.Provider value={{
      openLoginModal,
      setOpenLoginModal,
      userInfo, setUserInfo,
      openMessagesModal,
      setOpenMessagesModal,
      openReferralCodeModal,
      setOpenReferralCodeModal,
      inConfirm,
      setInConfirm,
      getUserInfo,
      getUserInfoAsync:getUserInfoAsync,
      orderConfirm, setOrderConfirm
    }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('no login provider');
  }
  return context;
};
