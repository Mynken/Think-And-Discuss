import Vue from 'vue';
import App from './App.vue';
import router from './app/router/index';
import store from './app/store/store';
import VueSocketIO from 'vue-socket.io';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:8000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    // options: { path: "/my-app/" } //Optional options
}));

import { configurePrimeComponents } from './app/utils/prime';
import { configureErrorReporting } from './app/utils/axios';

configurePrimeComponents();
configureErrorReporting();

new Vue({
    render: h => h(App),
    router,
    store,
    template: '<App/>',
    components: { App }
}).$mount('#app');