//Module for keeping and passing informations between pages on site
export default
{
    state:{
        globalComponent: localStorage.getItem('globalComponent') || "",
        globalMessage: "",
        globalApiResponse:
        {
            status: "",
            message: "",
            error: ""
        },
    },

    mutations:{
        UPDATE_GLOBAL_COMPONENT(state, payload) {
            state.globalComponent = payload
        },
    },

    actions:{
        globalComponent_update(context, payload) {
            localStorage.setItem('globalComponent', payload)
            context.commit('UPDATE_GLOBAL_COMPONENT', payload)
        },
    },

    getters:{
        globalMessage: function (state) {
            return state.globalMessage
        },
        globalComponent: function (state) {
            return state.globalComponent
        },
    }
}
