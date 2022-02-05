<template>
    <div class="container">
        <div class="form col-md-6">
            <p style="color: #B41F1F; font-size: 50px; font-family: URW Chancery L, cursive;">Zaloguj się</p>
            <div class="alert alert-danger print-error-msg" style="display:none">
                <ul></ul>
            </div>
            <form action="#">
                <input type="text" name="name" id="name" v-model="formData.name" autocomplete="username" placeholder="Nazwa użytkownika">
                <input type="password" v-model="formData.password" name="password" id="password" autocomplete="current-password" placeholder="Hasło">
                <input class="checkbox" type="checkbox" id="remember" value="remember" name="remember">
                <label for="remember">Zapamiętaj mnie!</label>
                <button type="submit" class="btn btn-primary" name="button" @click="handleSubmit">Zaloguj się</button>
            </form>
            <a href="/register">Nie masz konta? Założysz je tutaj!</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData:
            {
                name: "",
                password: "",
                error: null
            }
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            if (this.formData.password.length > 0) {
                this.$axios.get('/sanctum/csrf-cookie').then(response => {
                    this.$axios.post('api/login', this.formData)
                        .then(response => {
                            if (response.data.success) {
                                this.$store.dispatch('token_update', response.data.token)
                                this.$store.dispatch('user_update', response.data.user)
                                this.$router.push('/')
                            } else {
                                this.error = response.data.message
                            }
                        })
                        .catch(error => {
                            if(error.response !== 'undefined')
                            {
                                if (error.response.status == 422){
                                    printErrorMsg(error.response.data.errors)
                                }
                            }
                        })
                })
            }
        }

    },
}
</script>
