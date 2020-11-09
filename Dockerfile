# stage1 as builder
FROM node:12-alpine as builder

WORKDIR /casty-dash

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build

FROM caddy:2.1.1

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /casty-dash/dist/web /srv

EXPOSE 80

ENTRYPOINT ["caddy"]
CMD ["run", "-config", "/etc/caddy/Caddyfile"]