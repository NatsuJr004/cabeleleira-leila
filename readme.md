## **Documentação das rotas**

### Rota de **LOGIN**

`/login`
- reponsavel por autenticar usuário
- tipo: **POST**
- dados a receber: `{ email, password }`

---

### Rotas de **USUÁRIO**

`/user`
- responsavel por criar um novo usuário.
- tipo: **POST**
- dados a receber: `{ nome, email, password }`

`/users`
- responsavel por listar todos os usuários.
- tipo: **GET**

`/users/:id`
- responsavel por listar os dados de um unico usuário
- tipo: **GET**

`/user`
- responsavel por alterar a permissão de admin.
- tipo: **PUT**
- somente para admin's
- dados a receber: `{ id, isAdmin }`
- header: `Authorization` com `token` do usuário

`/user/edit`
- responsavel por alterar informações pessoais do usuário
- tipo: **PUT**
- dados a receber: `{ id, name, email }`
- header: `Authorization` com `token` do usuário

`/user`
- responsavel por deletar um usuário
- tipo: **DELETE**
- somente para admin's
- dados a receber: `{ id }`
- header: `Authorization` com `token` do usuário

---

### Rotas de **AGENDAMENTO**

`/scheduling`
- responsavel por listar todos os agendamentos
- tipo: **GET**

`/scheduling/historic`
- lista os agendamentos do usuario apartir da ultima semana.
- tipo: **GET**

`/scheduling`
- responsavel por criar um novo agendamento
- tipo: **POST**
- dados a receber: `{ idUser, title, description, appointmentDate, appointmentTime }`

`/scheduling`
- responsavel por alterar o status do serviço
- tipo: **PUT**
- apenas para admin's
- dados a receber: `{ idScheduling, serviceStatus }`
- header: `Authorization` com `token` do usuário

`/scheduling/edit`
- responsavel por editar dados de um agendamento
- tipo: **PUT**
- dados a receber: `{ idScheduling, title, description, appointmentDate, appointmentTime }`
- header: `Authorization` com `token` do usuário

`/scheduling/edit`
- responsavel por deletar um agendamento
- tipo: **DELETE**
- dados a receber: `{ id }`
- header: `Authorization` com `token` do usuário

---

## **Anotações sobre o banco de dados**

Caso de algum erro parecido com o abaixo:
    
    - Client does not support authentication protocol requested by server; consider upgrading MySQL client
Tente concertar com o comando mysql abaixo:

```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```
    
- Onde ```root``` como seu usuário localhostcomo seu URL e passwordcomo sua senha
- Após o comando acima execute: ```flush privileges```para que atualize os privilégios do usuario