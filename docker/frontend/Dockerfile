FROM node:16-alpine

WORKDIR /app/

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./frontend/package.json ./frontend/package.json
COPY ./dapps-lib/package.json ./dapps-lib/package.json
COPY ./injected-connector/package.json ./injected-connector/package.json
RUN npm ci

COPY ./frontend ./frontend
COPY ./dapps-lib ./dapps-lib
COPY ./injected-connector ./injected-connector

ARG REACT_APP_NETWORK_ID
ARG REACT_APP_APP_VERSION

WORKDIR /app/frontend/
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM nginx:alpine

WORKDIR /nginx/

COPY ./docker/frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/frontend/build /nginx
