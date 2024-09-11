import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {APIGetUserInfo} from "../../api";
interface UserInfo{
  email:string,
  referralCode:string,
  role?:string | null,
  userGrade?:number
}

// 定义共享状态和更新函数的类型
interface LoginContextType {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
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

  const [inConfirm, setInConfirm] = useState<"home" | "confirm" | "table">("home");

  useEffect(()=>{
    const user = localStorage.getItem("userInfo")
    if(user){
      const tempUser = JSON.parse(user);
      setUserInfo({
        email:tempUser.email,
        referralCode:tempUser.referralCode,
        role:tempUser.role,
        userGrade:tempUser.userGrade
      })
      localStorage.setItem("userInfo", JSON.stringify(tempUser));
      getUserInfo()
    }
  }, [])

  const getUserInfo = () =>{
      APIGetUserInfo({}).then(resp=>{
          if(resp.data.data){
              console.log(resp.data.data, "resp.data")
              const data = resp.data.data;
              const tempUser = {
                  userGrade:data.userGrade,
                  referralCode:data.bindCode,
                  email:data.email
              } as UserInfo

              const user = {
                  ...userInfo,
                  ...tempUser
              }
              setUserInfo(user);
              localStorage.setItem("userInfo", JSON.stringify(user));
          }
      })
  }

    const getUserInfoAsync = async ():Promise<[any, Error | null | unknown]> =>{
       try{
           const resp = await APIGetUserInfo({})
           const data = resp.data.data;
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
      getUserInfoAsync:getUserInfoAsync
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
