import axios from 'axios';
import store from '../store/store';
import alert from './toast';

export function configureAxios() {
  axios.interceptors.request.use(config => {
    if (store.getters.isAuthenticated) {
      config.headers.Authorization = 'Token ' + store.state.user.token;
    }
    return config;
  });

  axios.interceptors.response.use(
    response => {
      return response;
    },
    function(error) {
      console.log(error.response);
      alert.showError(error.response.statusText, error.response.status, 5000);
      let originalRequest = error.config;
      // if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
      //   originalRequest._retry = true // now it can be retried
      //   return Vue.axios.post('/users/token', null).then((data) => {
      //     store.dispatch('authfalse')
      //     store.dispatch('authtruth', data.data)
      //     originalRequest.headers['Authorization'] = 'Bearer ' + store.state.token // new header new token
      //     return Vue.axios(originalRequest) // retry the request that errored out
      //   }).catch((error) => {
      //     for (let i = 0; i < error.response.data.errors.length; i++) {
      //       if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
      //         //auth.logout()
      //         return
      //       }
      //     }
      //   })
      // }
      if (error.response.status === 404 && !originalRequest._retry) {
        // originalRequest._retry = true
        // window.location.href = '/404'
        return;
      }
      // Do something with response error
      return Promise.reject(error);
    }
  );
}