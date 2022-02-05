import {createWebHistory, createRouter} from "vue-router";
import axios from 'axios';
import store from '../store'

import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    if(store.getters.token)
    {
        if (store.getters.user == null)
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
    if (to.matched.some(record => record.meta.requiresAuth))
    {

        if(store.getters.token)
        {
            next()
            return
        }
        next('/login')

    }else if(to.matched.some(record => record.meta.guest)){
        if(!store.getters.token)
        {
            next()
            return
        }
        next('/')

    }else{
        next()
    }
})

export default router;
