// tests/userController.test.ts
import Pagamento from "../models/pagamento";
import { db, close } from "../db";
import Pessoa from "../models/pessoa";
import { createPessoa, getPessoas, getPessoasAniversario, getPessoasSituacao, updatePessoa } from "../repositories/pessoaRepository";
import Promocao from "../models/promocao";
import * as crypto from "../utils/crypto";

describe('Pessoa repository', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('should insert', async () => {
    var newPessoa = new Pessoa(crypto.encripta('André Fettermann'), 'Ativo');
    newPessoa.setAniversario('06/12');
    newPessoa.setCpf(crypto.encripta('95452079734'));
    newPessoa.setDataInicio('10/94');
    newPessoa.setMatricula('6534');

    var pagamento = new Pagamento();
    pagamento.setData(new Date('2024-10-01T00:00:00.000+00:00'));
    pagamento.setValorDevido(190.0);
    pagamento.setValorPago(190.0);
    pagamento.setDescricao('Anuidade FEPAI 2024');
    newPessoa.addPagamento(pagamento);

    var promocao = new Promocao();
    promocao.setData(new Date('2008-08-24T00:00:00.000+00:00'));
    promocao.setGraduacao('Shodan');
    newPessoa.addPromocao(promocao);

    promocao = new Promocao();
    promocao.setData(new Date('2013-08-18T00:00:00.000+00:00'));
    promocao.setGraduacao('Nidan');
    newPessoa.addPromocao(promocao);

    promocao = new Promocao();
    promocao.setData(new Date('2018-08-25T00:00:00.000+00:00'));
    promocao.setGraduacao('Sandan');
    newPessoa.addPromocao(promocao);

    promocao = new Promocao();
    promocao.setData(new Date('2023-08-19T00:00:00.000+00:00'));
    promocao.setGraduacao('Yodan');
    newPessoa.addPromocao(promocao);

    const response = await createPessoa(newPessoa);
    expect(response.status).toBe("Success");
  });

  test('should update', async() => {
    //const response = await updatePessoa('', newPessoa);
  });

  test('deveria retornar todas as pessoas cadastradas', async () => {
    const pessoas = await getPessoas();
    expect(pessoas).not.toBeNull();
  });

  test('deveria retornar as pessoas em atividade', async () => {
    const pessoas = await getPessoasSituacao('Ativo')
    expect(pessoas.data?.length).toBe(5);
  });

  test('deveria retornar as pessoas sem atividade', async () => {
    const pessoas = await getPessoasSituacao('Inativo')
    expect(pessoas.data?.length).toBe(0);
  });

  test.only('deveria retornar os aniversariantes', async () => {
    const response = await getPessoasAniversario('11');
    expect(response.data?.length).toBe(0);
  });

});
