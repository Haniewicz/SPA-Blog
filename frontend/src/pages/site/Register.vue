<template>
    <div class="container">
    <div class="form col-md-6">
        <p style="color: #B41F1F; font-size: 50px; font-family: URW Chancery L, cursive;">Zarejestruj się</p>
        <div class="alert alert-danger print-error-msg" style="display:none">
            <ul></ul>
        </div>
        <form :validation-schema="schema">
            <field type="text" v-model="formData.name" name="name" autocomplete="name" placeholder="Nazwa użytkownika"/>
            <field type="email" v-model="formData.email" name="email" autocomplete="email" placeholder="Adres e-mail"/>
            <field type="password" v-model="formData.password" name="password" autocomplete="password" placeholder="Hasło"/>
            <field type="password" v-model="formData.password_confirmation" name="password_confirmation" autocomplete="password_confirmation" placeholder="Potwierdź hasło"/>
            <button type="submit" class="btn btn-primary" name="button" @click="handleSubmit">Zarejestruj się</button>
        </form>
        <router-link :to="{ name: 'login' }">
            Masz już konto? Zaloguj się!
        </router-link>
    </div>
</div>
</template>

<script>
import { Field, Form} from 'vee-validate';
import * as yup from 'yup';
export default {
    components: {
        Field,
        Form,
    },
    data() {
        const schema = yup.object().shape({
            name: yup.string().min(4, "Nazwa użytkownika musi mieć minimum 4 znaki").max(20,"Nazwa użytkownika może mieć maksymalnie 20 znaków").required("Nazwa użytkownika jest wymagana"),
            email: yup.string().required("Email jest wymagany").email("Email jest niepoprawny"),
            password: yup.string().min(5, "Hasło musi mieć minimum 5 znaków").required("Hasło jest wymagane"),
        });
        return {
            formData:
            {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            schema,
        }
    },
    methods: {
        validation(schema){

            try
            {
                schema.validateSync(this.formData, { abortEarly: false })
                return true
            } catch (err) {
                // err is of type ValidationError
                printErrorMsg(err.errors)
                return false
            }

        },
        handleSubmit(e) {
            e.preventDefault()
            if (this.validation(this.schema)) {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/register', this.formData)
                        .then(response => {
                            if (response.data.success) {
                                this.$router.push('/login')
                            } else {
                                printErrorMsg([response.data.message])
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
