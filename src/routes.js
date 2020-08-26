// Auth components
import Auth from './components/auth/Auth'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import IForgot from './components/auth/IForgot'
import Register from './components/auth/Register'

// Dashboard components
import Dashboard from './components/dashboard/Dashboard'
import Settings from './components/dashboard/Settings'
import Friends from './components/dashboard/Friends'
import Theater from './components/dashboard/Theater'
import UserTheater from './components/dashboard/UserTheater'

import Message from './components/dashboard/Messages/Message'

// OAUTH
import OAUTH from './components/auth/oauth/base'

// Google oauth
import GoogleOAUTH from './components/auth/oauth/google/Connect'
import GoogleCallback from './components/auth/oauth/google/Callback'

// Discord oauth
import DiscordOAUTH from './components/auth/oauth/discord/Connect'
import DiscordCallback from './components/auth/oauth/discord/Callback'

// Spotify oauth
import SpotifyOAUTH from './components/auth/oauth/spotify/Connect'
import SpotifyCallback from './components/auth/oauth/spotify/Callback'

import Splash from './components/Splash';

const routes = [
    {
        name: 'splash',
        path: '/splash',
        components: {
            main: Splash
        },
    },
    {
        path: '/',
        components: {
            main: Dashboard,
        },
        children: [
            {
                path: '',
                name: 'dashboard',
                components: {
                    dashboard: Friends,
                },
            },
            {
                path: "messages/:friend_id",
                name: "messages",
                components: {
                    dashboard: Message,
                },
            },
            {
                path: 'settings',
                name: 'settings',
                components: {
                    dashboard: Settings,
                },
            },
            {
                path: 'me',
                name: 'me',
                components: {
                    dashboard: UserTheater,
                },
            },
        ],
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/oauth',
        name: 'oauth',
        components: {
            main: OAUTH,
        },
        children: [
            {
                path: 'google/connect',
                name: 'google_oauth_connect',
                components: {
                    oauth: GoogleOAUTH
                },
            },
            {
                path: 'google/callback',
                name: 'google_oauth_callback',
                components: {
                    oauth: GoogleCallback
                }
            },
            {
                path: 'discord/connect',
                name: 'discord_oauth_connect',
                components: {
                    oauth: DiscordOAUTH
                },
            },
            {
                path: 'discord/callback',
                name: 'discord_oauth_callback',
                components: {
                    oauth: DiscordCallback
                }
            },
            {
                path: 'spotify/connect',
                name: 'spotify_oauth_connect',
                components: {
                    oauth: SpotifyOAUTH
                },
            },
            {
                path: 'spotify/callback',
                name: 'spotify_oauth_callback',
                components: {
                    oauth: SpotifyCallback
                }
            }
        ],
    },
    {
        path: '',
        name: 'auth',
        components: {
            main: Auth,
        },
        children: [
            {
                path: '/login',
                name: 'login',
                components: {
                    auth: Login,
                },
                meta: {
                    requiresVisitor: true,
                }
            },
            {
                path: '/register',
                name: 'register',
                components: {
                    auth: Register,
                },
                meta: {
                    requiresVisitor: true,
                }
            },
            {
                path: '/iforgot',
                name: 'iforgot',
                components: {
                    auth: IForgot,
                },
                meta: {
                    requiresVisitor: true,
                }
            },
            {
                path: '/logout',
                name: 'logout',
                components: {
                    auth: Logout,
                },
                meta: {
                    requiresAuth: true,
                }
            },
        ]
    },
    {
        path: '',
        components: {
            main: Dashboard,
        },
        children: [
            {
                path: ':user',
                name: 'theater',
                components: {
                    theater: Theater,
                    dashboard: null,
                },
            },
        ]
    },
    { path: '*' }
];

export default routes