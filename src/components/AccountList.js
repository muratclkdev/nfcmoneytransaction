import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AccountList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;

  const accounts = {
    user1: { iban: 'TR000000000000000000000001', balance: 500 },
    user2: { iban: 'TR000000000000000000000002', balance: 300 }
  };

  const handleTransfer = () => {
    navigate('/transfer', { state: { sender: username, recipient: username === 'user1' ? 'user2' : 'user1' } });
  };

  return (
    <div>
      <h2>Hesap Listesi</h2>
      <div>
        <p>Hesap: {accounts[username].iban}</p>
        <p>Bakiye: {accounts[username].balance} TL</p>
        <button onClick={handleTransfer}>NFC veya QR ile Para Gönder</button>
      </div>
    </div>
  );
};

export default AccountList;
