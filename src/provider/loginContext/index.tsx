import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
interface UserInfo{
  email:string,
  referralCode:string,
  role?:string | null
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
      const code = localStorage.getItem("referralCode")
      if(code && code !== "SKIP"){
        tempUser.referralCode = code
      }
      setUserInfo({
        email:tempUser.email,
        referralCode:tempUser.referralCode,
        role:tempUser.role,
      })
      localStorage.setItem("userInfo", JSON.stringify(tempUser));
    }
  }, [])

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
      setInConfirm
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
