import {createWebHistory, createRouter} from "vue-router";
import axios from 'axios';
import store from '../store'

//Main components for route groups:
import Site from '../components/site/Index'
import Admin from '../components/admin/Index'

//Consumer components:
import Home from '../pages/site/Home';
import Register from '../pages/site/Register';
import Login from '../pages/site/Login';
import Profile from '../pages/site/Profile';
import Post from '../pages/site/Post';

//Admin panel components:
import Dashboard from '../pages/admin/Dashboard';
import Posts from '../pages/admin/Posts';

//Defining routes:
export const routes = [

    //Route group for consumers
    {
        path: '/',
        component: Site, //Main component for this route group
        children: [
            //Home site route
            {
                name: 'home',
                path: '',
                component: Home
            },
            //Register route
            {
                name: 'register',
                path: '/register',
                component: Register,
                meta: {
                    guest: true
                }
            },
            //Login route
            {
                name: 'login',
                path: '/login',
                component: Login,
                meta: {
                    guest: true
                }
            },
            //Profile route
            {
                name: 'profile',
                path: '/profile',
                component: Profile,
                meta: {
                    requiresAuth: true,
                }
            },
        ],
    },

    {
        path: '/posts/:id',
        component: Site,
        children: [
            {
                path: '',
                component: Post,
            }
        ],

    },

    //Route group for admin panel
    {
        path: '/dashboard',
        component: Admin, //Main component for this route group
        meta: { //Requirements to even access this route group
            requiresAuth: true,
            //requiredPermissions: ['access:dashboard']
        },
        children: [
            //Dashboard route
            {
                name: 'dashboard',
                path: '',
                component: Dashboard,
            },
            //Posts route
            {
                name: 'posts',
                path: 'posts',
                component: Posts,
            },
        ],
    },

    //Catching routes that don't match any defined route and redirecting to /
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach(async (to, from, next) => {
    //Checking if user data is present in vuex. If not then get it from api
    if(store.getters.token != null)
    {
        if (store.getters.user === undefined)
        {
            axios.get('api/me')
                .then(response =>
                    {
                        if(response.data.api_status == 200)
                        {
                            store.dispatch('user_update', response.data.user)
                        }
                        else if(response.data.api_status == 401)
                        {
                            store.dispatch('logout')
                        }
                        else
                        {
                            console.log(response.data)
                        }
                    })
        }
    }


    //In these conditions i define what should be done if they're not fulfilled

    //Check if user is authenticated. If not then redirect to login page
    if (to.matched.some(record => record.meta.requiresAuth))
    {
        if(!store.getters.token)
        {
            return next('/login')
        }
    }

    //Checking if user is guest. If not then redirect to /
    if(to.matched.some(record => record.meta.guest))
    {
        if(store.getters.token)
        {
            return next('/')
        }
    }

    //Checking if user has permission to enter specific site. If not then redirect to /
    if(to.matched.some(record => record.meta.requiredPermissions) && url == null)
    {
        await axios.get('sanctum/csrf-cookie').then(response => {
            return axios.post('api/check_permissions', to.meta.requiredPermissions)
                .then(response =>
                    {
                        if(!response.data)
                        {
                             return next('/')
                             alert("Nie masz dostępu do tej strony!")
                        }
                    })
            })
    }

    //Redirect to final destination
    return next()
})

export default router;
