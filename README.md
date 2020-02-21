
# Números para Palavras (testeCerti)

Números para Palavras é uma API REST em Node.js que recebe números inteiros e retorna os mesmos números em extenso em Português no formato JSON.

Foi um desafio técnico para a Fundação CERTI, em Flórianópolis.

## Dependências

- Node.js
- Yarn
- Express

## Instalação

### Opção 1: Instalação sem dependências locais

**Pré-requisitos:** [Docker](https://docs.docker.com/install/) instalado e ativo, conexão com a Internet.

Execute o comando a seguir em um terminal para baixar a imagem do [DockerHub](https://hub.docker.com/repository/docker/pmtelli/testecerti/):

```docker
docker pull pmtelli/testecerti:tagname
```

Após isso, execute o seguinte comando para rodar o container Docker:

```docker
docker run -p 3000:3000 pmtelli/testecerti:tagname
```

---

### Opção 2: Instalação com dependências locais

**Pré-requisitos:** [Node.js](https://nodejs.org/en/download/) e [Yarn](https://yarnpkg.com), conexão com a Internet.

Primeiramente, clone ou baixe este repositório. Na pasta do projeto, execute o comando ```yarn``` para instalar dependências locais. Depois, execute o comando ```yarn start``` para iniciar o servidor Node.js.

## Uso

Para enviar números pro sistema, é preciso enviá-los após a URL ```localhost:3000/``` .

```json
 //localhost:3000/-3500
 {"extenso": "menos três mil e quinhentos"}

//localhost:3000/55001
{"extenso": "cinquenta e cinco mil e um"}
```

São suportados números inteiros de -99999 até 99999. 

```json
http://localhost:3000/-99991.93
{"error": "Não é um número inteiro!"}

//localhost:3000/777777
{"error": "Número maior que 99999!"}
```


É recomendado o uso de um software como o [Insomnia](https://insomnia.rest/) ou o site [Postwoman](https://postwoman.io/) para usar este sistema.

## Licença
[MIT](https://choosealicense.com/licenses/mit/)
