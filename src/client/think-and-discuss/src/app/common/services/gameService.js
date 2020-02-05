import consts from '../consts/consts';

const routePrefix = consts.config.apiUrl + 'api/game/';
import axios from 'axios';
//const returnData = r => r.data;

export default class GameService {

    // static getCreateModel(requestType) {
    //     return axios.get(`${routePrefix}${requestType}/create`).then(returnData);
    // }

    static create(model) {
        return axios.post(`${routePrefix}create`, model);
    }

    // static execute(requestType, model, serialNumber) {
    //     return axios
    //         .put(`${routePrefix}${requestType}/execute/${serialNumber}`, model)
    //         .then(returnData);
    // }


    // static loadFromXls(file, dictId) {
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     return axios.post(`${routePrefix}6001/localizations/loadFromXls/${dictId}`, formData).then(result => result.data);
    // }


    // static getAcceptorsData(costCenterMpkId, discountAmount) {
    //     return axios.get(`${routePrefix}${requestTypes.promotionRequest}/acceptorsData`, {params: {costCenterMpkId, discountAmount}}).then(returnData);
    // }

    // static verifyAcceptorsData(costCenterMpkId) {
    //     return axios.get(`${routePrefix}${requestTypes.promotionRequest}/verifyAcceptorsData/${costCenterMpkId}`).then(returnData);
    // }
}