#!/bin/bash

docker context use default
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 135135176603.dkr.ecr.ap-south-1.amazonaws.com

docker-compose \
  -f infra/docker-compose.base.yml \
  -f infra/docker-compose.build.yml \
  -f infra/docker-compose.mainnet-tags.yml \
  --project-name comtech-gold-mainnet \
  --project-directory ./ \
  build

docker push 135135176603.dkr.ecr.ap-south-1.amazonaws.com/comtech-frontend:mainnet
docker push 135135176603.dkr.ecr.ap-south-1.amazonaws.com/comtech-backend:mainnet
docker push 135135176603.dkr.ecr.ap-south-1.amazonaws.com/comtech-redis:mainnet

docker context use yodaplus

cp .env ./infra/.env

docker compose \
  -f infra/docker-compose.base.yml \
  -f infra/docker-compose.mainnet-tags.yml \
  -f infra/docker-compose.ecs.yml \
  -f infra/docker-compose.ecs-mainnet.yml \
  --project-name comtech-gold-mainnet \
  --project-directory ./ \
  up

rm ./infra/.env

docker context use default
