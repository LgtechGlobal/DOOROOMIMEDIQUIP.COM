// Pure JavaScript QR Code Generator & Poster Utility
// Standard ISO/IEC 18004 Specification Compliant (Zero external npm dependency)

const QRMode = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 };
const QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };

const QRMath = {
  glog: function(n) {
    if (n < 1) throw new Error("glog(" + n + ")");
    return QRMath.LOG_TABLE[n];
  },
  gexp: function(n) {
    while (n < 0) n += 255;
    while (n >= 256) n -= 255;
    return QRMath.EXP_TABLE[n];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};

for (let i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
for (let i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (let i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

function QRPolynomial(num, shift) {
  let offset = 0;
  while (offset < num.length && num[offset] === 0) offset++;
  this.num = new Array(num.length - offset + shift);
  for (let i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
}

QRPolynomial.prototype = {
  get: function(index) { return this.num[index]; },
  getLength: function() { return this.num.length; },
  multiply: function(e) {
    const num = new Array(this.getLength() + e.getLength() - 1).fill(0);
    for (let i = 0; i < this.getLength(); i++) {
      for (let j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }
    return new QRPolynomial(num, 0);
  },
  mod: function(e) {
    if (this.getLength() - e.getLength() < 0) return this;
    const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
    const num = new Array(this.getLength());
    for (let i = 0; i < this.getLength(); i++) num[i] = this.get(i);
    for (let i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
    }
    return new QRPolynomial(num, 0).mod(e);
  }
};

function QRRSBlock(totalCount, dataCount) {
  this.totalCount = totalCount;
  this.dataCount = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [
  // 1
  [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
  // 2
  [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
  // 3
  [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
  // 4
  [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
  // 5
  [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
  // 6
  [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15],
  // 7
  [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14],
  // 8
  [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
  const rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
  if (!rsBlock) throw new Error("bad rs block @ typeNumber:" + typeNumber);
  const length = rsBlock.length / 3;
  const list = [];
  for (let i = 0; i < length; i++) {
    const count = rsBlock[i * 3 + 0];
    const totalCount = rsBlock[i * 3 + 1];
    const dataCount = rsBlock[i * 3 + 2];
    for (let j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount));
  }
  return list;
};

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
  switch (errorCorrectLevel) {
    case QRErrorCorrectLevel.L: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
    case QRErrorCorrectLevel.M: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
    case QRErrorCorrectLevel.Q: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
    case QRErrorCorrectLevel.H: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
    default: return undefined;
  }
};

function QRBitBuffer() {
  this.buffer = [];
  this.length = 0;
}
QRBitBuffer.prototype = {
  get: function(index) {
    const bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1;
  },
  put: function(num, length) {
    for (let i = 0; i < length; i++) this.putBit(((num >>> (length - i - 1)) & 1) === 1);
  },
  putBit: function(bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) this.buffer.push(0);
    if (bit) this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    this.length++;
  }
};

function QR8bitByte(data) {
  this.mode = QRMode.MODE_8BIT_BYTE;
  this.data = data;
}
QR8bitByte.prototype = {
  getLength: function() { return encodeURI(this.data).replace(/%[0-9A-F]{2}/g, "a").length; },
  write: function(buffer) {
    const utf8Bytes = [];
    for (let i = 0; i < this.data.length; i++) {
      let charcode = this.data.charCodeAt(i);
      if (charcode < 0x80) utf8Bytes.push(charcode);
      else if (charcode < 0x800) {
        utf8Bytes.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8Bytes.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      }
    }
    for (let i = 0; i < utf8Bytes.length; i++) buffer.put(utf8Bytes[i], 8);
  }
};

const QRUtil = {
  PATTERN_POSITION_TABLE: [
    [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42]
  ],
  G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
  G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
  G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
  getBCHTypeInfo: function(data) {
    let d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
    }
    return ((data << 10) | d) ^ QRUtil.G15_MASK;
  },
  getBCHDigit: function(data) {
    let digit = 0;
    while (data !== 0) { digit++; data >>>= 1; }
    return digit;
  },
  getPatternPosition: function(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function(maskPattern, i, j) {
    switch (maskPattern) {
      case 0: return (i + j) % 2 === 0;
      case 1: return i % 2 === 0;
      case 2: return j % 3 === 0;
      case 3: return (i + j) % 3 === 0;
      case 4: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
      case 5: return ((i * j) % 2) + ((i * j) % 3) === 0;
      case 6: return (((i * j) % 2) + ((i * j) % 3)) % 2 === 0;
      case 7: return (((i * j) % 3) + ((i + j) % 2)) % 2 === 0;
      default: throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function(errorCorrectLength) {
    let a = new QRPolynomial([1], 0);
    for (let i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  },
  getLengthInBits: function(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER: return 10;
        case QRMode.MODE_ALPHA_NUM: return 9;
        case QRMode.MODE_8BIT_BYTE: return 8;
        case QRMode.MODE_KANJI: return 8;
        default: throw new Error("mode:" + mode);
      }
    }
    return 16;
  },
  getLostPoint: function(qrCode) {
    const moduleCount = qrCode.getModuleCount();
    let lostPoint = 0;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        let sameCount = 0;
        const dark = qrCode.isDark(row, col);
        for (let r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) continue;
          for (let c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) continue;
            if (r === 0 && c === 0) continue;
            if (dark === qrCode.isDark(row + r, col + c)) sameCount++;
          }
        }
        if (sameCount > 5) lostPoint += (3 + sameCount - 5);
      }
    }
    return lostPoint;
  }
};

function QRCode(typeNumber, errorCorrectLevel) {
  this.typeNumber = typeNumber;
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;
  this.moduleCount = 0;
  this.dataList = [];
}

QRCode.prototype = {
  addData: function(data) { this.dataList.push(new QR8bitByte(data)); },
  isDark: function(row, col) { return this.modules[row][col]; },
  getModuleCount: function() { return this.moduleCount; },
  make: function() {
    this.makeImpl(false, this.getBestMaskPattern());
  },
  makeImpl: function(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (let row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount).fill(null);
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);
    this.mapData(QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList), maskPattern);
  },
  setupPositionProbePattern: function(row, col) {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if ((0 <= r && r <= 6 && (c === 0 || c === 6)) ||
            (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
            (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  getBestMaskPattern: function() {
    let minLostPoint = 0;
    let pattern = 0;
    for (let i = 0; i < 8; i++) {
      this.makeImpl(true, i);
      const lostPoint = QRUtil.getLostPoint(this);
      if (i === 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }
    return pattern;
  },
  setupTimingPattern: function() {
    for (let r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] !== null) continue;
      this.modules[r][6] = (r % 2 === 0);
    }
    for (let c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules[6][c] !== null) continue;
      this.modules[6][c] = (c % 2 === 0);
    }
  },
  setupPositionAdjustPattern: function() {
    const pos = QRUtil.getPatternPosition(this.typeNumber);
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        const row = pos[i];
        const col = pos[j];
        if (this.modules[row][col] !== null) continue;
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            this.modules[row + r][col + c] = (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0));
          }
        }
      }
    }
  },
  setupTypeInfo: function(test, maskPattern) {
    const data = (this.errorCorrectLevel << 3) | maskPattern;
    const bits = QRUtil.getBCHTypeInfo(data);
    for (let i = 0; i < 15; i++) {
      const mod = (!test && ((bits >> i) & 1) === 1);
      if (i < 6) this.modules[i][8] = mod;
      else if (i < 8) this.modules[i + 1][8] = mod;
      else this.modules[this.moduleCount - 15 + i][8] = mod;
    }
    for (let i = 0; i < 15; i++) {
      const mod = (!test && ((bits >> i) & 1) === 1);
      if (i < 8) this.modules[8][this.moduleCount - i - 1] = mod;
      else if (i < 9) this.modules[8][15 - i - 1 + 1] = mod;
      else this.modules[8][15 - i - 1] = mod;
    }
    this.modules[this.moduleCount - 8][8] = !test;
  },
  mapData: function(data, maskPattern) {
    let inc = -1;
    let row = this.moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for (let col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      while (true) {
        for (let c = 0; c < 2; c++) {
          if (this.modules[row][col - c] === null) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
            }
            const mask = QRUtil.getMask(maskPattern, row, col - c);
            if (mask) dark = !dark;
            this.modules[row][col - c] = dark;
            bitIndex--;
            if (bitIndex === -1) { byteIndex++; bitIndex = 7; }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
};

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
  const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  const buffer = new QRBitBuffer();
  for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
    data.write(buffer);
  }
  let totalDataCount = 0;
  for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
  if (buffer.length + 4 <= totalDataCount * 8) buffer.put(0, 4);
  while (buffer.length % 8 !== 0) buffer.putBit(false);
  while (true) {
    if (buffer.length >= totalDataCount * 8) break;
    buffer.put(0xEC, 8);
    if (buffer.length >= totalDataCount * 8) break;
    buffer.put(0x11, 8);
  }
  return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {
  let offset = 0;
  let maxDcCount = 0;
  let maxEcCount = 0;
  const dcdata = new Array(rsBlocks.length);
  const ecdata = new Array(rsBlocks.length);
  for (let r = 0; r < rsBlocks.length; r++) {
    const dcCount = rsBlocks[r].dataCount;
    const ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcdata[r] = new Array(dcCount);
    for (let i = 0; i < dcdata[r].length; i++) dcdata[r][i] = 0xff & buffer.buffer[i + offset];
    offset += dcCount;
    const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
    const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
    const modPoly = rawPoly.mod(rsPoly);
    ecdata[r] = new Array(rsPoly.getLength() - 1);
    for (let i = 0; i < ecdata[r].length; i++) {
      const modIndex = i + modPoly.getLength() - ecdata[r].length;
      ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
    }
  }
  let totalCodeCount = 0;
  for (let i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
  const data = new Array(totalCodeCount);
  let index = 0;
  for (let i = 0; i < maxDcCount; i++) {
    for (let r = 0; r < rsBlocks.length; r++) {
      if (i < dcdata[r].length) data[index++] = dcdata[r][i];
    }
  }
  for (let i = 0; i < maxEcCount; i++) {
    for (let r = 0; r < rsBlocks.length; r++) {
      if (i < ecdata[r].length) data[index++] = ecdata[r][i];
    }
  }
  return data;
};

// Generates QR matrix with optimal type
export function generateQRMatrix(text) {
  if (!text) text = "https://www.dooroomimediquip.com/#/rate";
  const byteLen = encodeURI(text).replace(/%[0-9A-F]{2}/g, "a").length;
  let type = 4;
  if (byteLen <= 17) type = 1;
  else if (byteLen <= 32) type = 2;
  else if (byteLen <= 53) type = 3;
  else if (byteLen <= 78) type = 4;
  else if (byteLen <= 106) type = 5;
  else if (byteLen <= 134) type = 6;
  else if (byteLen <= 154) type = 7;
  else type = 8;

  const qr = new QRCode(type, QRErrorCorrectLevel.M);
  qr.addData(text);
  qr.make();
  return {
    moduleCount: qr.getModuleCount(),
    isDark: (r, c) => qr.isDark(r, c)
  };
}

// React SVG QR Component
export function QRCodeSVG({ value, size = 220, fgColor = "#0d221b", bgColor = "#ffffff" }) {
  const qr = generateQRMatrix(value);
  const count = qr.moduleCount;
  const margin = 2;
  const totalCount = count + margin * 2;
  const cellSize = size / totalCount;

  const rects = [];
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        rects.push(
          <rect
            key={`${r}-${c}`}
            x={(c + margin) * cellSize}
            y={(r + margin) * cellSize}
            width={cellSize + 0.15}
            height={cellSize + 0.15}
            fill={fgColor}
          />
        );
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded-xl shadow-inner select-none"
      style={{ backgroundColor: bgColor }}
    >
      <rect width={size} height={size} fill={bgColor} />
      {rects}
    </svg>
  );
}

// Download printable high-resolution poster (PNG) for clinics, tables, and reception
export function downloadScannerPoster({
  qrUrl,
  centerName = "Dooroomi Medical Pvt. Ltd.",
  filename = "Dooroomi-Customer-Feedback-Scanner.png"
}) {
  const canvas = document.createElement("canvas");
  const width = 1000;
  const height = 1400;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Background Luxury Medical Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#081c15");
  bgGrad.addColorStop(0.3, "#0d221b");
  bgGrad.addColorStop(1, "#05130e");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer Gold Decorative Border
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
  ctx.lineWidth = 2;
  ctx.strokeRect(45, 45, width - 90, height - 90);

  // Korean Brand Header
  ctx.fillStyle = "#f59e0b";
  ctx.font = "bold 28px serif";
  ctx.textAlign = "center";
  ctx.fillText("두루미 의료기기 · 대한민국 정밀 온열 치료기", width / 2, 110);

  // Company Name
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 48px serif";
  ctx.fillText("DOOROOMI MEDIQUIP", width / 2, 175);

  ctx.fillStyle = "rgba(212, 175, 55, 0.9)";
  ctx.font = "600 20px sans-serif";
  ctx.fillText("SOUTH KOREAN ADVANCED SPINAL THERMAL & BIO-MINERAL TECHNOLOGY", width / 2, 215);

  // Divider Line
  ctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(150, 245);
  ctx.lineTo(width - 150, 245);
  ctx.stroke();

  // Call to Action
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px sans-serif";
  ctx.fillText("SCAN TO RATE YOUR THERAPY", width / 2, 310);

  ctx.fillStyle = "#a7f3d0";
  ctx.font = "22px sans-serif";
  ctx.fillText("Open phone camera & scan QR to share your recovery feedback", width / 2, 350);

  // QR Code Box (White luxury card in center)
  const qrBoxSize = 520;
  const qrBoxX = (width - qrBoxSize) / 2;
  const qrBoxY = 400;

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 28);
  ctx.fill();

  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 6;
  ctx.stroke();

  // Draw QR code onto Canvas
  const qr = generateQRMatrix(qrUrl);
  const count = qr.moduleCount;
  const margin = 2;
  const totalCount = count + margin * 2;
  const innerSize = qrBoxSize - 40;
  const cellSize = innerSize / totalCount;
  const qrStartX = qrBoxX + 20;
  const qrStartY = qrBoxY + 20;

  ctx.fillStyle = "#0a1f18";
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillRect(
          qrStartX + (c + margin) * cellSize,
          qrStartY + (r + margin) * cellSize,
          cellSize + 0.3,
          cellSize + 0.3
        );
      }
    }
  }

  // 5 Stars Display under QR box
  const starY = 975;
  ctx.fillStyle = "#fbbf24";
  ctx.font = "46px sans-serif";
  ctx.fillText("★ ★ ★ ★ ★", width / 2, starY);

  // Feedback Pill Options Display
  ctx.fillStyle = "#fef3c7";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText("🌟 Excellent  ·  👍 Very Good  ·  ⚡ Pain Relief  ·  ❤️ Caring Service", width / 2, 1030);

  // Instructions
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px sans-serif";
  ctx.fillText("1. Open Smartphone Camera   2. Point at QR Code   3. Tap Link to Submit Rating", width / 2, 1100);

  // Footer Card
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.roundRect(80, 1160, width - 160, 160, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#fbbf24";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("100% Free Daily Therapy Movement in India", width / 2, 1205);

  ctx.fillStyle = "#e5e7eb";
  ctx.font = "17px sans-serif";
  ctx.fillText(centerName + " · Palasuni Square, Bhubaneswar 751010", width / 2, 1245);

  ctx.fillStyle = "#9ca3af";
  ctx.font = "15px sans-serif";
  ctx.fillText("Helpline / Toll-Free: 0674 291 6680 · WhatsApp: +91 91536 97636 · www.dooroomimediquip.com", width / 2, 1285);

  // Trigger browser download
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
