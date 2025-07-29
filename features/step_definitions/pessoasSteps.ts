import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { assert } from 'chai'; // Or any other assertion library
import * as controller from '../../src/controllers/pessoaController';
import { db, close } from "../../src/db";

var totalEsperado = 0;
var totalObtido = 0;

var id = "";
var response: any;
var mes = "";

BeforeAll(async function () {
    await db;
});

AfterAll(async () => {
    close();
});

Given('que ha pessoas cadastradas', function() {
    totalEsperado = 5
});

Given('que ha pessoas ativas cadastradas', function() {
    totalEsperado = 5
});

Given('que ha pessoas inativas cadastradas', function() {
    totalEsperado = 2
});

Given('uma pessoa cadastrada com o id {string}', function(oId: string){
    id = oId;
});

Given('que ha aniversariantes do mes {string} cadastrados', function(oMes: string){
    mes = oMes;
    totalEsperado = 2;
});

When('eu solicito a lista de pessoas cadastradas', async function () {
    response = await controller.buscaTodos();
    totalObtido = response.length;
});

When('eu solicito a lista de pessoas ativas cadastradas', async function () {
    response = await controller.buscaPorSituacao('Ativo');
    totalObtido = response.length;
});

When('eu solicito a lista de pessoas inativas cadastradas', async function () {
    response = await controller.buscaPorSituacao('Inativo');
    totalObtido = response.length;
});

When('eu solicito a lista de aniversariantes do mes cadastrados', async function () {
    response = await controller.buscaPorAniversarioMes(mes);
    totalObtido = response.length;
});

When('eu solicito os dados desta pessoa', async function () {
    response = await controller.buscaPorId(id);
});

Then('deveria ser retornada uma lista com todas as pessoas cadastradas', function () {
    assert.equal(totalObtido, totalEsperado);
});

Then('deveria ser retornada uma lista com todas as pessoas ativas cadastradas', function () {
    assert.equal(totalObtido, totalEsperado);
});

Then('deveria ser retornada uma lista com todos os aniversariantes do mes cadastrados', function () {
    assert.equal(totalObtido, totalEsperado);
});

Then('deveria ser retornada uma lista com todas as pessoas inativas cadastradas', function () {
    assert.equal(totalObtido, totalEsperado);
});

Then('o nome desta pessoa deveria ser {string}', function (oNome: string) {
    const doc = response;
    assert.equal(oNome, doc.nome);
});