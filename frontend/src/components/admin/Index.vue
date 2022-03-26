

<template>

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="/css/dashboard.css">


    <div id="viewport">
              <!-- Sidebar -->
              <div id="sidebar">
                <header>
                  <a href="#">Panel administratora</a>
                </header>
                <ul class="nav">
                  <li>
                    <a href="/add_post">
                      <i class="zmdi zmdi-link"></i> Dodaj wpis
                    </a>
                  </li>
                  <li>
                    <a href="/posts">
                      <i class="zmdi zmdi-link"></i> Lista wpisów
                    </a>
                  </li>
                  <li>
                    <a href="/users">
                      <i class="zmdi zmdi-link"></i> Lista użytkowników
                    </a>
                  </li>
                  <li>
                    <a href="/roles">
                      <i class="zmdi zmdi-link"></i> Zarządzaj rolami
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="zmdi zmdi-info-outline"></i> About
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="zmdi zmdi-settings"></i> Services
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="zmdi zmdi-comment-more"></i> Contact
                    </a>
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
