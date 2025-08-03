Feature: Inclui pessoas

# npm run test:cucumber features/pessoas_list.feature --tags '@list_01'
# npx cucumber-js features/pessoas_list.feature --tags '@list_01' <==

@inclusao_01
Scenario: Dados obrigatorios
    Given que ha uma pessoa a ser incluida
    And que os dados obrigatorios desta pessoa nao foram informados
    When os dados sao gravados
    Then deveria ser solicitado que os dados obrigatorios sejam informados
    And os dados desta pessoa nao deveriam ser gravados

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
