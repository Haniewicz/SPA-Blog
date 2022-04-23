

<template>

<main role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-3">Witaj na haniewkowym blogu!</h1>
            <p>To tylko strona do zaprezentowania moich umiejętności. Jeśli szukasz tu czegoś ciekawego to źle trafiłeś ;)</p>
            <!--<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p> -->
        </div>
    </div>

    <div class="container">
        <!-- Example row of columns -->

        <div style="float: left;" class="col-md-9 posts">
            <a v-for="post in this.posts" href="#">
                <div class="card mb-4 box-shadow">
                    <img class="card-img-top max-card-img-height" src=" " alt="Card image cap">
                    <div class="card-body">
                        <h2>{{post.title}}</h2>
                        <p><small><b>{{post.created_at}} | <span style="color: #B41F1F">{{post.category}}</span></b></small></p>
                        <p class="card-text">{{post.content}}</p>
                    </div>
                </div>
            </a>
            <a href="#">
                <div class="card mb-4 box-shadow">
                    <img class="card-img-top max-card-img-height" src=" " alt="Card image cap">
                    <div class="card-body">
                        <h2>Testowy tytuł</h2>
                        <p><small><b>21.12.2021 | <span style="color: #B41F1F">Kategoria</span></b></small></p>
                        <p class="card-text"> To jest testowy wpis na tym blogu. Wiem że nie wszystko jeszcze wygląda jak powinno, ale bądźmy dobrej myśli ^_^</p>
                    </div>
                </div>
            </a>
            <hr>
            <div class="card mb-4 box-shadow">
                <img class="card-img-top max-card-img-height" src=" " alt="Card image cap">
                <div class="card-body">
                    <h2>Testowy tytuł</h2>
                    <p><small><b>21.12.2021 | <span style="color: #B41F1F">Kategoria</span></b></small></p>
                    <p class="card-text"> To jest testowy wpis na tym blogu. Wiem że nie wszystko jeszcze wygląda jak powinno, ale bądźmy dobrej myśli ^_^</p>
                </div>
            </div>
            <hr>
            <div class="card mb-4 box-shadow">
                <img class="card-img-top max-card-img-height" src=" " alt="Card image cap">
                <div class="card-body">
                    <h2>Testowy tytuł</h2>
                    <p><small><b>21.12.2021 | <span style="color: #B41F1F">Kategoria</span></b></small></p>
                    <p class="card-text"> To jest testowy wpis na tym blogu. Wiem że nie wszystko jeszcze wygląda jak powinno, ale bądźmy dobrej myśli ^_^</p>
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
            <a v-for="category in this.categories" href="/posts/category/">
                <div class="category">{{category.category}}</div>
            </a>
        </div>


    </div>
    <!-- /container -->
</main>

</template>

<script>

export default {

    data: function(){
        return {
            posts: [],
            categories: [],
        }
    },

    beforeMount() {
        //Request to get all posts
        this.$axios.get('api/posts').then(response=>{
            this.posts = response.data
        })

        //Reguest to get all categories
        this.$axios.get('api/categories').then(response=>{
            this.categories = response.data.data;
        })
    },

}

</script>
