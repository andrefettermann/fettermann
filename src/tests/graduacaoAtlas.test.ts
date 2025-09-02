import * as repositorio from "../api/repositories/atlasAppRepository";
import { login, logout } from '../realmClient';

describe('Testes de acesso aos dados de graduacao pelo Atlas', () => {

  beforeAll(async () => {
    await login("", "")    
  });

  afterAll(async () => {
    await logout()
  })

  test('deveria retornar todas as graduacoes', async () => {
    try {
      const response: any = await repositorio.findAll('GetGraduacoes');
      expect(response.sucesso).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria retornar a graduacao pelo id', async () => {
    try {
      const response: any = await repositorio.find('GetGraduacao', '687ebd93337f4a6e6cc653ea');
      console.log(response)
      expect(response.result).toBe("Success");
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  })

  test('deveria incluir', async () => {
    var doc = {
      ordem: 99,
      nome: 'Inclusao pelo teste unitario',
      faixa: 'Inclusao pelo teste unitario',
      minimo_horas_treino_exame: 1000,
      minimo_tempo_exame: 1000,
      categoria: 'Adulto',
      observacoes: 'Inclusao pelo teste unitario',
    }

    try {
      const response: any = await repositorio.insert('PostGraduacao', doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });
  
  test.only('deveria alterar', async () => {
    const id = '68b7742b34bbeafac29a21fe';
    var doc = {
      ordem: 991,
      nome: 'Alterado pelo teste unitario',
      faixa: 'Alterado pelo teste unitario',
      minimo_horas_treino_exame: 1001,
      minimo_tempo_exame: 1001,
      categoria: 'Infantil',
      observacoes: 'Alterado pelo teste unitario',
    }

    try {
      const response: any = await repositorio.update('PatchGraduacao', id, doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      console.log(err);
      expect(err).toBeNull();
    }
  });
});
