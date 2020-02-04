import Vue from 'vue';
import Vuex from 'vuex';
// import counter1 from './modules/user.module';


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

    getters: {
        isAuthenticated: state => {
            return !!state.user.token;
          }
    },
    mutations: {
        updateUserInfo(state, data) {
            state.user = data.user;
        }
    },

    // modules: {
    //     user: counter1,
    // }
});

export default store;