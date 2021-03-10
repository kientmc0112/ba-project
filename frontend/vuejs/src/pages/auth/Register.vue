<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Register</div>
            <div class="card-body">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form autocomplete="off" @submit.prevent="handleSubmit(onRegister)">
                        <ValidationProvider rules="required|min:1|max:32" v-slot="{ errors }">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="name" class="form-control" placeholder="Yui Hatano" v-model="form.name">
                                <span class="error">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>
                        <ValidationProvider rules="required|email" v-slot="{ errors }">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" placeholder="user@example.com" v-model="form.email">
                                <span class="error">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>
                        <ValidationProvider rules="required|min:1|max:12" v-slot="{ errors }">
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" placeholder="********" v-model="form.password">
                                <span class="error">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>
                        <button type="submit" class="btn btn-info">Register</button>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'Register',
        data () {
            return {
                form: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions('auth', [
                'register'
            ]),

            async onRegister () {
                const parameter = {
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password
                }
                await this.register(parameter)
                    .then(response => {
                        console.log(response);
                        this.$router.push({path: '/login'});
                    })
                    .catch(() => {
                        console.log(1);
                    })
            }
        }
    }
</script>

<style>
    .error {
        color: red;
    }
</style>
