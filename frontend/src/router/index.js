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
            requiredPermissions: ['admin']
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

router.beforeEach((to, from, next) => {
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

    let allow = true;

    //In these conditions i define what should be done if they're not fulfilled
    if (to.matched.some(record => record.meta.requiresAuth))
    {
        if(!store.getters.token)
        {
            next('/login')
        }
    }

    if(to.matched.some(record => record.meta.guest))
    {
        if(store.getters.token)
        {
            next('/')
        }
    }

    if(to.matched.some(record => record.meta.requiredPermissions))
    {
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/check_permissions', to.meta.requiredPermissions)
                .then(response =>
                    {
                        console.log(response.data)
                    })
            })
    }

    next()
})

export default router;
