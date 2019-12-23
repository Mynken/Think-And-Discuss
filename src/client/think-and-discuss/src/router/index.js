import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from '../app/components/LoginForm.vue';
import IntialForm from '../app/components/InitialForm.vue'

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
        }
    ]
});

export default router;