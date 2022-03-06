import {createWebHistory, createRouter} from "vue-router";
import axios from 'axios';
import store from '../store'

import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: {
            guest: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
        meta: {
            requiresAuth: true,
        }
    },
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
    let url = null;
    //Function to prevent multiple using of next()
    function redirect(to = null)
    {
        url = to
    }

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
            redirect('/login')
        }
    }

    //Checking if user is guest. If not then redirect to /
    if(to.matched.some(record => record.meta.guest))
    {
        if(store.getters.token)
        {
            redirect('/')
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
                             redirect('/') //To nie działa
                             alert("Nie masz dostępu do tej strony!")
                        }
                    })
            })
    }

    //Redirecting to url specified in redirect() function or to the default direction if not encountered error
    next(url)
})

export default router;
