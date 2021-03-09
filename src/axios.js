import axios from 'axios'

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
    subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
    subscribers.push(callback)
}

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {

    console.log(error);

    const { config, response: { status } } = error;
    const originalRequest = config;

    if (originalRequest.url.includes("auth")){
        return Promise.reject(error)
    }

    if (status === 401) {
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
        }
        return new Promise((resolve) => {
            addSubscriber(access_token => {
                originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
                resolve(axios(originalRequest))
            })
        });
    }

    return Promise.reject(error)
});
