import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './app/store/store';
import VueSocketIO from 'vue-socket.io';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Editor from 'primevue/editor';

Vue.use(ToastService);

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:8000',
    // vuex: {
    //     store,
    //     actionPrefix: 'SOCKET_',
    //     mutationPrefix: 'SOCKET_'
    // },
    // options: { path: "/my-app/" } //Optional options
}));


Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Toast', Toast);
Vue.component('Panel', Panel);
Vue.component('Editor', Editor);

Vue.config.productionTip = false;

import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store,
    template: '<App/>',
    components: { App }
}).$mount('#app');