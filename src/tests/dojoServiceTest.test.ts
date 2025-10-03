import { db, close } from "../db";
import * as servico from "../servicos/dojoServico";


describe('Dojos service', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('deveria retornar todos os dojos', async () => {
      try {
        const response: any = await servico.buscaTodos();
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test.only('deveria retornar o dojo do id informado', async() => {
    try {
      const response: any = await servico.busca('688bf0813442bec3d424acee')
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

});