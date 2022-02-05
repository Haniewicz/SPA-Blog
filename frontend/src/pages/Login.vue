<template>
    <div class="container">
        <div class="form col-md-6">
            <p style="color: #B41F1F; font-size: 50px; font-family: URW Chancery L, cursive;">Zaloguj się</p>
            <div class="alert alert-danger print-error-msg" style="display:none">
                <ul></ul>
            </div>
            <Form :validation-schema="schema">
                <field type="text" name="name" id="name" v-model="formData.name" autocomplete="username" placeholder="Nazwa użytkownika"/>
                <field type="password" v-model="formData.password" name="password" id="password" autocomplete="current-password" placeholder="Hasło"/>
                <field class="checkbox" type="checkbox" v-model="formData.remember" id="remember" value="true" name="remember"/>
                <label for="remember">Zapamiętaj mnie!</label>
                <button type="submit" class="btn btn-primary" name="button" @click="handleSubmit">Zaloguj się</button>
            </Form>
            <router-link :to="{ name: 'register' }">
                Nie masz konta? Założysz je tutaj!
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
            name: yup.string().required("Nazwa użytkownika jest wymagana"),
            password: yup.string().required("Hasło jest wymagane"),
        });
        return {
            formData:
            {
                name: "",
                password: "",
                remember: null,
            },
            schema
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
                this.$axios.get('/sanctum/csrf-cookie').then(response => {
                    this.$axios.post('api/login', this.formData)
                        .then(response => {
                            if (response.data.success) {
                                this.$store.dispatch('token_update', response.data.token)
                                this.$store.dispatch('user_update', response.data.user)
                                this.$router.push('/')
                            } else {
                                printErrorMsg([response.data.message])
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
