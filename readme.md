## **Utilização**
 - para utilizar a api execute os passos a seguir: (recomendado o npm instalado na maquina e o typescript)
 - ``npm i`` - para baixar todas a dependencias e coisas necessárias para a api funcionar
 - ``npm run dev`` - para testar em local host
 - ``npm start`` - para executar em um servidor
 - necessário ter banco de dados mysql instalado na máquina
 - necessário configurar um arquivo .env com a variáveis de ambiente caso for utilizar em local host, caso for utilizar em servidor configurar as variáveis de ambiente no servidor.

## **Documentação das rotas**

### Rota de **LOGIN**

`/login`
- reponsavel por autenticar usuário
- tipo: **POST**
- a rota deve receber por body: `{ email, password }`

---

### Rotas de **USUÁRIO**

`/user`
- responsavel por criar um novo usuário.
- tipo: **POST**
- a rota deve receber por body: `{ nome, email, password }`

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
- a rota deve receber por body: `{ id, isAdmin }`
- header: `Authorization` com `token` do usuário

`/user/edit`
- responsavel por alterar informações pessoais do usuário
- tipo: **PUT**
- a rota deve receber por body: `{ id, name, email }`
- header: `Authorization` com `token` do usuário

`/user`
- responsavel por deletar um usuário
- tipo: **DELETE**
- somente para admin's
- a rota deve receber por body: `{ id }`
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
- a rota deve receber por body: `{ idUser, title, description, appointmentDate, appointmentTime }`

`/scheduling`
- responsavel por alterar o status do serviço
- tipo: **PUT**
- apenas para admin's
- a rota deve receber por body: `{ idScheduling, serviceStatus }`
- header: `Authorization` com `token` do usuário

`/scheduling/edit`
- responsavel por editar dados de um agendamento
- tipo: **PUT**
- a rota deve receber por body: `{ idScheduling, title, description, appointmentDate, appointmentTime }`
- header: `Authorization` com `token` do usuário

`/scheduling`
- responsavel por deletar um agendamento
- tipo: **DELETE**
- a rota deve receber por body: `{ id }`
- header: `Authorization` com `token` do usuário

---
### Rotas de **Serviços**

`/service`
- responsavel por listar todos os serviços
- tipo: **GET**
- apenas para admin's

`/service/:id`
- responsavel por listar os dados de um serviço
- tipo: **GET**

`/service`
- responsavel por criar um novo serviço
- tipo: **POST**
- apenas para admin's
- a rota deve receber por body: `{ name, description, price, location }`

`/service/edit`
- responsavel por editar dados de um serviço
- tipo: **PUT**
- apenas para admin's
- a rota deve receber por body: `{ id, name, description, price, location }`
- header: `Authorization` com `token` do usuário

`/scheduling`
- responsavel por deletar um agendamento
- tipo: **DELETE**
- apenas para admin's
- a rota deve receber por body: `{ id }`
- header: `Authorization` com `token` do usuário

---
## **Obs**
 - Na tabela de agendamentos o campo ``services`` serve para armazenar o id dos serviços selecionados pelo usuário ao agendar, porém os id's estão formatados em uma string só e separados um do outro através ``_/_``.
 - Case queire no momento de utilizar os dados desse campo como um array basta fazer: ``.split('_/_')`` e isso irá separar os id's novamente dentro de um array.

---

## **Variáveis de Ambiente**
- `API_PORT`
- `TYPEORM_CONNECTION`
- `TYPEORM_HOST`
- `TYPEORM_USERNAME`
- `TYPEORM_PASSWORD`
- `TYPEORM_DATABASE`
- `JWT_KEY`

## **Tecnologias Utilizadas**
- typescript
- node
- typeORM
- bcrypt
- date-fns
- jwt
- mysql
- cors
- ts-node-dev

## **Anotações sobre o banco de dados**

Caso de algum erro parecido com o abaixo:
    
    - Client does not support authentication protocol requested by server; consider upgrading MySQL client
Tente concertar com o comando mysql abaixo:

```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```
    
- Onde ```root``` como seu usuário localhostcomo seu URL e passwordcomo sua senha
- Após o comando acima execute: ```flush privileges```para que atualize os privilégios do usuario

_Desenvolvido com ❤ por Eduardo Junior ( Junior042 )_