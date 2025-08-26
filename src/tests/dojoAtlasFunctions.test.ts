import * as repositorio from "../repositories/dojoRepository";
import { login, logout } from '../realmClient';

// npm test dojoAtlasFunctions.test

describe('Dojos repository com Atlas Functions', () => {

  beforeAll(async () => {
    await login("", "")
    
  });

  afterAll(async () => {
    await logout()
  })

  test('deveria retornar todos os dojos', async () => {
    try {
      const response: any = await repositorio.getDojos();
      expect(response.sucess).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria retornar o dojo pelo id', async () => {
    try {
      const response: any = await repositorio.getDojo('68acfce3dd14e40a73a6eb54');
      expect(response.sucess).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test.only('deveria incluir', async () => {
    var doc = {
      nome: 'Teste de inclusao com sucesso',
      endereco: 'Teste',
      cidade: 'Teste',
      uf: 'RJ',
      pais: 'BR',
      url: 'wwww',
      email: '@email',
      horarios: [],
      id_professor: '6876d21a80066b9538e06444'
    }

    try {
      const response: any = await repositorio.createDojo(doc);
      console.log(response);
      expect(response.sucess).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });


});
