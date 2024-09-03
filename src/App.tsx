import React from 'react';
import './App.css';
import Home from "./pages/home";
import AppLayout from "./components/Layout";
import LoginForm from "./components/LoginModal";
import {LoginProvider} from "./provider/loginContext";
import MessagesModal from "./components/MessagesModal";
import ReferralCodeModal from "./components/ReferralCodeModal";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReferCodePage from "./pages/referCodePage";

function App() {
  return (
    <LoginProvider>
      <AppLayout>
         <div>
             <Router>
                 <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/referCode" element={<ReferCodePage />} />
                 </Routes>
             </Router>
           <LoginForm></LoginForm>
           <MessagesModal></MessagesModal>
         </div>
      </AppLayout>
    </LoginProvider>
  );
}

export default App;
