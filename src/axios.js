import {bus} from './main'
import axios from 'axios';
import {store} from './store/store';
import {websocket} from "./store/ws";

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

    const { config, response: { status } } = error;
    const originalRequest = config;

    if (originalRequest.url.includes("auth")){
        return Promise.reject(error)
    }

    if (status === 401) {
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;

            // instead of this store call you would put your code to get new token
            store.dispatch("refreshToken").then(response => {
                console.log("Refreshed");
                isAlreadyFetchingAccessToken = false;
                onAccessTokenFetched(response.data.result.token);
            }).catch(err => {
                console.log("Not Refreshed", err);

                store.dispatch('logout').then(() => {

                    localStorage.removeItem("user");
                    websocket.user.disconnect();

                    bus.$router.push({ name: 'login', params: {
                        err: {
                            group: 'auth',
                            type: 'error',
                            text: "Login failed, Try to login again!",
                            title: "Failed",
                            duration: 2000,
                        }
                    }})
                })

            })
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