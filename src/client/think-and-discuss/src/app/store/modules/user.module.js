// import * as types from '../types';
import { getField, updateField } from 'vuex-map-fields';

const state = {
    counter: 0
};

const getters = {
    getUserCounter(state) {
        console.log(state);
        return getField(state.counter);
    },
};

const mutations = {
    updateUserCounter(state, field) {
        updateField(state.counter, field);
    },
};

const actions = {

    qwerty: (store, data) => {
            console.log('SETSTOCK in stock');
            store.commit('updateUserCounter', data);
        }
        // [types.COUNTER_INCREMENT]: ({ commit }, payload) => {
        //     commit(types.MUTATE_INCREMENT_COUNTER, payload);
        // },
        // [types.COUNTER_DECREMENT]: ({ commit }, payload) => {
        //     commit(types.MUTATE_DECREMENT_COUNTER, payload);
        // },
        // [types.COUNTER_INCREMENT_ASYNC]: ({ commit }, payload) => {
        //     setTimeout(() => {
        //         commit(types.MUTATE_INCREMENT_COUNTER, payload.by);
        //     }, payload.duration);
        // },
        // [types.COUNTER_DECREMENT_ASYNC]: ({ commit }, payload) => {
        //     setTimeout(() => {
        //         commit(types.MUTATE_DECREMENT_COUNTER, payload.by);
        //     }, payload.duration);
        // }
};

export default {
    state,
    mutations,
    actions,
    getters
};