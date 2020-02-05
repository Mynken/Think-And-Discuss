import Vue from 'vue';
import store from '../store/store';
import Router from 'vue-router';
import LoginForm from '../components/LoginForm';
import IntialForm from '../components/InitialForm';
import RegisterFrom from '../components/RegisterForm';
import Home from '../components/Home';
import GameInital from '../components/Game/GameInital';
import CreateGame from '../components/Game/CreateGame';
import NotFound from '../components/common/NotFound';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Welcome',
            component: IntialForm,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
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
            component: Home,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/game/:id',
            name: 'game',
            component: GameInital,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/createGame',
            name: 'createGame',
            component: CreateGame,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
            meta: { 
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) next('/login');
        else next();
    }
    else next();
});

export default router;