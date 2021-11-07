function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
function onScanSuccess(decodedText, decodedResult) {
  // Handle on success condition with the decoded text or result.
  console.log(`Scan result: ${decodedText}`, decodedResult);
  let el = document.getElementById('tagSearch');
  el.value = decodedText;
  document.querySelector('form[role="search"]').submit();
  closeScanner();
}

function closeScanner() {
  window.html5QrcodeScanner.clear();
  window.html5QrcodeScanner = null;
  let myDiv = document.getElementById('scan-box');
  myDiv.remove();
}

function scanQRCode() {
  addReaderView();
  let html5QrcodeScanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250, formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ]});
  html5QrcodeScanner.render(onScanSuccess);
  window.html5QrcodeScanner = html5QrcodeScanner;
}

function addReaderView() {
  let myDiv = document.createElement('div');
  myDiv.id = 'scan-box';
  myDiv.innerHTML = '<div id="reader"></div><button onclick="closeScanner()">close</button>';
  document.body.appendChild(myDiv);
}

ready(() => {
  let el = document.getElementById('scan-qrcode');
  el.addEventListener('click', scanQRCode);
});
