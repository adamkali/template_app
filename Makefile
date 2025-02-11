CONTAINER_NAME=template_app
USER_NAME=adamkali

include .env

start-dev:
	cargo loco start 
start-local: 
	cargo loco start -e local

docker-build-tag-no-cache:
	docker build -t $(CONTAINER_NAME):latest -t $(CONTAINER_NAME):stable -f ./Dockerfile . --no-cache

docker-build-tag:
	docker build -t $(CONTAINER_NAME):latest -t $(CONTAINER_NAME):stable -f Dockerfile .

push-git:
	docker tag $(CONTAINER_NAME):latest ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):latest
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):stable

push-stable:
	docker tag $(CONTAINER_NAME):stable ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):stable
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):latest

deploy:
	curl --request GET $(COOLIFY_WEBHOOK) --header 'Authorization: Bearer $(COOLIFY_TOKEN)'
	
prod: docker-build-tag push-to-ghcr deploy
prod-nc: docker-build-tag-no-cache push-to-ghcr deploy

