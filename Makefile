
SERVICE_NAME = app

build:
	docker-compose build

front-build:
	docker-compose run --rm $(SERVICE_NAME) npm run build

lint:
	docker-compose run --rm $(SERVICE_NAME) npm run lint

dev:
	docker-compose run --rm -p 3000:3000 $(SERVICE_NAME) npm run dev
up:
	docker-compose up -d

exec:
	docker-compose exec $(SERVICE_NAME) /bin/sh

down:
	docker-compose down

test:
	docker-compose run --rm $(SERVICE_NAME) npm test

logs:
	docker-compose logs -f