# stage1 as builder
FROM node:12-alpine as builder

RUN npm i -g yarn

WORKDIR /build

# Copy the package.json and install dependencies
COPY yarn.lock ./
RUN yarn

# Copy rest of the files
COPY . .

# Build the project
RUN yarn build

FROM caddy:2.1.1

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /build/dist /srv

EXPOSE 80

ENTRYPOINT ["caddy"]
CMD ["run", "-config", "/etc/caddy/Caddyfile"]
