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

//Posts managing components:
import Posts from '../pages/admin/Posts/Posts';
import PostShow from '../pages/admin/Posts/PostShow';
import PostCreate from '../pages/admin/Posts/PostCreate';

//Categories managing components:
import Categories from '../pages/admin/Categories/Categories';
import CategoryCreate from '../pages/admin/Categories/CategoryCreate';
import CategoryShow from '../pages/admin/Categories/CategoryShow';

//Roles managing components:
import Roles from '../pages/admin/Roles/Roles';
import RoleCreate from '../pages/admin/Roles/RoleCreate';
import RoleShow from '../pages/admin/Roles/RoleShow';

//User managing components:
import Users from '../pages/admin/Users/Users';
import UserShow from '../pages/admin/Users/UserShow';

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

    //Route for showing selected post
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

    //Route group for admin panel where is only 1 subpage
    {
        path: '/dashboard',
        component: Admin, //Main component for this route group
        meta: { //Requirements to even access this route group
            requiresAuth: true,
            requiredPermissions: ['access:dashboard']
        },
        children: [
            //Dashboard route
            {
                name: 'dashboard',
                path: '',
                component: Dashboard,
            },

        ],
    },


    //Route group for admin panel posts moderating
    {
        path: '/dashboard/posts',
        component: Admin, //Main component for this route group
        //Requirements to access this route group
        meta: {
            requiresAuth: true,
            requiredPermissions: ['access:dashboard', 'access:manage_posts'],
        },
        children: [
            //Route to show table with all posts
            {
                name: 'posts',
                path: '',
                component: Posts,
            },

            //Route for creating new post
            {
                name: 'post_create',
                path: 'create',
                component: PostCreate,
            },

            //Route for editing single post
            {
                name: 'post_show',
                path: ':id',
                component: PostShow,
            },
        ],
    },

    //Route group for admin panel categories moderating
    {
        path: '/dashboard/categories',
        component: Admin, //Main component for this route group
        //Requirements to access this route group
        meta: {
            requiresAuth: true,
            requiredPermissions: ['access:dashboard', 'access:manage_categories'],
        },
        children: [
            //Route to show table with all categories
            {
                name: 'categories',
                path: '',
                component: Categories,
            },

            //Route for creating new category
            {
                name: 'category_create',
                path: 'create',
                component: CategoryCreate,
            },

            //Route for editing single category
            {
                name: 'category_show',
                path: ':id',
                component: CategoryShow,
            },
        ],
    },

    //Route group for admin panel roles moderating
    {
        path: '/dashboard/roles',
        component: Admin, //Main component for this route group
        //Requirements to access this route group
        meta: {
            requiresAuth: true,
            requiredPermissions: ['access:dashboard', 'access:manage_roles'],
        },
        children: [
            //Route to show table with all roles
            {
                name: 'roles',
                path: '',
                component: Roles,
            },

            //Route for creating new role
            {
                name: 'role_create',
                path: 'create',
                component: RoleCreate,
            },

            //Route for editing single role
            {
                name: 'role_show',
                path: ':id',
                component: RoleShow,
            },
        ],
    },

    //Route group for admin panel posts moderating
    {
        path: '/dashboard/users',
        component: Admin, //Main component for this route group
        //Requirements to access this route group
        meta: {
            requiresAuth: true,
            requiredPermissions: ['access:dashboard', 'access:manage_users'],
        },
        children: [
            //Route to show table with all users
            {
                name: 'users',
                path: '',
                component: Users,
            },

            //Route for editing single user
            {
                name: 'user_show',
                path: ':id',
                component: UserShow,
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
        if(store.getters.user === undefined)
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
    if(to.matched.some(record => record.meta.requiredPermissions))
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
