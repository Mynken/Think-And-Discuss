import Vue from 'vue';

export default class ToastSrv {

    static showSuccess(summary, detail) {
        Vue.prototype.$toast.add({severity:'success', summary: summary, detail: detail, life: 3000});
    }
    static showInfo(summary, detail) {
        Vue.prototype.$toast.add({severity:'info', summary: summary, detail: detail, life: 3000});
    }
    static showWarn(summary, detail) {
        Vue.prototype.$toast.add({severity:'warn', summary: summary, detail: detail, life: 3000});
    }
    static showError(summary, detail, time) {
        Vue.prototype.$toast.add({severity:'error', summary: summary, detail: detail, life: time ? time : 3000});
    }
}