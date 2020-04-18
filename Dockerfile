FROM ubuntu

RUN apt update &&\
    apt -y upgrade

RUN apt install -y curl nano

RUN curl https://getcaddy.com | bash -s personal http.cors,http.grpc

# Check caddy version
RUN caddy -version

# Create work directory
RUN mkdir /casty.caddy

# Select work directory
WORKDIR /casty.caddy

# Add nodesource
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

# Install nodejs
RUN yum install -y nodejs

# Check nodejs version
RUN node --version

# Check npm version
RUN npm --version

# Copy project to destination
ADD . /casty.caddy

# Install node dependencies modules
RUN npm install

# Build the project
RUN npm run build

# Expose ports
EXPOSE 80
EXPOSE 443

# Run project with caddy
ENTRYPOINT ["caddy"]
CMD ["-conf", "Caddyfile"]