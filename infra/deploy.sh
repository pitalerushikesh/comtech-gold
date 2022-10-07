#!/bin/bash

docker context use default
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 135135176603.dkr.ecr.ap-south-1.amazonaws.com

docker-compose \
  -f infra/docker-compose.base.yml \
  -f infra/docker-compose.build.yml \
  -f infra/docker-compose.tags.yml \
  --project-name comtech-apothem \
  --project-directory ./ \
  build

docker push 135135176603.dkr.ecr.ap-south-1.amazonaws.com/comtech-frontend:apothem
docker push 135135176603.dkr.ecr.ap-south-1.amazonaws.com/comtech-backend:apothem
docker push 135135176603.dkr.ecr.ap-south-1.amazonaws.com/comtech-redis:apothem

docker context use yodaplus

cp .env ./infra/.env

docker compose \
  -f infra/docker-compose.base.yml \
  -f infra/docker-compose.tags.yml \
  -f infra/docker-compose.ecs.yml \
  --project-name trafinex-apothem \
  --project-directory ./ \
  up

rm ./infra/.env

docker context use default
