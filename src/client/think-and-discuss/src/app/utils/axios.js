// import { ToastTypes } from "fabrity-react-core/lib/Common/Toast/consts";
// import { SubmissionError } from "redux-form";
// import {
//     modelStateToValidationErrors,
//     typedModelStateToValidationErrors
// } from "fabrity-react-core/lib/Common/Utils/helpers";
// import get from "lodash/get";
// import React from "react";
// import * as toastActions from "fabrity-react-core/lib/Common/Toast/actions";
// import * as messageBoxActions from "fabrity-react-core/lib/Common/MessageBox/actions";
// import businessExceptionTypes from "Common/Consts/businessExceptionTypes";
// import { replace } from "react-router-redux";
// import urls from "Common/Consts/urls";
// import { dateTime } from "fabrity-react-core/lib/Common/Utils/format";
// function doNothing(config) {
//     return config;
// }

// /**
//  * Automatically dispatch error actions on API errors.
//  * If you add disableErrorReporting: true to axios config during a request it won't fire for that request.
//  * @param {*} axios
//  * @param {*} store
//  * @param {*} langs
//  * @param {String} pathToMessage Path to error message in data returned by back-end
//  * @param {error => boolean} shouldNotHandle predicate whether an error should be ignored
//  */
// export function configureErrorReporting(
//     axios,
//     store,
//     langs,
//     pathToMessage = "Message",
//     shouldNotHandle = error => false
// ) {
//     const pathToMessageInResponse = pathToMessage ? `data.${pathToMessage}` : "data";

//     axios.interceptors.response.use(
//         //on success
//         doNothing,

//         //on error
//         function(error) {
//             if (error.config && error.config.disableErrorReporting) return Promise.reject(error);

//             const response = error.response || error;

//             if (shouldNotHandle && shouldNotHandle(response)) return Promise.reject(error);
//             if (response.status === 403 || response.status === 401) {
//                 store.dispatch(replace("/errors/access-denied"));
//                 return Promise.reject(error);
//             }
//             if (response.status === 400 && response.data && response.data.modelState)
//                 throw new SubmissionError(
//                     modelStateToValidationErrors(response.data, undefined, true)
//                 );

//             const msg = get(response, pathToMessageInResponse);
//             if (response.status === 400) {
//                 if (response.data.message) {
//                     store.dispatch(toastActions.displayNotification(langs.labels.Error(), response.data.message, ToastTypes.error));
//                     return;
//                 }
//                 if (handleBussinessException(response.data, store, langs))
//                     return Promise.reject(error);
//             }
//             store.dispatch(
//                 toastActions.displayNotification(
//                     langs.labels.Error(),msg||
//                     <p>
                        
//                         <span>{langs.errors.UnknownError()} </span>
//                         <br />
//                         {response.data && response.data.correlationId && 
//                             <React.Fragment>
//                                 <span>{`${langs.errors.ErrorId()}: ${response.data && response.data.correlationId  }` }</span>
//                                 <br />
//                             </React.Fragment> }
//                         {response.data && response.data.dateTime && 
//                             <React.Fragment>
//                                 <span>{`${langs.errors.ErrorDate()}: ${dateTime(response.data && response.data.dateTime)}`}</span>
//                                 <br />
//                             </React.Fragment>}
//                         <span>{langs.errors.PleaseSendThisInformationToYourAdministrator()}</span>
//                         <br />
//                     </p>,
//                     ToastTypes.error,
//                     true
//                 )
//             );

//             return Promise.reject(error);
//         }
//     );
// }

// function handleBussinessException(exceptionData, store, langs) {
//     if (exceptionData && exceptionData.exceptionType) {
//         switch (exceptionData.exceptionType) {
//             case businessExceptionTypes.TaskAlreadyExecuted:
//                 store.dispatch(
//                     messageBoxActions.displayNotification(
//                         langs.labels.Error(),
//                         langs.errors.TaskAlreadyExecuted(),
//                         urls.taskListUrl
//                     )
//                 );
//                 return true;
//             case businessExceptionTypes.NoPermissions:
//                 store.dispatch(
//                     messageBoxActions.displayNotification(
//                         langs.labels.Error(),
//                         langs.errors.InsufficientPermissions(),
//                         urls.taskListUrl
//                     )
//                 );
//                 return true;
//             case businessExceptionTypes.NoConnectionWithDb:
//                 store.dispatch(
//                     messageBoxActions.displayNotification(
//                         langs.labels.Error(),
//                         langs.errors.ServerLostConnectionWithDb()
//                     )
//                 );
//                 return true;
//             default:
//                 return false;
//         }
//     }

//     return false;
// }