import React, { createContext, useContext, useState, ReactNode } from 'react';
interface UserInfo{
  email:string,
  referralCode:string
}

// 定义共享状态和更新函数的类型
interface LoginContextType {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  openLoginModal:boolean;
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMessagesModal:boolean;
  setOpenMessagesModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <LoginContext.Provider value={{ openLoginModal, setOpenLoginModal, userInfo, setUserInfo, openMessagesModal, setOpenMessagesModal }}>
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
