const QRCode = require('qrcode');

QRCode.toFile('apk-download-qr.png', 'http://localhost:3000/files/myapp.apk', (err) => {
  if (err) throw err;
  console.log('QR Code generated!');
});
