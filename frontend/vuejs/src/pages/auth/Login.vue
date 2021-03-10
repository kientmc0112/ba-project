<!-- <template>
    <div class="col-md-8 offset-md-2 pt-100">
        <div class="card">
            <article class="card-body">
                <a href="" class="float-right btn btn-outline-primary" @click.prevent="changeType('register')">Register</a>
                <h4 class="card-title mb-4 mt-1">Login</h4>
                <hr>
                <form @submit.prevent="onLogin()">
                    <div class="form-group">
                        <input name="" class="form-control" placeholder="Email or login" type="email" v-model="email">
                    </div>
                    <div class="form-group">
                        <input class="form-control" placeholder="******" type="password" v-model="password">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Login</button>
                            </div>
                        </div>
                        <div class="col-md-6 text-right">
                            <a class="small" href="#">Forgot password?</a>
                        </div>
                    </div>
                </form>
            </article>
        </div>
    </div>
</template> -->
<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Login</div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="error">
                    <p>Erreur, impossible de se connecter avec ces identifiants.</p>
                </div>
                <form autocomplete="off" @submit.prevent="onLogin()" method="post">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" placeholder="********" v-model="password" required>
                    </div>
                    <button type="submit" class="btn btn-info">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    computed: {
        loggedIn () {
            return this.$store.state.loggedIn;
        }
    },
    created () {
        if (this.loggedIn) {
            this.$router.push('/');
        }
    },
    methods: {
        ...mapActions('auth', [
            'login'
        ]),

        onLogin () {
            const parameter = {
                email: this.email,
                password: this.password
            }
            this.login(parameter)
                .then(() => {
                    this.$router.push({ name: 'home' });
                }).catch(() => {
                    console.log(1);
                })
        }
    }
}
</script>
