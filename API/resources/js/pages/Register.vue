<template>
    <div class="container">
    <div class="form col-md-6">
        <p style="color: #B41F1F; font-size: 50px; font-family: URW Chancery L, cursive;">Zarejestruj się</p>
        <div class="alert alert-danger print-error-msg" style="display:none">
            <ul></ul>
        </div>
        <form data-ajax="true" action="/register" method="post">
            <input type="text" v-model="formData.name" name="name" placeholder="Nazwa użytkownika">
            <input type="email" v-model="formData.email" name="email" placeholder="Adres e-mail">
            <input type="password" v-model="formData.password" name="password" placeholder="Hasło">
            <input type="password" v-model="formData.password_confirmation" name="password_confirmation" placeholder="Potwierdź hasło">
            <button type="submit" class="btn btn-primary" name="button" @click="handleSubmit">Zarejestruj się</button>
        </form>
        <a href="/login">Masz już konto? Zaloguj się!</a>
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
                email: "",
                password: "",
                error: null,
            },
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            if (this.formData.password.length > 0) {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/register', this.formData)
                        .then(response => {
                            if (response.data.success) {
                                this.$router.push('/login')
                            } else {
                                this.error = response.data.message
                            }
                        })
                        .catch(error => {
                            if (error.response.status == 422){
                                printErrorMsg(error.response.data.errors)
                            }
                        })
                })
            }
        }
    },
}
</script>
