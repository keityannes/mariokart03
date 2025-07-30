// gerar.js
const QRCode = require('qrcode');
const qrcodeTerminal = require('qrcode-terminal');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sanitizeFileName(url) {
  return url.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

rl.question('🔗 Digite o link do produto: ', function (url) {
  if (!url.startsWith('http')) {
    console.log('❌ URL inválida. Certifique-se de começar com http ou https.');
    rl.close();
    return;
  }

  // 1. Exibir no terminal
  console.log('\n🖥️ QR Code no terminal:\n');
  qrcodeTerminal.generate(url, { small: true });

  // 2. Salvar como imagem
  const fileName = sanitizeFileName(url).slice(0, 50) + '.png';
  const outputPath = path.join(__dirname, 'qr_codes', fileName);

  QRCode.toFile(outputPath, url, {
    color: {
      dark: '#000',  // Cor do QR
      light: '#FFF'  // Fundo branco
    }
  }, function (err) {
    if (err) {
      console.error('❌ Erro ao gerar imagem:', err);
    } else {
      console.log(`\n✅ QR Code salvo em: qr_codes/${fileName}`);
    }
    rl.close();
  });
});
