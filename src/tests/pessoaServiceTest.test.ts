import { db, close } from "../db";
import * as servico from "../servicos/pessoaServico";


describe('Pessoas service', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('deveria retornar todas as pessoas', async () => {
      try {
        const response: any = await servico.buscaTodos();
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test.only('deveria retornar a pessoa do id informado', async() => {
    try {
      const response: any = await servico.busca('6876d21a80066b9538e06444')
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

});