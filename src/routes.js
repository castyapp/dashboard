// Auth components
import Login from './components/auth/Login'
import Auth from './components/auth/Auth'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'

// Dashboard components
import Dashboard from './components/dashboard/Dashboard'
import Settings from './components/dashboard/Settings'
import Popular from './components/dashboard/Popular'
import Library from './components/dashboard/Library'
import SharedWithYou from './components/dashboard/SharedWithYou'

import Message from './components/dashboard/Messages/Message'

// Theaters components
import CreateTheater from './components/dashboard/Theaters/Create'
import Theater from './components/dashboard/Theaters/Theater'

// OAUTH
import OAUTH from './components/auth/oauth/base'

// Google oauth
import GoogleOAUTH from './components/auth/oauth/google/Connect'
import GoogleCallback from './components/auth/oauth/google/Callback'

// Discord oauth
import DiscordOAUTH from './components/auth/oauth/discord/Connect'
import DiscordCallback from './components/auth/oauth/discord/Callback'

const routes = [
    {
        path: '/',
        components: {
            main: Dashboard,
        },
        children: [
            {
                path: '',
                name: 'dashboard',
                redirect: "library",
            },
            {
                path: 'library',
                name: 'library',
                components: {
                    dashboard: Library,
                },
            },
            {
                path: 'shared_with_you',
                name: 'shared_with_you',
                components: {
                    dashboard: SharedWithYou,
                },
            },
            {
                path: 'theaters/create',
                name: 'create_theater',
                components: {
                    dashboard: CreateTheater
                },
            },
            {
                path: "theater/:theater_id",
                name: "theater",
                components: {
                    theater: Theater,
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
                path: 'popular',
                name: 'popular',
                components: {
                    dashboard: Popular,
                },
            },
            {
                path: 'settings',
                name: 'settings',
                components: {
                    dashboard: Settings,
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
    { path: '*' }
];

export default routes