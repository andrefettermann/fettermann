
import graduacaoRepository from '../repositories/graduacaoRepository';
import { login, logout } from '../realmClient';

describe('graduacaoAtlasFunctionsTest', () => {

  var repositorio: graduacaoRepository;

  beforeAll(async () => {
    repositorio = new graduacaoRepository();
    await login("", "")
  });

  afterAll(async () => {
    await logout()
  })

  test.only('deveria retornar todas as', async () => {
    try {
      const response: any = await repositorio.getGraduacoes();
      expect(response.result).toBe("Success");
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

});
