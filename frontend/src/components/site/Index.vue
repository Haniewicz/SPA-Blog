

<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="../css/jumbotron.css">
    <link type="text/css" rel="stylesheet" href="../css/auth.css">

<div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container">
            <router-link class="navbar-brand" data-toggle="collapse" :to="{ name: 'home' }">
                <b>HANIEWKA</b> <span style="color: #B41F1F">BLOG</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav w-100 mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" data-toggle="collapse" :to="{ name: 'home' }">
                            Strona główna
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" data-toggle="collapse" :to="{ name: 'home' }">
                            Kontakt
                        </router-link>
                    </li>
                    <li v-if="$store.getters.token" style="text-align: right;" class="nav-item dropdown ml-auto align-right">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{$store.getters.user?.name}}</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                            <router-link class="dropdown-item" data-toggle="collapse" :to="{ name: 'profile' }">
                                Profil
                            </router-link>

                            <router-link v-if="this.AdminPanelAccess == true" class="dropdown-item" data-toggle="collapse" :to="{ name: 'dashboard' }">
                                Panel Administratora
                            </router-link>

                            <a href="#" class="dropdown-item" @click="logout">Wyloguj</a>
                        </div>
                    </li>
                    <li v-else class="nav-item ml-auto">
                        <router-link class="nav-link log-in" data-toggle="collapse" :to="{ name: 'login' }">
                            <b>Zaloguj się</b>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <router-view></router-view>
    <div class="container">
        <div style="clear: both;"></div>
        <hr style="border-color: #B41F1F;">
    </div>
    <footer>
        <p>HaniewkaBlog 2022 - Wszelkie prawa zastrzeżone</p>
    </footer>

</div>

</template>

<script>
export default {

    data: function(){
        return{
            AdminPanelAccess: false,
        }
    },

    methods: {
        logout: function(){
            this.$axios.get('sanctum/csrf-cookie').then(response => {
                this.$axios.post('api/logout')
                    .then(response => {
                        this.$router.push('/login')
                        this.$store.dispatch('logout')
                    })
                })
        }
    },

    beforeMount(){
        this.$axios.get('sanctum/csrf-cookie').then(response => {
            this.$axios.post('api/check_permissions', 'access:dashboard')
                .then(response => {
                    if(response.data){
                        this.AdminPanelAccess = true;
                    }
                })
            })
    },
};


</script>
