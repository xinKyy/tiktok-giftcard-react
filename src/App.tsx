import React from 'react';
import './App.css';
import Home, {TablePageAll} from "./pages/home";
import LoginForm from "./components/LoginModal";
import {LoginProvider} from "./provider/loginContext";
import MessagesModal from "./components/MessagesModal";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SecondUserTablePageAll from "./pages/home/secondeUserAdmin";
import Footer from "./components/Footer";
import About from "./pages/about";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecordPage from './pages/record';
import PaymentComponent from "./pages/pay";
import ConfirmOrder from "./pages/order";
import PaySuccess from './pages/order/PaySuccess';
import PayFail from './pages/order/PayFail';
import PreConfirmOrder from "./pages/order-confirm";

function App() {
  return (
    <LoginProvider>
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<TablePageAll />} />
                    <Route path="/subAdmin" element={<SecondUserTablePageAll />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/records" element={<RecordPage />} />
                    <Route path="/pay/:id" element={<PaymentComponent />} />
                    <Route path="/order/:id" element={<ConfirmOrder />} />
                    <Route path="/confirm/:query" element={<PreConfirmOrder />} />
                    <Route path="/orderSuccess/:orderId" element={<PaySuccess />} />
                    <Route path="/orderFaild/:orderId" element={<PayFail />} />
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
