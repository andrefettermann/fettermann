// tests/userController.test.ts
import { db, close } from "../db";
import * as repositorio from "../repositories/apiPessoaRepository";
import * as crypto from "../utils/crypto";

describe('Pessoa repository', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('should insert', async () => {
//    expect(response.status).toBe("Success");
  });

  test('should update', async() => {
    //const response = await updatePessoa('', newPessoa);
  });

  test('deveria retornar todas as pessoas cadastradas', async () => {
    try {
      const pessoas = await repositorio.getPessoas();
      expect(pessoas.length).toBe(5);
    } catch (err) {
      fail(err);
    }
  });

  test.only('deveria retornar as pessoas em atividade', async () => {
    try {
      const pessoas = await repositorio.getPessoasSituacao('Ativo')
      expect(pessoas.length).toBe(5);
    } catch (err) {
      console.log(err);
    }
  });

  test.only('deveria retornar as pessoas sem atividade', async () => {
    try {
      const pessoas = await repositorio.getPessoasSituacao('Inativo')
      expect(pessoas.length).toBe(0);
    } catch (err) {
      console.log(err);
    }
  });

  test.only('deveria retornar os aniversariantes', async () => {
    try {
      const pessoas = await repositorio.getPessoasAniversario('11');
      expect(pessoas.length).toBe(0);
    } catch (err) {
      console.log(err);
    }
  });

});
