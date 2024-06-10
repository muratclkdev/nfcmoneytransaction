import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrowserQRCodeReader } from '@zxing/library';

const QRScan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReader.decodeOnceFromVideoDevice(undefined, 'video').then(result => {
      const scannedData = JSON.parse(result.text);
      confirmTransfer(scannedData);
    }).catch(err => console.error(err));
  }, []);

  const confirmTransfer = (scannedData) => {
    navigate('/confirmation', { state: { sender: scannedData.sender, recipient: username, amount: scannedData.amount } });
  };

  return (
    <div>
      <h2>QR Kod Tara</h2>
      <video id="video" width="300" height="200" style={{ border: '1px solid black' }}></video>
    </div>
  );
};

export default QRScan;
