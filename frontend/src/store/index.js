import { createStore } from 'vuex'
import axios from 'axios'
import CrossPageInformationModule from './CrossPageInformation.module.js'
import PostModule from './Post.module.js'

export default createStore({
    state: {
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
        user: []
      },
    mutations: {
        UPDATE_TOKEN(state, payload) {
            state.token = payload
        },
        UPDATE_USER(state, payload) {
            state.user = payload
        },
        LOGOUT(state){
            state.token = ""
            state.user = []
        }
    },
    actions: {
        token_update(context, payload) {
            sessionStorage.setItem('token', payload)
            context.commit('UPDATE_TOKEN', payload)
        },
        token_remember(context, payload) {
            localStorage.setItem('token', payload)
        },
        user_update(context, payload) {
            const user = context.state.user
            user.push(payload)
            context.commit('UPDATE_USER', user)
        },
        logout(context)
        {
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            context.commit('LOGOUT')
        }
    },
    getters: {
        token: function (state) {
            return state.token
        },
        user: function(state)
        {
            return state.user[0]
        }
    },
    modules: {
        information: CrossPageInformationModule,
        post: PostModule,
    }
})
