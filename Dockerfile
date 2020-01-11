FROM ubuntu

# Update packages and install curl
RUN apt-get update\
    && apt-get install -y curl iputils-ping nano

# Installing caddy
RUN curl https://getcaddy.com | bash -s personal http.grpc

# Checking caddy version
RUN caddy -version

# Creating work directory
RUN mkdir /movienight.caddy

# Selecting work directory
WORKDIR /movienight.caddy

ADD ./dist ./dist

ADD ./production.caddy .

# Exposing port
EXPOSE 80
EXPOSE 443

# Running project with caddy
CMD ["caddy", "-conf", "/movienight.caddy/production.caddy"]