## a fazeres:
[] autenticação
[] tratamento de erros
[] login
[] utilizar date-fns para verificação de datas e horas
[] implementar função de alteração apenas após dois dias da alteração anterior
[] etc...

## Anotações sobre o banco de dados

caso de algum erro parecido com o abaixo:
    
    - Client does not support authentication protocol requested by server; consider upgrading MySQL client
Tente concertar com o comando mysql abaixo:

```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```
    
- Onde ```root``` como seu usuário localhostcomo seu URL e passwordcomo sua senha
- Após o comando acima execute: ```flush privileges```para que atualize os privilégios do usuario