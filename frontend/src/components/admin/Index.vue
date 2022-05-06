

<template>

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="/css/dashboard.css">


    <div id="viewport">
              <!-- Sidebar -->
              <div id="sidebar">
                <header>
                    <router-link :to="{ name: 'dashboard' }">Panel administratora</router-link>
                </header>
                <ul class="nav">
                  <li>
                    <router-link :to="{ name: 'post_create' }"><i class="zmdi zmdi-link"></i> Dodaj wpis</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'posts' }"><i class="zmdi zmdi-link"></i> Lista wpisów</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'category_create' }"><i class="zmdi zmdi-link"></i> Dodaj kategorię</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'categories' }"><i class="zmdi zmdi-link"></i> Lista kategorii</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'role_create' }"><i class="zmdi zmdi-link"></i> Dodaj rolę</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'roles' }"><i class="zmdi zmdi-link"></i> Lista ról</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'users' }"><i class="zmdi zmdi-link"></i> Lista użytkowników</router-link>
                  </li>
                </ul>
              </div>
              <!-- Content -->
              <div id="content">
                <nav class="navbar navbar-default">
                  <div class="container-fluid">
                    <ul class="nav navbar-nav navbar-right">
                      <li>
                        <a href="#"><i class="zmdi zmdi-notifications text-danger"></i>
                        </a>
                      </li>
                      <li><a href="#" style="color:green">{{$store.getters.user?.name}}</a></li>
                      <li><a href="/logout" style="color:red">Wyloguj</a></li>
                    </ul>
                  </div>
                </nav>
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
              </div>
            </div>

</template>


<script>
export default {
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
};


</script>
