import { PessoaRepository } from '../repositories/pessoaRepository'; 
import { login, logout } from '../realmClient';

describe('Pessoas repository com Atlas Functions', () => {

  var repositorio: PessoaRepository

  beforeAll(async () => {
    await login("", "")
    repositorio = new PessoaRepository();
  });

  afterAll(async () => {
    await logout()
  })

  test.only('deveria retornar todas as pessoas', async () => {
    try {
      const response: any = await repositorio.getPessoas();
      expect(response.result).toBe("Success");
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })
});
