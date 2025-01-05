include .env

up: 
	docker compose -p template_app up -d
down:
	docker compose -p template_app down
remove:
	docker rmi template_app-web
