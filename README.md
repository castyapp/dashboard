# Casty VueJs Project

### Project setup
```bash
$ git clone https://github.com/CastyLab/dashboard.git
```

#### Install dependencies via npm
```bash
$ npm install
```

### Configuration
make a copy of `.env.example` file and call it `.env`
```bash
$ cp .env.example .env
```

### **Environments**
```env
# Websocket configurations
# Setup user and theater websocket gateways!
VUE_APP_API_USER_WEBSOCKET_URI=ws://localhost:3000/user
VUE_APP_API_THEATER_WEBSOCKET_URI=ws://localhost:3000/theater

# API http requests config
VUE_APP_API_SCHEMA=http
VUE_APP_API_BASE=localhost:9002
VUE_APP_API_VERSION=v1

# Google oauth configs
VUE_APP_API_GOOGLE_ANALYTICS_TRACK_ID=
VUE_APP_API_GOOGLE_CLIENT_ID=
VUE_APP_API_GOOGLE_REDIRECT_URI=http://localhost:8000/oauth/google/callback

# Discord oauth configs
VUE_APP_API_DISCORD_CLIENT_ID=
VUE_APP_API_DISCORD_REDIRECT_URI=http://localhost:8000/oauth/discord/callback

# Recaptcha config
# This should match the api.server project google recaptcha variable 
VUE_APP_API_RECAPTCHA_KEY=
```

### Serve project on development server
```bash
$ npm run serve
```

### Compiles and minifies for production
```bash
$ npm run build
```

### Building docker image
```bash
$ docker build . --tag=casty.dash
```

### Run docker image
```bash
$ docker run -dp 80:80 --restart always casty.dash
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
