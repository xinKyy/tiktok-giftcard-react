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
import SecondUserTablePageAll from "./pages/home/secondeUserAdmin";
import Footer from "./components/Footer";
import About from "./pages/about";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
    <LoginProvider>
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/referCode" element={<ReferCodePage />} />
                    <Route path="/admin" element={<TablePageAll />} />
                    <Route path="/subAdmin" element={<SecondUserTablePageAll />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Router>
            <LoginForm></LoginForm>
            <MessagesModal></MessagesModal>
        </div>
      <Footer></Footer>
    </LoginProvider>
  );
}

export default App;
