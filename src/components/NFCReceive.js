import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NFCReceive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;

  useEffect(() => {
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
            const scannedData = JSON.parse(new TextDecoder().decode(message.records[0].data));
            confirmTransfer(scannedData);
          };
        } catch (error) {
          console.log("Hata: " + error);
          alert('NFC İşlemi Başarısız: ' + error);
        }
      } else {
        alert('Tarayıcınız NFC desteklemiyor.');
      }
    };

    handleNFCRead();
  }, [navigate, username]);

  const confirmTransfer = (scannedData) => {
    navigate('/confirmation', { state: { sender: scannedData.sender, recipient: username, amount: scannedData.amount } });
  };

  return (
    <div>
      <h2>NFC ile Para Al</h2>
      <p>Lütfen gönderici cihazı yakınlaştırın...</p>
    </div>
  );
};

export default NFCReceive;
