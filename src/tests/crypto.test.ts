
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

  test.only('should encrypt', async () => {
    const encrypted = crypto.encripta('André Fettermann');
    expect(encrypted).toBe('464c45306073c3eed23d08bb6bf384fa:930377a3c3c246ab85756c1b5f1fb434');
  });

  test.only('should decrypt', async () => {
    let encrypted = '5a2b463ff2718bae988d6b5bcf7c0978:816d16a6833604cc5bb08c6775a7bcec';
    const decrypted = crypto.decripta(encrypted);
    expect(decrypted).toBe('954.520.797-34');
  });
});
