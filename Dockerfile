FROM oven/bun:1 AS base
WORKDIR /usr/src/app

COPY package.json .

FROM base AS build

RUN bun install --frozen-lockfile

COPY . .
RUN bun test
RUN bun run build

FROM base AS prod-deps

RUN bun install --frozen-lockfile --production

FROM oven/bun:distroless AS run
WORKDIR /usr/src/app

COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build

USER nonroot
EXPOSE 3000
ENTRYPOINT [ "bun", "build/index.js" ]
