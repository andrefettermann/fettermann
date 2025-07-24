// tests/userController.test.ts
import { db, close } from "../db";
import { createGraduacao, getGraduacao, getGraduacoes, updateGraduacao } from "../repositories/graduacaoRepository";
import Graduacao from "../models/graduacao";

describe('Pessoa repository', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('should insert', async () => {
    var newGraduacao = new Graduacao(1, '6º Kyu');
    newGraduacao.setFaixa("Faixa branca")

    const response = await createGraduacao(newGraduacao);
    expect(response.status).toBe("Success");
  });

  test.only('should update', async() => {
    var newGraduacao = new Graduacao(2, '5º Kyu');
    newGraduacao.setFaixa("Faixa amarela");
    newGraduacao.setId('687ec6bc10e2e2d26cec38bc');

    const response = await updateGraduacao(newGraduacao.getId(), newGraduacao);

    expect(response.status).toBe('Success');
  });

  test('should return one', async () => {
    const response = await getGraduacao('687ebd93337f4a6e6cc653ea');
    expect(response.nome).toBe('6º Kyu');
  })

  test('should return everybody', async () => {
    const response = await getGraduacoes();
    expect(response).not.toBeNull();
  });

});
