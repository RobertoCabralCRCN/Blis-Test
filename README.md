# TestBlis

## Índice

- [Instalação](#instalação)
- [Teste Unitário](#teste-unitário)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Teste da Aplicação](#teste-da-aplicação)
- [Observações](#observações)
- [Itens Pendentes](#todo)

## Instalação

**Instalar repositório:**

- Ter docker e docker compose instalado

1. Acessar o diretório do projeto (TestBlis)

2. Executar o comando de instalação

```bash
$ npm install ou yarn (caso tenha instalado)
```

3. Executar o comando para subir a aplicação no docker

```bash
$ docker compose up -d
```

4. Após executar o comando acima, rodar as migrations para criação das tabelas

```bash
$ yarn typeorm migration:run ou npm run typeorm migration:run
```

## Teste unitário

**Após instalar as dependencias do projeto:**

1. Para rodar os testes unitários, após a instalação dos pacotes rodar o seguinte comando:

```bash
$ yarn test ou npm run test
```

6.1 Acessar coverage\lcov-report\index.html para verificar a cobertura

## Arquitetura do Projeto

```
  Projeto desenvolvido em Typescript.
  Foi criado utilizando a Arquitetura SOLID, DOCKER e DOCKER COMPOSE

  - Bibliotecas utilizadas
  . Express
  . TypeOrm
  . Tsyringe
  . Multer
  . Jest
  . etc

  - Banco de dados utilizado
  . Postgres

```

## Teste da Aplicação

**Para executar os testes da aplicação:**

1. Caso entenda necessário, pode ser feita a importação da collection para faciliar os testes:

```
Test-Blis.postman_collection.json
```

Endpoints da aplicação:

**User:**

- Esse método contempla a possibilidade de cadastrar um novo usuário.

- Create User -> POST

```bash

curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "birthdate": "1990-01-01"
}'

```

- Esse método contempla a possibilidade de logar com uma conta de usuário.

- Login -> POST

```bash

curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "john.doe@example.com",
  "password": "password123"
}'

```

**User-Document:**

- Esse método contempla a possibilidade de cadastrar o documento de um usuário logado.

- Create User-Document -> POST

```bash

curl --location 'http://localhost:3000/user-documents' \
--header 'Authorization: token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ5OTc2ODAsImV4cCI6MTczNTA4NDA4MCwic3ViIjoiZDk3YzM3OWItYTFlMS00MjcxLWE2ZGEtNDFlZjBmMDIyNmU1In0.zE6fvudgCuwWZ42BrndV28KneyymzxNbPxUqq5anqfc' \
--header 'Content-Type: application/pdf' \
--form 'user_id="d97c379b-a1e1-4271-a6da-41ef0f0226e5"' \
--form 'name="Comprovante.pdf"' \
--form 'file=@"/C:/Users/N2140/Downloads/Comprovante.pdf"'

```

**Abilities:**

- Esse método contempla a possibilidade de cadastrar uma nova habilidade.

- Create Abilities -> POST

```bash
curl --location 'http://localhost:3000/abilities' \
--header 'Content-Type: application/json' \
--header 'Authorization: token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ5OTc2ODAsImV4cCI6MTczNTA4NDA4MCwic3ViIjoiZDk3YzM3OWItYTFlMS00MjcxLWE2ZGEtNDFlZjBmMDIyNmU1In0.zE6fvudgCuwWZ42BrndV28KneyymzxNbPxUqq5anqfc' \
--data '{"name": "Desenvolvedor"}'


```

- Esse método contempla a possibilidade de atualizar uma habilidade.

- Update Abilities -> PUT

```bash
curl --location --request PUT 'http://localhost:3000/abilities/65b43f6e-c37b-409f-b496-3df44803ab30' \
--header 'Content-Type: application/json' \
--header 'Authorization: token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ5OTc2ODAsImV4cCI6MTczNTA4NDA4MCwic3ViIjoiZDk3YzM3OWItYTFlMS00MjcxLWE2ZGEtNDFlZjBmMDIyNmU1In0.zE6fvudgCuwWZ42BrndV28KneyymzxNbPxUqq5anqfc' \
--data '{"active": false}'

```

**User-Abilities:**

- Esse método contempla a possibilidade de cadastrar uma habilidade para um usuário.

- Create User-Abilities -> POST

```bash

curl --location 'http://localhost:3000/user-abilities' \
--header 'Content-Type: application/json' \
--header 'Authorization: token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ5OTg0NTIsImV4cCI6MTczNTA4NDg1Miwic3ViIjoiZDk3YzM3OWItYTFlMS00MjcxLWE2ZGEtNDFlZjBmMDIyNmU1In0._-ka59s8QG_40u0mdv7FRQ_OkZ4KlnUX2qomKT6CAwA' \
--data '{
  "user_id": "d97c379b-a1e1-4271-a6da-41ef0f0226e5",
  "ability_id": "65b43f6e-c37b-409f-b496-3df44803ab30",
  "years_experience": 3
}'

```

- Esse método contempla a possibilidade de listar habilidades de um usuário.

- List User-Abilities -> GET

```bash

curl --location 'http://localhost:3000/user-abilities/d97c379b-a1e1-4271-a6da-41ef0f0226e5?page=1&limit=10' \
--header 'Authorization: token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ5OTg0NTIsImV4cCI6MTczNTA4NDg1Miwic3ViIjoiZDk3YzM3OWItYTFlMS00MjcxLWE2ZGEtNDFlZjBmMDIyNmU1In0._-ka59s8QG_40u0mdv7FRQ_OkZ4KlnUX2qomKT6CAwA'

```

- Esse método contempla a possibilidade de deletar habilidade de um usuário.

- Delete User-Abilities -> DELETE

```bash

curl --location --request DELETE 'http://localhost:3000/user-abilities' \
--header 'Content-Type: application/json' \
--header 'Authorization: token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ5OTg0NTIsImV4cCI6MTczNTA4NDg1Miwic3ViIjoiZDk3YzM3OWItYTFlMS00MjcxLWE2ZGEtNDFlZjBmMDIyNmU1In0._-ka59s8QG_40u0mdv7FRQ_OkZ4KlnUX2qomKT6CAwA' \
--data '{
  "user_id": "d97c379b-a1e1-4271-a6da-41ef0f0226e5",
  "ability_ids": ["65b43f6e-c37b-409f-b496-3df44803ab30"]
}'

```

## Observações

Consegui colocar em prática os principais conceitos que aprendi ao longo dos
meus estudos / experiência com essas tecnologias, além do desafio de ter criado tudo do "zero".
Não fiz a publicação do projeto em ambiente cloud por ter expirado minha conta (versão gratuita) da AWS, porém,
Possuo experiência com arquitetura cloud, serverless, api gateway, criação de lambdas etc.

Ficaram faltando algumas melhorias e refatorações no código, considerando algumas regras de negócio:

O teste pede para que seja usado o prisma com mySQL, por um problema na minha maquina pessoal, por se tratar de um teste para ver o meu conhecimento com banco relacional, utilei o Postgres com TypeORM, porém tenho cohecimento do prisma e do mySQL.
Porém está integrado para utilizar o mySQL com prisma para mudança de ORM e banco.
Seria necessário criar as tabelas e migrações.

Testes unitários foram feitos de alguns métodos para mostrar que tenho conhecimento e prática em implementar os testes, então fica como ponto de melhoria implementar testes de todos os métodos.

Esse teste, foi feito com typescript puro, porém, poderia ser feito com nestJS, mas gostaria de mstrar que tenho conhecimentos de arquitetar uma aplicação sem depender de um framework auxiliar.

## TODO

```

. Método DELETE (deleção lógica) para os outros endpoints.
. Método para listar Usuários.
. Método para atualizar documentos de um usuário.
. Método para listar documentos de um usuário.
. Método par listar habilidades.

. Unit test de metodos faltantes.

Existem outras melhorias que podem ser feitas, porém listei as mais visiveis.

```
