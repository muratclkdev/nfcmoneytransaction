import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AccountList from './components/AccountList';
import Transfer from './components/Transfer';
import Confirmation from './components/Confirmation';
import QRScan from './components/QRScan';
import NFCReceive from './components/NFCReceive';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accounts" element={<AccountList />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/qr-scan" element={<QRScan />} />
        <Route path="/nfc-receive" element={<NFCReceive />} />
      </Routes>
    </Router>
  );
}

export default App;
