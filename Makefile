CONTAINER_NAME=template_app
USER_NAME=adamkali

include .env

docker-build-tag-no-cargo: 
	docker build -t $(CONTAINER_NAME):latest -t $(CONTAINER_NAME):$(shell git rev-parse HEAD) -t $(CONTAINER_NAME):stable -f ./NoCargo.Dockerfile .

docker-build-tag-no-cache:
	docker build -t $(CONTAINER_NAME):latest -t $(CONTAINER_NAME):$(shell git rev-parse HEAD) -f ./Dockerfile . --no-cache

docker-build-tag:
	docker build -t $(CONTAINER_NAME):latest -t $(CONTAINER_NAME):$(shell git rev-parse HEAD) -t $(CONTAINER_NAME):stable -f Dockerfile .

push-to-ghcr:
	docker tag $(CONTAINER_NAME):$(shell git rev-parse HEAD) ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):$(shell git rev-parse  HEAD)
	docker tag $(CONTAINER_NAME):latest ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):latest
	docker tag $(CONTAINER_NAME):stable ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):stable
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):latest
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):stable
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):$(shell git rev-parse HEAD)

deploy:
	curl --request GET $(COOLIFY_WEBHOOK) --header 'Authorization: Bearer $(COOLIFY_TOKEN)'
	
prod: docker-build-tag push-to-ghcr deploy
prod-nc: docker-build-tag-no-cache push-to-ghcr deploy
prod-fe: docker-build-tag-no-cargo push-to-ghcr deploy

