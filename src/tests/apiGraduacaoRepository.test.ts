// tests/userController.test.ts
import { db, close } from "../db";
import * as repositorio from "../repositories/apiGraduacaoRepository";

describe('Pessoa repository', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('should insert', async () => {
    /*
    var newGraduacao = new Graduacao(1, '6º Kyu');
    newGraduacao.setFaixa("Faixa branca")

    const response = await createGraduacao(newGraduacao);
    expect(response.status).toBe("Success");
    */
  });

  test('should update', async() => {
    /*
    var newGraduacao = new Graduacao(2, '5º Kyu');
    newGraduacao.setFaixa("Faixa amarela");
    newGraduacao.setId('687ec6bc10e2e2d26cec38bc');

    const response = await updateGraduacao(newGraduacao.getId(), newGraduacao);

    expect(response.status).toBe('Success');
    */
  });

  test.only('deveria retornar uma graduacao pelo id', async () => {
    try {
      const response: any = await repositorio.getGraduacao('687ebd93337f4a6e6cc653ea');
      expect(response.nome).toBe('6º Kyu');
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria retornar todas as graduacoes', async () => {
    try {
      const graduacoes: any = await repositorio.getGraduacoes();
      expect(graduacoes.length).toBe(11);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

});
