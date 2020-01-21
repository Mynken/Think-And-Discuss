import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from '../app/components/LoginForm.vue';
import IntialForm from '../app/components/InitialForm.vue';
import RegisterFrom from '../app/components/RegisterForm.vue';
import Home from '../app/components/Home.vue';
import GameInital from '../app/components/Game/GameInital.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Welcome',
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
        },
        {
            path: '/newGame',
            name: 'newGame',
            component: GameInital
        }
    ]
});

export default router;