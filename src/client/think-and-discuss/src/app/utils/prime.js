import Vue from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Panel from "primevue/panel";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Editor from "primevue/editor";
import Dropdown from "primevue/dropdown";

export function configurePrimeComponents() {
  Vue.component("InputText", InputText);
  Vue.component("Button", Button);
  Vue.component("Toast", Toast);
  Vue.component("Panel", Panel);
  Vue.component("Editor", Editor);
  Vue.component("Dropdown", Dropdown);

  Vue.use(ToastService);
}
