# Rick and Morty Explorer 🚀

Este projeto é uma web api client para a [Rick and Morty API](https://github.com/afuh/rick-and-morty-api) chamada **Rick and Morty Explorer**, que permite aos usuários buscar personagens, filtrar por atributos e navegar entre os resultados paginados. O projeto utiliza **Next.js**, **Node.js**, e **Playwright** para testes.

![Logo](.github/home.png)

---

## ✨ Features

🔍 Pesquisa Avançada: Encontre personagens rapidamente digitando seus nomes.

🎚 Filtros Poderosos: Refine sua busca por espécie, gênero e status.

🌙 Modo Escuro: Desfrute da experiência completa com um tema otimizado para ambientes escuros.

📜 Paginação Dinâmica: Navegue facilmente entre os resultados.

---

## 📂 Estrutura do Projeto
```
projeto/
│
├── docker-compose.yml       # Configuração do Docker Compose
├── Dockerfile.testing       # Dockerfile para Playwright
├── app/                     # Código-fonte da aplicação
├── tests/                   # Testes Playwright
├── Makefile                 # Comandos úteis para gerenciar os serviços
```

---

## 🚀 Como Rodar o Projeto

### **Pré-requisitos**
Certifique-se de ter o **Docker** e **Docker Compose** instalados:
```bash
# Verificar se o Docker está instalado
docker -v
# Verificar se o Docker Compose está instalado
docker-compose -v
```

### **Subindo a Aplicação**
Para iniciar todos os serviços:
```bash
docker-compose up -d
```
Isso iniciará os seguintes serviços:
- **app**: Servidor Node.js rodando o Rick and Morty Explorer.
- **playwright**: Container para execução dos testes Playwright.

Acesse a aplicação em:
```
http://localhost:3000
```

---

## 🐳 Configuração Docker

### **`docker-compose.yml`**
```yaml
services:
  app:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./:/app
    ports:
      - "3000:3000"
    command: sh -c "yarn start"
    environment:
      - API_URL=https://rickandmortyapi.com/api/character

  playwright:
    build:
      context: .
      dockerfile: Dockerfile.testing
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      - PLAYWRIGHT_APP_URL=http://host.docker.internal:3000
    command: sh -c "yarn test"
    depends_on:
      - app
```

- **`app`**: Roda o servidor Next.js.
- **`playwright`**: Executa os testes Playwright.
- **`API_URL`**: Define a API do Rick and Morty como fonte de dados.
- **Rede `rickandmorty`**: Define uma rede externa para comunicação entre containers. 

***OBS:*** Normalmente não seria necessário configurar a rede já que ambos serviços estão no mesmo docker compose, mas se você
prestar atenção nas curiosidades abaixo, vai entender porque eu precisei fazer isso


---

## 🧪 Executando Testes com Playwright
Para rodar os testes Playwright:
```bash
docker compose run --rm playwright yarn test
```

Ou, se você tiver acesso ao *make*:

```bash
make test
```

## 🛠 Uso do Makefile
Para facilitar o gerenciamento, utilize o **Makefile**:

### **Comandos úteis**
```bash
make build        # Build  das imagens Docker
make front-build  # Build da aplicação frontend
make lint         # Rodar o linter
make dev          # Rodar a aplicação em modo de desenvolvimento
make up           # Subir os containers
make sh           # Acessar o container do app
make pw-sh        # Acessar o container do Playwright
make pw-build     # Buildar o container Playwright
make down         # Parar e remover os containers
make test         # Rodar testes Playwright
make logs         # Ver logs dos containers
```


## 🤔 Curiosidades

No auge da minha sabedoria, ao executar múltiplos testes e2e, acabei caindo no rate limit
da API. Precisei, as pressas, adaptar ao ambiente local o repositório opensource, configurar o mesmo para docker (server e DB), simplesmente pra poder rodar os testes de novo!

Também tive problemas de consistencia de testing no playwright, desde conexão de rede interna do docker a testes que ora passam ora não passam, mesmo sem mudança de código. E2E testing é complicado!!

Me desafiei a fazer isso em 3 dias. Nunca tinha trabalhado com Next.js. Sinto que poderia ter organizado meu código melhor, principalmente na distribuição de comportamento dos componentes, usei bastante prop drilling e não gostei muito do resultado final. Se tivesse me debruçado mais sobre design patterns típicos eu teria tido um resultado superior, mas com o tempo corrido eu realmente foquei em fazer o client funcionar!


## 🤖 Usos de IA

- Sugestão de tópicos de testing após apresentar o conceito.
- Algoritmo de dominancia de paleta de cores para apresentação dos personagens nos cards.
- Auxilio na escrita do READ.ME (É, essa aí mesmo que você ta lendo agora)
