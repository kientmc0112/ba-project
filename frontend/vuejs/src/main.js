import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import plugins from '@/plugins'
import { ValidationProvider, ValidationObserver, configure, extend } from 'vee-validate'
import { loadVeeValidateExtend } from "./plugins/vee-validate"
import * as rules from "vee-validate/dist/rules"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(plugins)
configure({
  defaultMessage: (field, values) => {
    // override the field name.
    // values._field_ = i18n.t(`fields.${field}`);
    // console.log(values._field_);

    // if (field === "password_confirm") {
    //   values.target = i18n.t(`fields.target.${field}`);
    // }

    // return i18n.t(`validation.${values._rule_}`, values);
    return field + values;
  }
});
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
loadVeeValidateExtend()
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
