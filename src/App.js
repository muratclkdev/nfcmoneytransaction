import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AccountList from './components/AccountList';
import Transfer from './components/Transfer';
import Confirmation from './components/Confirmation';
import QRScan from './components/QRScan'; // Güncellenmiş import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accounts" element={<AccountList />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/qr-scan" element={<QRScan />} />
      </Routes>
    </Router>
  );
}

export default App;
