import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { assert } from 'chai'; // Or any other assertion library
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
    //obtem o total de pessoas cadastradas
    return('Pendente de implementacao');
});

Given('que ha pessoas ativas cadastradas', function() {
    //obtem o total de pessoas ativas cadastradas
    return('Pendente de implementacao');
});

Given('que ha pessoas inativas cadastradas', function() {
    //obtem o total de pessoas inativas cadastradas
    return('Pendente de implementacao');
});

Given('uma pessoa cadastrada com o id {string}', function(oId: string){
    // registra o id a ser buscado
    return('Pendente de implementacao');
});

Given('que ha aniversariantes do mes {string} cadastrados', function(oMes: string){
    // registra o mes a ser buscado e obtem o total de aniversariantes no mes
    return('Pendente de implementacao');
});

When('eu solicito a lista de pessoas cadastradas', async function () {
    // busca a lista de pessoas cadastradas
    return('Pendente de implementacao');
});

When('eu solicito a lista de pessoas ativas cadastradas', async function () {
    // busca a list de pessoas ativas cadastradas
    return('Pendente de implementacao');
});

When('eu solicito a lista de pessoas inativas cadastradas', async function () {
    // busca a lista de pessoas inativas cadastradas
    return('Pendente de implementacao');
});

When('eu solicito a lista de aniversariantes do mes cadastrados', async function () {
    // busca a lista de aniversariantes do mes
    return('Pendente de implementacao');
});

When('eu solicito os dados desta pessoa', async function () {
    // busca a pessoa cadastrada
    return('Pendente de implementacao');
});

/**
 * Then
 */

Then('deveria ser retornada uma lista com todas as pessoas cadastradas', function () {
    // verifica o total retornado com o total cadastrado
    //assert.equal(totalObtido, totalEsperado);
    return('Pendente de implementacao');
});

Then('deveria ser retornada uma lista com todas as pessoas ativas cadastradas', function () {
    // verifica o total retornado com o total cadastrado
    //assert.equal(totalObtido, totalEsperado);
    return('Pendente de implementacao');
});

Then('deveria ser retornada uma lista com todos os aniversariantes do mes cadastrados', function () {
    // verifica o total retornado com o total cadastrado
    //assert.equal(totalObtido, totalEsperado);
    return('Pendente de implementacao');
});

Then('deveria ser retornada uma lista com todas as pessoas inativas cadastradas', function () {
    // verifica o total retornado com o total cadastrado
    //assert.equal(totalObtido, totalEsperado);
    return('Pendente de implementacao');
});

Then('o nome desta pessoa deveria ser {string}', function (oNome: string) {
    // verifica o nome retornado com o nome cadastrado
    // const doc = response;
    // assert.equal(oNome, doc.nome);
    return('Pendente de implementacao');
});