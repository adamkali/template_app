CONTAINER_NAME=template_app
USER_NAME=adamkali

include .env

start-dev:
	cargo loco start 
start-local: 
	cargo loco start -e local

docker-build-tag-no-cache-stable:
	docker build -t $(CONTAINER_NAME):stable -f ./Dockerfile . --no-cache
docker-build-tag-no-cache:
	docker build -t $(CONTAINER_NAME):latest -f ./Dockerfile . --no-cache

docker-build-tag-stable:
	docker build -t $(CONTAINER_NAME):stable -f Dockerfile .
docker-build-tag:
	docker build -t $(CONTAINER_NAME):latest -f Dockerfile .

push:
	docker tag $(CONTAINER_NAME):latest ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):latest
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):latest
push-stable:
	docker tag $(CONTAINER_NAME):stable ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):stable
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):stable
	
stable: docker-build-tag-stable push-stable
latest: docker-build-tag push
stable-nc: docker-build-tag-no-cache-stable push-stable
latest-nc: docker-build-tag-no-cache push

deploy:
	curl --request GET $(COOLIFY_WEBHOOK) --header 'Authorization: Bearer $(COOLIFY_TOKEN)'
