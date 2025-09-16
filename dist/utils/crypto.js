"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.encripta = encripta;
exports.decripta = decripta;
const crypto = __importStar(require("crypto"));
const key = Buffer.from('ABCDEFGHIJKLMNOPabcdefghijklmnop', 'utf-8');
const iv = Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex');
function encrypt(message) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv); //Cipher function
    var encryptedData = cipher.update(message, "utf-8", "hex"); //Encrypted message
    encryptedData += cipher.final("hex");
    return encryptedData.toString();
}
function decrypt(message) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    var decryptedData = decipher.update(message, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData.toString();
}
// Ensure your key is 32 bytes (256 bits) for AES-256
const ENCRYPTION_KEY = 'ABCDEFGHIJKLMNOPabcdefghijklmnop';
//crypto.randomBytes(32); // Use a securely generated key in a real application
const IV_LENGTH = 16; // For 'aes-256-cbc', the IV length is 16 bytes
/**
 * Encrypts a plaintext string using AES-256-CBC.
 * @param text The plaintext string to encrypt.
 * @returns A string containing the IV and encrypted data, separated by a colon.
 */
function encripta(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
/**
 * Decrypts an encrypted string using AES-256-CBC.
 * @param text The encrypted string (IV:encryptedData).
 * @returns The decrypted plaintext string.
 */
function decripta(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
