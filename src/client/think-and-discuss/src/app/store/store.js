import Vue from 'vue';
import Vuex from 'vuex';
// import counter1 from './modules/user.module';
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex);
const store = new Vuex.Store({
    // strict: true,
    strict: process.env.NODE_ENV !== 'production',
    state: {
        user: {
            _id: '',
            email: '',
            token: ''
        }
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
        updateUserInfo(state, data) {
            state.user = data.user;
        }
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