/*
sha-1-js

adapted from: https://en.wikipedia.org/wiki/SHA-1#Examples_and_pseudocode
author: Jeffrey David Allen
created: Sunday, Feb 25th, 2018
github: https://github.com/jeffallen6767/sha-1-js
website: http://jdallen.net/

Note 1: All variables are unsigned 32-bit quantities and wrap modulo 2^32 when calculating, except for
        ml, the message length, which is a 64-bit quantity, and
        hh, the message digest, which is a 160-bit quantity.

Note 2: All constants in this code are in big endian.
        Within each word, the most significant byte is stored in the leftmost byte position
*/


var 
  BYTE_SIZE = 8,
  WORD_SIZE_BYTES = 4,
  HEX_SIZE = 16,
  CHUNK_WORD_SIZE = HEX_SIZE * 5,
  U_INT_32_SIZE = 32,
  PAD_START_DEC_VAL = 128,
  BLOCK_SIZE_BYTES = 64,
  BYTE_MULT_32_1 = 16777216,
  BYTE_MULT_32_2 = 65536,
  BYTE_MULT_32_3 = 256,
  MIN_PAD_BYTES = 1,
  MSG_SIZE_BYTES = 8,
  MIN_PRE_CALC_BYTES = MIN_PAD_BYTES + MSG_SIZE_BYTES,
  ZERO_BITS_4_BYTES = "00000000",
  ZERO_BITS_8_BYTES = ZERO_BITS_4_BYTES + ZERO_BITS_4_BYTES;

function toHex(uInt32) {
  var 
    hex = uInt32.toString(HEX_SIZE),
    len = hex.length;
  return len < BYTE_SIZE ? ZERO_BITS_4_BYTES.substr(len) + hex : hex;
}

function leftRotate(x, c) {
  return (x << c) | (x >>> (U_INT_32_SIZE-c));
}

function getInputBuffer(input) {
  
  var 
    // calc # of chars + 0x80 [1000 0000] + 64bit length of msg in bits
    inputBytes = input.length,
    preProcessOffsetBytes = (inputBytes + MIN_PRE_CALC_BYTES) % BLOCK_SIZE_BYTES,
    preProcessZeroPadBytes = preProcessOffsetBytes ? BLOCK_SIZE_BYTES - preProcessOffsetBytes : preProcessOffsetBytes,
    preProcessBlockWidth = inputBytes + MIN_PRE_CALC_BYTES + preProcessZeroPadBytes,
    
    // prepare buffer
    isbuffer = Buffer.isBuffer(input),
    buffer = isbuffer ? Buffer.allocUnsafe(preProcessBlockWidth-inputBytes) : new Array(preProcessBlockWidth),
    
    // calc 8 byte size:
    inputSizeInBits = inputBytes * BYTE_SIZE,
    sizeBytes = inputSizeInBits.toString(HEX_SIZE),
    hexSize = ZERO_BITS_8_BYTES.substr(sizeBytes.length) + sizeBytes,

    // big-endian size:
    arrHexSize = hexSize.split(""),
    // index
    x = 0,
    y;

  // add message
  if (!isbuffer) {
    for (x=0; x<inputBytes; x++) {
      buffer[x] = input.charCodeAt(x);
    }
  }
  
  // add 1st pad byte:
  buffer[x++] = PAD_START_DEC_VAL;
  
  // add zero pad fill:
  for (y=0; y<preProcessZeroPadBytes; y++) {
    buffer[x++] = 0;
  }

  // add size:
  while (arrHexSize.length > 0) {
    y = arrHexSize.shift() + arrHexSize.shift();
    buffer[x++] = parseInt(y, HEX_SIZE);
  }
  
  // finalize buffer prep
  if (isbuffer) {
    buffer = Buffer.concat([input, buffer], preProcessBlockWidth);
  }
  
  return {
    "width": preProcessBlockWidth, 
    "buffer": buffer
  };
}

function sha1(input, next) {

  var 
    inputBuffer = getInputBuffer(input),
    buffer = inputBuffer.buffer,
    width = inputBuffer.width,
    
    h0 = 0x67452301,
    h1 = 0xEFCDAB89,
    h2 = 0x98BADCFE,
    h3 = 0x10325476,
    h4 = 0xC3D2E1F0,
    
    words,
    
    a,b,c,d,e,
    
    f,k,
    
    x,y,z,
    
    output = "**not yet implemented**";
  
  // Process the message buffer in successive 512-bit chunks:
  for (x=0; x<width; x+=BLOCK_SIZE_BYTES) {

    // break chunk into sixteen 32-bit word values words[z], 0 ≤ z ≤ 15
    words = new Array(CHUNK_WORD_SIZE);
    for (z=0; z<HEX_SIZE; z++) {
      y = x + z * WORD_SIZE_BYTES;
      // calc big-endian word value from 4 bytes in buffer:
      words[z] = buffer[y] * BYTE_MULT_32_1 + buffer[y+1] * BYTE_MULT_32_2 + buffer[y+2] * BYTE_MULT_32_3 + buffer[y+3];
    }
    
    // Extend the sixteen 32-bit words into eighty 32-bit words, 16 ≤ z ≤ 79
    for (z=HEX_SIZE; z<CHUNK_WORD_SIZE; z++) {
      words[z] = leftRotate(words[z-3] ^ words[z-8] ^ words[z-14] ^ words[z-16], 1);
    }
    
    // Initialize hash value for this chunk:
    a = h0
    b = h1
    c = h2
    d = h3
    e = h4
    
    // Main loop:
    for (y=0; y<CHUNK_WORD_SIZE; y++) {
      
      //  The four round constants k are 2^30 times the square roots of 2, 3, 5 and 10. 
      if (y < 20) {
        f = (b & c) | ((~ b) & d);
        k = 0x5A827999;
      } else if (y < 40) {
        f = b ^ c ^ d;
        k = 0x6ED9EBA1;
      } else if (y < 60) {
        f = (b & c) | (b & d) | (c & d);
        k = 0x8F1BBCDC;
      } else {
        f = b ^ c ^ d;
        k = 0xCA62C1D6;
      }
      
      // calc and mix
      z = leftRotate(a, 5) + f + e + k + words[y];
      e = d;
      d = c;
      c = leftRotate(b, 30);
      b = a;
      a = z;
      
    }
    
    // Add this chunk's hash to result so far:
    h0 = (h0 + a) >>> 0;
    h1 = (h1 + b) >>> 0;
    h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0;
  }
  
  //Produce the final hash value (big-endian) as a 160-bit number:
  output = [h0, h1, h2, h3, h4].map(toHex).join("");
  
  // allow sync or async:
  return "function" === typeof next ? next(output) : output;
}

module.exports = sha1;
