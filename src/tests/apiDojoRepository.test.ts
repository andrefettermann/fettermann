import { db, close } from "../db";
import * as repositorio from "../api/repositories/apiDojoRepository";

describe('Dojos repository', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('deveria retornar um dojo pelo id', async () => {
    try {
      const response: any = await repositorio.getDojo('687ebd93337f4a6e6cc653ea');
      console.log(response);
      expect(response.nome).toBe('6º Kyu');
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test.only('deveria retornar todos os dojos', async () => {
    try {
      const response: any = await repositorio.getDojos();
      expect(response.length).toBe(5);
    } catch (err) {
      expect(err).toBeNull();
    }
  })
});
