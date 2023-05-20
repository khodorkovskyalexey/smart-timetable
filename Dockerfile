FROM node:18.12.1 AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18.12.1 AS runner
WORKDIR /app
COPY --from=builder /app ./
ENTRYPOINT ["sh", "-c"]
EXPOSE 5000
CMD ["node -r ./tsconfig-paths-bootstrap.js dist/src/main.js"]
