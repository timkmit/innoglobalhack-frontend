FROM node:22.10.0 AS build

WORKDIR /app

COPY ./package.json ./package.json

COPY ./yarn.lock ./yarn.lock

RUN yarn install

COPY ./public ./public

COPY ./src ./src

COPY ./index.html ./index.html

COPY ./tsconfig.json ./tsconfig.json

COPY ./tsconfig.node.json ./tsconfig.node.json

COPY ./vite.config.ts ./vite.config.ts

RUN yarn build

FROM nginx:1.26.2 AS image

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]