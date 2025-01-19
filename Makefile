CONTAINER_NAME=template_app
USER_NAME=adamkali

docker-build-tag:
	docker build -t $(CONTAINER_NAME):latest  -f dockerfile .
	docker build -t $(CONTAINER_NAME):$(shell git rev-parse HEAD) -f dockerfile .

push-to-ghcr:
	docker tag $(CONTAINER_NAME):$(shell git rev-parse HEAD) ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):$(shell git rev-parse  HEAD)
	docker tag $(CONTAINER_NAME):latest ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):latest
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):latest
	docker push ghcr.io/$(USER_NAME)/$(CONTAINER_NAME):$(shell git rev-parse HEAD)
	
prod: docker-build-tag push-to-ghcr

