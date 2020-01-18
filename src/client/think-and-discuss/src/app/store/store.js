import Vue from 'vue';
import Vuex from 'vuex';
// import counter1 from './modules/user.module';
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex);
const store = new Vuex.Store({
    // strict: true,
    strict: process.env.NODE_ENV !== 'production',
    state: {
        id: '',
        email: '',
        token: ''
    },
    // mutations: {
    //     increment(state) {
    //         state.count++;
    //     }
    // },
    getters: {
        getField,
    },
    mutations: {
        updateField,
    },
    // getters: {
    //     upCount: state => {
    //         return state.count + 1;
    //     }
    // },

    // modules: {
    //     user: counter1,
    // }
});

export default store;