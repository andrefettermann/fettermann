// tests/userController.test.ts
import { db, close } from "../db";
import * as repositorio from "../repositories/apiPessoaRepository";

describe('Pessoa repository', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('nao deveria incluir pessoa sem os dados obrigatorios', async () => {
    const doc = {
      'aniversario': '',
      'matricula': '',
      'nome': '',
      'situacao': '',
      'cpf': '',
      'data_inicio_aikido': '',
      'data_matricula': '',
      'codigo_dojo': '',
      'graduacao_atual': '',
      'pagamentos': [],
      'promocoes': []
    };

    try {
      const response: any = await repositorio.createPessoa(doc);
      expect(response._id).toBeNull();
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });

  test('deveria incluir uma pessoa', async () => {
    const doc = {
      'aniversario': '14/01',
      'matricula': '6327',
      'nome': 'XXX',
      'situacao': 'Inativo',
      'cpf': '',
      'data_inicio_aikido': '03/11/2013',
      'data_matricula': '03/11/2013',
      'codigo_dojo': '',
      'graduacao_atual': '1° Kyu',
      'pagamentos': [],
      'promocoes': []
    };

    try {
      const response: any = await repositorio.createPessoa(doc);
      expect(response._id).not.toBeNull();
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });

  test('should update', async() => {
    //const response = await updatePessoa('', newPessoa);
  });

  test('deveria retornar todas as pessoas cadastradas', async () => {
    try {
      const pessoas: any = await repositorio.getPessoas();
      expect(pessoas.length).toBe(5);
    } catch (err) {
      console.log(err);
    }
  });

  test('deveria retornar as pessoas em atividade', async () => {
    try {
      const pessoas: any = await repositorio.getPessoasSituacao('Ativo')
      expect(pessoas.length).toBe(5);
    } catch (err) {
      console.log(err);
    }
  });

  test('deveria retornar as pessoas sem atividade', async () => {
    try {
      const pessoas: any = await repositorio.getPessoasSituacao('Inativo')
      expect(pessoas.length).toBe(0);
    } catch (err) {
      console.log(err);
    }
  });

  test('deveria retornar os aniversariantes', async () => {
    try {
      const pessoas: any = await repositorio.getPessoasAniversario('11');
      expect(pessoas.length).toBe(0);
    } catch (err) {
      console.log(err);
    }
  });

  test.only('deveria retornar os alunos de um dojo', async () => {
    try {
      const pessoas: any = await repositorio.getPessoasDojo('688bf3b6670789903d6d15e4');
      expect(pessoas.length).toBe(2);
    } catch (err) {
      console.log(err);
    }
  });

  test('deveria retornar uma pessoa pelo id', async () => {
    try {
      const pessoa: any = await repositorio.getPessoa('68836238624ac36ce1d37dac');
      expect(pessoa.nome).toBe('2b6a1600aa0286cd252fdd9f5d825489:edd3d1b029cdeac6b1a347ab9f14c55958f32e155571a9ce11a650234c21a512');
    } catch (err) {
      console.log(err);
    }
  });
});
