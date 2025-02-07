
SERVICE_NAME = app

build:
	docker compose build --no-cache

install:
	docker compose run --rm $(SERVICE_NAME) npm install

front-build:
	docker compose run --rm $(SERVICE_NAME) npm run build

lint:
	docker compose run --rm $(SERVICE_NAME) npm run lint

dev:
	docker compose run --rm -p 3000:3000 $(SERVICE_NAME) npm run dev
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