
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

  test('deveria retornar todas as graduacoes', async () => {
    try {
      const response: any = await repositorio.findAll();
      expect(response.result).toBe("Success");
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test.only('deveria retornar a graduacao pelo id', async () => {
    try {
      const response: any = await repositorio.find('687ebd93337f4a6e6cc653ea');
      console.log(response)
      expect(response.result).toBe("Success");
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

});
