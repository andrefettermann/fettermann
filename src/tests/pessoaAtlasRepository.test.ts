import { PessoaRepository } from '../repositories/pessoaRepository'; 
import { login, logout } from '../realmClient';
import { encripta } from '../utils/crypto';

describe('Pessoas repository com Atlas Functions', () => {

  var repositorio: PessoaRepository

  beforeAll(async () => {
    await login("", "")
    repositorio = new PessoaRepository();
  });

  afterAll(async () => {
    await logout()
  })

  test('deveria retornar todas as pessoas', async () => {
    try {
      const response: any = await repositorio.findall();
      expect(response.success).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria retornar os aniversariantes do mes informado', async () => {
    try {
      const response: any = await repositorio.findByAniversario(8);
      console.log(response)
      expect(response.success).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria retornar as pessoas em atividade', async () => {
    try {
      const response: any = await repositorio.findBySituacao('Ativo');
      console.log(response)
      expect(response.success).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria retornar a pessoa pelo id', async () => {
    try {
      const response: any = await repositorio.find('68836238624ac36ce1d37dac');
      console.log(response)
      expect(response.success).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria incluir uma pessoa', async () => {
    const dados = {
      aniversario: '01/01',
      matricula: '',
      nome: encripta('Teste unitario'),
      situacao: 'Ativo',
      cpf: encripta('123.456.789-10'),
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      pagamentos: [],
      promocoes: [],
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ecaa2e04853cb4ac79b8c'
    }

    try {
      const response: any = await repositorio.insert(dados);
      console.log(response)
      expect(response.success).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test.only('deveria atualizar uma pessoa', async () => {
    const dados = {
      aniversario: '02/02',
      matricula: '',
      nome: encripta('Teste unitario de alteracao'),
      situacao: 'Ativo',
      cpf: encripta('123.456.789-10'),
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      pagamentos: [],
      promocoes: [],
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ecaa2e04853cb4ac79b8c'
    }

    try {
      const response: any = await repositorio.update('68afbb081f53025a4fa19440', dados);
      console.log(response)
      expect(response.success).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })
});
