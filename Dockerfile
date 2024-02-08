FROM node:20

RUN corepack enable

COPY . /app
WORKDIR /app
RUN pnpm install
RUN pnpm build

CMD pnpm start:prod
