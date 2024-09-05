import React from 'react';
import './App.css';
import Home, {TablePageAll} from "./pages/home";
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
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/referCode" element={<ReferCodePage />} />
                    <Route path="/admin" element={<TablePageAll />} />
                </Routes>
            </Router>
            <LoginForm></LoginForm>
            <MessagesModal></MessagesModal>
        </div>
    </LoginProvider>
  );
}

export default App;
