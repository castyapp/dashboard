import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import config from './api'

Vue.use(Vuex);

// Authentication service
const {
    AuthServiceClient,
    AuthRequest,
    RefreshTokenRequest,
    OAUTHRequest,
} = require("casty-proto/pbjs/grpc.auth_grpc_web_pb");

// User service
const {
    User,
    FriendRequest,
    CreateUserRequest,
    SearchUserRequest,
    UpdateUserRequest,
    UserServiceClient,
    AuthenticateRequest,
} = require("casty-proto/pbjs/grpc.user_grpc_web_pb");

// Theater service
const {
    TheaterServiceClient,
    GetAllUserTheatersRequest,
    Theater,
    Movie,
    TheaterAuthRequest,
    InviteFriendsTheaterRequest,
    CreateTheaterRequest,
} = require("casty-proto/pbjs/grpc.theater_grpc_web_pb");

// Message service
const {
    MessagesServiceClient,
    GetMessagesRequest,
} = require("casty-proto/pbjs/grpc.message_grpc_web_pb");

const grpc_api_uri = `${config.schema}://${config.baseURL}`;

const authService = new AuthServiceClient(grpc_api_uri, null, null);
const userService = new UserServiceClient(grpc_api_uri, null, null);
const theaterService = new TheaterServiceClient(grpc_api_uri, null, null);
const messageService = new MessagesServiceClient(grpc_api_uri, null, null);

export const store = new Vuex.Store({
    state: {
        refreshed_token: localStorage.getItem('refreshed_token') || null,
        token: localStorage.getItem('access_token') || null,
        user: null,
    },
    getters: {
        loggedIn: (state, getters) => {
            return getters.token !== null
        },
        token: state => {
            if (state.token === "null" || state.token === null || state.token === ""){
                return null
            }
            return state.token
        },
        user: state => state.user,
    },
    mutations: {
        retrieveToken: (state, {token, refreshed_token}) => {
            state.token = token;
            localStorage.setItem('access_token', state.token);
            state.refreshed_token = refreshed_token;
            localStorage.setItem('refreshed_token', refreshed_token);
        },
        destroyToken: (state) => {
            state.token = null;
            state.user = {};
            localStorage.removeItem("access_token");
            localStorage.removeItem("refreshed_token");
        },
        addUserData: (state, data) => {
            state.user = data;
            localStorage.setItem('user', JSON.stringify(data));
        }
    },
    actions: {
        logout(context) {
            context.commit("destroyToken");
            this.state.user = null;
        },
        getFriendsList(context) {
            return new Promise((resolve, reject) => {
                const request = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                request.setToken(token);
                const call = userService.getFriends(request, {}, (err, response) => {
                    if (!err) {
                        let friends = []
                        response.getResultList().forEach(friend => {
                            friends.push(friend.toObject())
                        })
                        resolve(friends);
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        getUser(context) {
            return new Promise((resolve, reject) => {
                const request = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                request.setToken(token);
                const call = userService.getUser(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getResult().toObject());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        searchUser(context, keyword) {

            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new SearchUserRequest();
                request.setKeyword(keyword);
                request.setAuthRequest(authRequest);

                userService.search(request, {}, (err, response) => {
                    if (!err) {
                        let users = []
                        response.getResultList().forEach(user => {
                            users.push(user.toObject())
                        })
                        resolve(users);
                    }
                }).on('error', err => {
                    reject(err);
                });
            })
        },
        getFriend(context, friend_id) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new FriendRequest();
                request.setFriendId(friend_id);
                request.setAuthRequest(authRequest);

                const call = userService.getFriend(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getResult().toObject());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        getMessages(context, receiverId) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new GetMessagesRequest();
                request.setReceiverId(receiverId);
                request.setAuthRequest(authRequest);

                const call = messageService.getUserMessages(request, {}, (err, response) => {
                    if (!err) {
                        let messages = []
                        response.getResultList().forEach(message => {
                            messages.push(message.toObject())
                        })
                        resolve(messages);
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        getTheater(context, theater_id) {
            return new Promise((resolve, reject) => {
                const request = new Theater();
                request.setId(theater_id);
                const call = theaterService.getTheater(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getResult().toObject());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        getTheaters(context) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new GetAllUserTheatersRequest();
                request.setAuthRequest(authRequest);

                const call = theaterService.getUserTheaters(request, {}, (err, response) => {
                    if (!err) {
                        let theaters = []
                        response.getResultList().forEach(theater => {
                            theaters.push(theater.toObject())
                        })
                        resolve(theaters);
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        getSharedTheaters(context) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new GetAllUserTheatersRequest();
                request.setAuthRequest(authRequest);

                const call = theaterService.getUserSharedTheaters(request, {}, (err, response) => {
                    if (!err) {
                        let theaters = []
                        response.getResultList().forEach(theater => {
                            theaters.push(theater.toObject())
                        })
                        resolve(theaters);
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        updateProfile(context, form) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const user = new User();
                user.setFullname(form.fullname);

                const request = new UpdateUserRequest();
                request.setAuthRequest(authRequest);
                request.setResult(user);

                const call = userService.updateUser(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getResult().toObject());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        getTheaterSubtitles(context, theater_id) {
            return new Promise((resolve, reject) => {

                const theater = new Theater();
                theater.setId(theater_id);

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new TheaterAuthRequest();
                request.setAuthRequest(authRequest);
                request.setTheater(theater);

                const call = theaterService.getSubtitles(request, {}, (err, response) => {
                    if (!err) {
                        let subtitles = [];
                        response.getResultList().forEach(subtitle => {
                            subtitles.push(subtitle.toObject())
                        })
                        resolve(subtitles);
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        addSubtitleToTheater(context, {subtitle, theater_id}) {
            return new Promise((resolve, reject) => {
                let params = new FormData();
                params.append('lang', subtitle.lang);
                params.append('subtitle', subtitle.file, subtitle.file.name);
                axios.post(`${config.cdnUrl}/json.TheaterService/${theater_id}/cc`, params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${context.state.token}`,
                    }
                }).then(resolve).catch(reject);
            })
        },
        createTheater(context, data) {

            const authRequest = new AuthenticateRequest();
            let utf8Encode = new TextEncoder();
            let token = utf8Encode.encode(context.state.token)
            authRequest.setToken(token);

            const request = new CreateTheaterRequest();
            request.setAuthRequest(authRequest);

            const theater = new Theater();
            theater.setTitle(data.title);
            theater.setPrivacy(data.privacy);
            theater.setVideoPlayerAccess(data.video_player_access);

            const movie = new Movie();
            movie.setType(data.type);
            movie.setUri(data.movie_uri);

            theater.setMovie(movie);
            request.setTheater(theater);

            return new Promise((resolve, reject) => {
                const call = theaterService.createTheater(request, {}, (err, response) => {
                    if (!err) {
                        const decoder = new TextDecoder("utf-8");
                        const insertedID = decoder.decode(response.getResult());
                        resolve(insertedID);
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            });
        },
        updateAvatar(context, avatar) {
            return new Promise((resolve, reject) => {
                let params = new FormData();
                params.append('avatar', avatar, avatar.name);
                axios.post(`${config.cdnUrl}/json.UserService/avatar`, params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${context.state.token}`,
                    }
                }).then(resolve).catch(reject);
            })
        },
        uploadTheaterPoster(context, { theater_id, poster }) {
            return new Promise((resolve, reject) => {
                let params = new FormData();
                params.append('poster', poster, poster.name);
                axios.post(`${config.cdnUrl}/json.TheaterService/${theater_id}/poster`, params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${context.state.token}`,
                    }
                }).then(resolve).catch(reject);
            })
        },
        removeTheater(context, theater_id) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const theater = new Theater();
                theater.setId(theater_id);

                const request = new TheaterAuthRequest();
                request.setAuthRequest(authRequest);
                request.setTheater(theater);

                const call = theaterService.removeTheater(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getMessage());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        sendFriendRequest(context, friend_id) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new FriendRequest();
                request.setAuthRequest(authRequest);
                request.setFriendId(friend_id);

                const call = userService.sendFriendRequest(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getMessage());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        acceptFriendRequest(context, request_id) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new FriendRequest();
                request.setAuthRequest(authRequest);
                request.setRequestId(request_id);

                const call = userService.acceptFriendRequest(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getMessage());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        register(context, data) {
            const user = new User();
            user.setEmail(data.email);
            user.setFullname(data.fullname);
            user.setUsername(data.username);
            user.setPassword(data.password);

            const request = new CreateUserRequest();
            request.setUser(user);

            const metadata = { 'g-recaptcha-response': data.gToken };

            return new Promise((resolve, reject) => {
                const call = userService.createUser(request, metadata, (err, response) => {
                    if (!err) {
                        const decoder = new TextDecoder("utf-8");
                        const token = decoder.decode(response.getToken());
                        const refreshed_token = decoder.decode(response.getRefreshedToken());
                        context.commit('retrieveToken', {token, refreshed_token});
                        resolve(response)
                    }
                });
                call.on('error', reject);
            })
        },
        refreshToken(context) {
            const request = new RefreshTokenRequest();
            request.setRefreshedToken(context.state.refreshed_token);
            return new Promise((resolve, reject) => {
                const call = authService.refreshToken(request, {}, (err, response) => {
                    if (!err) {
                        const decoder = new TextDecoder("utf-8");
                        const token = decoder.decode(response.getToken());
                        const refreshed_token = decoder.decode(response.getRefreshedToken());
                        context.commit('retrieveToken', {token, refreshed_token});
                        resolve(response)
                    }
                });
                call.on('error', reject);
            })
        },
        login(context, credentials) {
            const request = new AuthRequest();
            request.setUser(credentials.user);
            request.setPass(credentials.pass);
            return new Promise((resolve, reject) => {
                const call = authService.authenticate(request, {
                    'g-recaptcha-response': credentials.gToken,
                }, (err, response) => {
                    if (!err) {
                        const decoder = new TextDecoder("utf-8");
                        const token = decoder.decode(response.getToken());
                        const refreshed_token = decoder.decode(response.getRefreshedToken());
                        context.commit('retrieveToken', {token, refreshed_token});
                        resolve(response);
                    }
                });
                call.on('error', reject);
            });
        },
        getNotifications(context) {
            return new Promise((resolve, reject) => {
                const request = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                request.setToken(token);
                const call = userService.getNotifications(request, {}, (err, response) => {
                    if (!err) {
                        let notifications = []
                        response.getResultList().forEach(notification => {
                            notifications.push(notification.toObject())
                        })
                        resolve({
                            unread_count: response.getUnreadCount(),
                            data: notifications,
                        });
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        readAllNotifications(context) {
            return new Promise((resolve, reject) => {

                const request = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                request.setToken(token);

                const call = userService.readAllNotifications(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getMessage());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        inviteFriendToTheater(context, {friend_ids, theater_id}) {
            return new Promise((resolve, reject) => {

                const authRequest = new AuthenticateRequest();
                let utf8Encode = new TextEncoder();
                let token = utf8Encode.encode(context.state.token)
                authRequest.setToken(token);

                const request = new InviteFriendsTheaterRequest();
                request.setAuthRequest(authRequest);
                request.setTheaterId(theater_id);
                request.setFriendIdsList(friend_ids);

                const call = theaterService.invite(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getMessage());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        },
        OAUTHCallback(context, {service, code}) {
            return new Promise((resolve, reject) => {

                const request = new OAUTHRequest();
                request.setCode(code);
                request.setService(service);

                const call = authService.callbackOAUTH(request, {}, (err, response) => {
                    if (!err) {
                        resolve(response.getMessage());
                    }
                });
                call.on('error', err => {
                    reject(err);
                });
            })
        }
    },
});