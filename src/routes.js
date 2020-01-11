// Auth components
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'

// Dashboard components
import Dashboard from './components/dashboard/Dashboard'
import Settings from './components/dashboard/Settings'
import Popular from './components/dashboard/Popular'
import Library from './components/dashboard/Library'

import Message from './components/dashboard/Messages/Message'

// Theaters components
import CreateTheater from './components/dashboard/Theaters/Create'
import Theater from './components/dashboard/Theaters/Theater'

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
        path: '/login',
        name: 'login',
        components: {
            main: Login,
        },
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/register',
        name: 'register',
        components: {
            main: Register,
        },
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        components: {
            main: Logout,
        },
        meta: {
            requiresAuth: true,
        }
    },
    { path: '*' }
];

export default routes