// tests/userController.test.ts
import { db, close } from "../db";
import Pessoa from "../models/pessoa";
import * as crypto from "../utils/crypto";

describe('Pessoa repository', () => {

  test('should encrypt and decrypt', async () => {
    const encrypted = crypto.encrypt('André Fettermann de Andrade');
    const decrypted = crypto.decrypt(encrypted);
    expect(decrypted).toBe('André Fettermann de Andrade');
  });

  test('should decrypt', async () => {
    let encrypted = '0f7a7d5ba20b93fc16f533d655f7431a8c3a27a9ab4c4a80a6d41caf9c3f5ea2';
    const decrypted = crypto.decrypt(encrypted);
    expect(decrypted).toBe('André Fettermann');
  });

  test('should encrypt and decrypt', async () => {
    const encrypted = crypto.encripta('André Fettermann');
    console.log(encrypted)
    const decrypted = crypto.decripta(encrypted);
    expect(decrypted).toBe('André Fettermann');
  });

  test.only('should decrypt', async () => {
    let encrypted = 'b78e7f73fb50691202de0824619f0634:7bdbcdaacbee5273c4db01aff1e418e67569ac5ca34d290e2423639d97b316a1';
    const decrypted = crypto.decripta(encrypted);
    expect(decrypted).toBe('André Fettermann');
  });
});
