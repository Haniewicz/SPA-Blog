import { createStore } from 'vuex'
import axios from 'axios'
import CrossPageInformationModule from './CrossPageInformation.module.js'

export default createStore({
    state: {
        token: sessionStorage.getItem('token') || localStorage.getItem('token') || '',
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
        token_update(context, payload, remember) {
            if(remember == true)
            {
                localStorage.setItem('token', payload)
            }else{
                sessionStorage.setItem('token', payload)
            }
            context.commit('UPDATE_TOKEN', payload)
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
        information: CrossPageInformationModule
    }
})
