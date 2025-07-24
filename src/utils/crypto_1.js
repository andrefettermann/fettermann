//import { createCipheriv, createDecipheriv } from "crypto";

var crypto = require('crypto');

const key = Buffer.from('ABCDEFGHIJKLMNOPabcdefghijklmnop', 'utf-8');
const iv = Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex');

function encrypt(message) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv); //Cipher function
  let encryptedData = cipher.update(message, "utf-8", "hex");   //Encrypted message

  encryptedData += cipher.final("hex");

  return encryptedData.toString("base64");
}

function decrypt(message) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedData = decipher.update(message, "hex", "utf-8");

  decryptedData += decipher.final("utf8");
  
  return decryptedData.toString("base64");
}

module.exports = { encrypt, decrypt }