import Vue from 'vue';
import Vuex from 'vuex';
// import {USER_UPDATE_INFO} from './actions';
import * as consts from './actions';

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

  actions: {
    updateUserInfo(context, payload) {
      context.commit(consts.USER_UPDATE_INFO, payload);
    }
  }
});

export default store;
