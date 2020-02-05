import consts from '../consts/consts';

const routePrefix = consts.config.apiUrl + 'api/users/';
import axios from 'axios';

export default class UserSrv {

    static logIn(model) {
        return axios.post(`${routePrefix}login`, model);
    }

    static register(model) {
        return axios.post(`${routePrefix}`, model);
    }
}