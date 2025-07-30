Feature: Lista de pessoas

# npm run test:cucumber features/pessoas_list.feature --tags '@list_01'
# npx cucumber-js features/pessoas_list.feature --tags '@list_01' <==

@find_all
Scenario: Busca todas as pessoas cadastradas
    Given que ha pessoas cadastradas
    When eu solicito a lista de pessoas cadastradas
    Then deveria ser retornada uma lista com todas as pessoas cadastradas

@find_one
Scenario: Busca a pessoa pelo id
    Given uma pessoa cadastrada com o id '6876d21a80066b9538e06444'
    When eu solicito os dados desta pessoa
    Then o nome desta pessoa deveria ser 'Andre Fettermann'

@find_ativos
Scenario: Busca as pessoas na situacao ativo
    Given que ha pessoas ativas cadastradas
    When eu solicito a lista de pessoas ativas cadastradas
    Then deveria ser retornada uma lista com todas as pessoas ativas cadastradas

@find_inativos
Scenario: Busca as pessoas na situacao inativo
    Given que ha pessoas inativas cadastradas
    When eu solicito a lista de pessoas inativas cadastradas
    Then deveria ser retornada uma lista com todas as pessoas inativas cadastradas

@find_aniversariantes
Scenario: Busca os aniversariantes do mes
    Given que ha aniversariantes do mes '12' cadastrados
    When eu solicito a lista de aniversariantes do mes cadastrados
    Then deveria ser retornada uma lista com todos os aniversariantes do mes cadastrados
