import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';

const Transfer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sender, recipient } = location.state;
  const [amount, setAmount] = useState('');
  const [qrData, setQRData] = useState('');
  const [confirmationNeeded, setConfirmationNeeded] = useState(false);

  const handleTransfer = () => {
    setConfirmationNeeded(true);
    setQRData(JSON.stringify({ sender, recipient, amount }));
  };

  const handleNFCRead = async () => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();
        console.log("NFC tarayıcısı başlatıldı.");

        ndef.onreading = event => {
          const message = event.message;
          for (const record of message.records) {
            console.log("NFC okuma:");
            console.log("  Kayıt türü:  " + record.recordType);
            console.log("  Medya türü:  " + record.mediaType);
            console.log("  Kayıt verisi: " + record.data);
          }
          // NFC okutulduğunda işlemi onayla
          confirmTransfer();
        };

        await ndef.write(`Gönderici: ${sender}, Alıcı: ${recipient}, Tutar: ${amount} TL`);
        alert('NFC İşlemi Başarılı');
        navigate('/confirmation', { state: { sender, recipient, amount } });
      } catch (error) {
        console.log("Hata: " + error);
        alert('NFC İşlemi Başarısız: ' + error);
      }
    } else {
      alert('Tarayıcınız NFC desteklemiyor.');
    }
  };

  const confirmTransfer = () => {
    // Transferi onayla ve bakiyeleri güncelle
    navigate('/confirmation', { state: { sender, recipient, amount } });
  };

  return (
    <div>
      <h2>Transfer Yap</h2>
      {!confirmationNeeded ? (
        <>
          <input
            type="text"
            placeholder="Göndermek İstediğiniz Tutar"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleTransfer}>Onayla ve Gönder</button>
        </>
      ) : (
        <>
          <h3>NFC veya QR ile Ödeme</h3>
          <QRCode value={qrData} size={200} />
          <button onClick={handleNFCRead}>NFC ile Öde</button>
        </>
      )}
    </div>
  );
};

export default Transfer;
