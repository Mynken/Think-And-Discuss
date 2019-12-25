import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from '../app/components/LoginForm.vue';
import IntialForm from '../app/components/InitialForm.vue';
import RegisterFrom from '../app/components/RegisterForm.vue';
import Home from '../app/components/Home.vue';
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Login',
            component: IntialForm
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginForm
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterFrom
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        }
    ]
});

export default router;