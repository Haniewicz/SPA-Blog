export default{
    namespaced: true,

    state: {
        SelectedPost: [
        ], //information about currently presented post
    },

    mutations: {
        UPDATE_SELECTED_POST(state, payload){
            state.SelectedPost = payload
        }
    },

    actions: {
        selected_post_update(context, payload){
            const post = context.state.SelectedPost
            post.push(payload)
            context.commit('UPDATE_SELECTED_POST', post)
        }
    },

    getters: {
        SelectedPost: function(state){
            return state.SelectedPost[0]
        }
    },
}
