

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
            <a href="#">
                <div class="category">Kategoria 1</div>
            </a>
            <a href="#">
                <div class="category">Kategoria 2</div>
            </a>
        </div>


    </div>
    <!-- /container -->
</main>

</template>

<script>

export default {

}

</script>
