import * as repositorio from "../repositories/dojoRepository";
import { login, logout } from '../realmClient';

describe('Dojos repository com Atlas Functions', () => {

  beforeAll(async () => {
    await login("", "")
  });

  afterAll(async () => {
    await logout()
  })

  test.only('deveria retornar todos os dojos', async () => {
    try {
      const response: any = await repositorio.getDojos();
      expect(response.result).toBe("Success");
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })
});
