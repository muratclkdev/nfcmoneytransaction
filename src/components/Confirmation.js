import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sender, recipient, amount } = location.state;

  const accounts = {
    user1: { iban: 'TR000000000000000000000001', balance: 500 },
    user2: { iban: 'TR000000000000000000000002', balance: 300 }
  };

  // Hesap bakiyelerini güncelle
  accounts[sender].balance -= parseFloat(amount);
  accounts[recipient].balance += parseFloat(amount);

  return (
    <div>
      <h2>İşlem Başarıyla Tamamlandı!</h2>
      <p>Gönderen: {sender}</p>
      <p>Alıcı: {recipient}</p>
      <p>Tutar: {amount} TL</p>
      <button onClick={() => navigate('/accounts', { state: { username: sender } })}>Ana Sayfa</button>
    </div>
  );
};

export default Confirmation;
