<template>
    <table class="table table-bordered display" id="table_id">
    <thead>
        <th>Id</th>
        <th>Data utworzenia</th>
        <th>Tytuł</th>
        <th>Kategoria</th>
        <th>Ścieżka obrazu</th>
        <th>Operacje</th>
    </thead>
    <tbody>
        <tr v-for="(post, index) in this.posts">
            <td>{{post.id}}</td>
            <td>{{post.created_at}}</td>
            <td>{{post.title}}</td>
            <td>{{post.category}}</td>
            <td>{{post.image_path}}</td>
            <td>
                <router-link class="edit btn btn-primary" :to="{ name: 'post_show', params: { id: post.id } }">
                    Edytuj
                </router-link>
                <a href="#" class="delete btn btn-danger" @click="delete_post(post.id, index)" title="Delete">Usuń</a>
            </td>
        </tr>
</tbody>
</table>
</template>
<script>
export default{
    data: function(){
        return {
            posts: [],
        }
    },

    methods: {
        delete_post: function(id, index){
            this.$axios.get('sanctum/csrf-cookie').then(response => {
                this.$axios.post('api/posts/delete/', [id])
                .then(response => {
                    if(response.data){
                        this.posts.splice(index, 1)
                        alert("usunięto post")
                    }
                })
            })
        },
    },

    beforeMount(){
        //Request to get all posts
        this.$axios.get('api/posts').then(response=>{
            this.posts = response.data
            console.log(this.posts)
        })
    }

}
</script>
