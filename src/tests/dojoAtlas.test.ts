import * as repositorio from "../repositories/atlasAppRepository";
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
      const response: any = await repositorio.findAll('GetDojos');
      expect(response.sucesso).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test.only('deveria retornar o dojo pelo id', async () => {
    try {
      const response: any = await repositorio.find('GetDojo', '68acfce3dd14e40a73a6eb54');
      expect(response.sucesso).toBe(true);
    } catch (err) {
      console.log(err);
    }
  })

  test('deveria incluir', async () => {
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
      const response: any = await repositorio.insert('PostDojo', doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });

  test('deveria alterar', async () => {
    var doc = {
      nome: 'Teste de alteracao com sucesso',
      endereco: 'Teste 2',
      cidade: 'Teste',
      uf: 'RJ',
      pais: 'BR',
      url: 'wwww',
      email: '@email',
      horarios: [],
      id_professor: '6876d21a80066b9538e06444'
    }

    try {
      const response: any = await repositorio.update('PatchDojo', '68acfce3dd14e40a73a6eb54', doc);
      console.log(">>>>> " + response.sucesso)
      expect(response.sucesso).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });

});
