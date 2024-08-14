import React from 'react';
import './App.css';
import Home from "./pages/home";
import AppLayout from "./components/Layout";
import LoginForm from "./components/LoginModal";
import {LoginProvider} from "./provider/loginContext";
import MessagesModal from "./components/MessagesModal";
import ReferralCodeModal from "./components/ReferralCodeModal";

function App() {
  return (
    <LoginProvider>
      <AppLayout>
         <div>
           <Home></Home>
           <LoginForm></LoginForm>
           <MessagesModal></MessagesModal>
         </div>
      </AppLayout>
    </LoginProvider>
  );
}

export default App;
