# HomePi VueJs Project

## Project setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
```

### Building docker image
```
docker build . --tag=homepi-dashboard
```

### Run docker image
```
docker run -dp 80:80 --restart always homepi-dashboard
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
