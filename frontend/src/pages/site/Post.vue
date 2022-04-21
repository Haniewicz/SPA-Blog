<template>
    <div class="container post">
        <!--Post content section-->

        <div style="float: left;" class="col-md-9 posts">
            <div class="card mb-4 box-shadow">
                <img class="card-img-top max-card-img-height" src="http://localhost:8000/images/img.jpg" alt="Card image cap">
                <div class="card-body">
                    <h2>{{Post.title}}</h2>
                    <p><small><b>{{Post.created_at}} | <span style="color: #B41F1F">{{Post.category}}</span></b></small></p>
                    <p class="card-text">{{Post.content}}</p>
                </div>
            </div>
        </div>


        <div style="float: left;" class="col-md-3 right-panel">
            <h2 style="margin-bottom: 0px;">O Mnie</h2>
            <hr>
            <p>No witam. Jestem młody chłopaczek co to uczy się programowania, bo praca w markecie to jednak nie jest szczyt moich ambicji.</p>
        </div>
        <div style="float: left;" class="col-md-3 categories right-panel">
            <h2 style="margin-bottom: 0px;">Kategorie</h2>
            <hr>
            <a href="#">
                <div class="category">Kategoria 1</div>
            </a>
            <a href="#">
                <div class="category">Kategoria 2</div>
            </a>
        </div>
    </div>
    <!-- /container -->
</template>

<script>
export default {
    data: function(){
        return {
            Post: [],
            Categories: [],
        }
    },

    beforeMount() {
        //Request to get post data
        this.$axios.get('api/posts/'+this.$route.params.id).then(response=>{
            this.Post = response.data;
        })

        //Reguest to get all categories
        this.$axios.get('api/categories').then(response=>{
            console.log(response.data)
            this.Categories = response.data;
        })
    },

}
</script>
