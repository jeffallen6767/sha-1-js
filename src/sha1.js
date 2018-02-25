/*
sha-1-js

adapted from: https://en.wikipedia.org/wiki/SHA-1#Examples_and_pseudocode
author: Jeffrey David Allen
created: Sunday, Feb 25th, 2018
github: https://github.com/jeffallen6767/sha-1-js
website: http://jdallen.net/

Note 1: All variables are 32 bit unsigned integers and addition is calculated modulo 2^32
*/

function sha1(input, next) {

  var output = "**not yet implemented**";

  // allow sync or async:
  return "function" === typeof next ? next(output) : output;
}

module.exports = sha1;
