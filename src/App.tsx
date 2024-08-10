import React from 'react';
import './App.css';
import Home from "./pages/home";
import AppLayout from "./components/Layout";
import LoginForm from "./components/LoginModal";
import {LoginProvider} from "./provider/loginContext";
import MessagesModal from "./components/MessagesModal";

function App() {
  return (
    <LoginProvider>
      <AppLayout>
         <>
           <Home></Home>
           <LoginForm></LoginForm>
           <MessagesModal></MessagesModal>
         </>
      </AppLayout>
    </LoginProvider>
  );
}

export default App;
