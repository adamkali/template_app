POSTGRES_PASSWORD=SZUTwbnwDTJcd0Btw3DDS8u1tY8WNC0J
JWT_PASSWORD=9R1HY73SUNryXH9KAGVA 
MAILER_PASSWORD=""

up: 
	docker compose -p template_app up -d
up-local: 
	docker compose -p template_app -f  docker-compose.test.yml up -d
down-local: 
	docker compose -p template_app -f docker-compose.test.yml down
down:
	docker compose -p template_app down
remove:
	docker rmi template_app-web
