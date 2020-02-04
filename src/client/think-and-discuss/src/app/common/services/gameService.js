// import axios from "axios";
// import config from "config";
// import requestTypes from "Common/Consts/requestTypes";

// const routePrefix = config.apiUrl + "api/request/";

// const returnData = r => r.data;

// export default class RequestService {
//     /** Get request data */
//     static get(requestType, id, version) {
//         const address = version
//             ? `${routePrefix}${requestType}/${id}/version/${version}`
//             : `${routePrefix}${requestType}/${id}`;
//         return axios.get(address).then(returnData);
//     }

//     static getByTask(requestType, serialNumber) {
//         return axios.get(`${routePrefix}${requestType}/task/${serialNumber}`).then(returnData);
//     }
    
//     static getCreateModel(requestType) {
//         return axios.get(`${routePrefix}${requestType}/create`).then(returnData);
//     }

//     static create(requestType, model) {
//         return axios.post(`${routePrefix}${requestType}/create`, model).then(returnData);
//     }

//     static execute(requestType, model, serialNumber) {
//         return axios
//             .put(`${routePrefix}${requestType}/execute/${serialNumber}`, model)
//             .then(returnData);
//     }

//     static update(requestType, model) {
//         return axios.put(`${routePrefix}${requestType}`, model).then(returnData);
//     }

//     static loadFromXls(file, dictId) {
//         const formData = new FormData();
//         formData.append('file', file);

//         return axios.post(`${routePrefix}6001/localizations/loadFromXls/${dictId}`, formData).then(result => result.data);
//     }

//     static loadProductFromXls(file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         return axios.post(`${routePrefix}6001/products/loadFromXls`, formData).then(result => result.data);
//     }

//     static getAcceptorsData(costCenterMpkId, discountAmount) {
//         return axios.get(`${routePrefix}${requestTypes.promotionRequest}/acceptorsData`, {params: {costCenterMpkId, discountAmount}}).then(returnData);
//     }

//     static verifyAcceptorsData(costCenterMpkId) {
//         return axios.get(`${routePrefix}${requestTypes.promotionRequest}/verifyAcceptorsData/${costCenterMpkId}`).then(returnData);
//     }

//     static getCloneModel(parentId) {
//         return axios.get(`${routePrefix}${requestTypes.promotionRequest}/clone`, {params: {parentId}}).then(returnData);
//     }

//     static getCreateAnnexModel(parentId) {
//         return axios.get(`${routePrefix}${requestTypes.promotionRequest}/createAnnex`, {params: {parentId}}).then(returnData);
//     }

//     static cancelRequest(requestId, comment) {
//         return axios.post(`${routePrefix}${requestTypes.promotionRequest}/cancel`, {requestId, comment});
//     }

//     static getRequestSummaryLink(serialNumber) {
//         return `${routePrefix}${requestTypes.promotionRequest}/requestSummary?serialNumber=${serialNumber}`;
//     }
// }