# Nome do serviço Docker Compose
SERVICE_NAME = app

# Build da imagem Docker usando Docker Compose
build:
	docker-compose -f docker-compose.build.yaml build

# Inicialização do container Docker usando Docker Compose
run:
	docker-compose -f docker-compose.build.yaml up

# Execução de comandos dentro do container Docker usando Docker Compose
exec:
	docker-compose -f docker-compose.build.yaml exec $(SERVICE_NAME) /bin/sh

# Parada e remoção de containers Docker usando Docker Compose
stop:
	docker-compose -f docker-compose.build.yaml down

# Limpeza de imagens Docker usando Docker Compose
clean:
	docker-compose -f docker-compose.build.yaml down --rmi all

# Limpeza de containers e imagens Docker usando Docker Compose
clean-all:
	docker system prune -af

# Exemplo de comando para rodar testes usando Docker Compose
test:
	docker-compose -f docker-compose.build.yaml run --rm $(SERVICE_NAME) npm test

# Exibição de logs usando Docker Compose
logs:
	docker-compose -f docker-compose.build.yaml logs -f