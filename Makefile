
SERVICE_NAME = app

build:
	docker compose build 

install:
	docker compose run --rm $(SERVICE_NAME) npm install

front-build:
	docker compose run --rm $(SERVICE_NAME) npm run build

lint:
	docker compose run --rm $(SERVICE_NAME) npm run lint

dev:
	docker compose -f docker-compose.dev.yaml up -d $(SERVICE_NAME)

up:
	docker compose up -d

sh:
	docker compose exec $(SERVICE_NAME) /bin/sh

pw-sh:
	docker compose exec playwright /bin/sh

pw-build:
	docker compose build playwright

down:
	docker compose down

test:
	docker compose run --rm playwright npm test

logs:
	docker compose logs -f