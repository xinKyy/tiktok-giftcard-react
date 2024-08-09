import React from 'react';
import './App.css';
import Home from "./pages/home";
import AppLayout from "./components/Layout";

function App() {
  return (
    <AppLayout>
      <Home></Home>
    </AppLayout>
  );
}

export default App;
