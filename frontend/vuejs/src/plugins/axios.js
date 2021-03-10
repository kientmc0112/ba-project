import axios from 'axios';
import router from "../router/router";
import Cookie from "js-cookie";
import Vue from "vue";

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const vm = new Vue({});
    if (error.response.status === 401) {
      Cookie.remove("ecs_user_jwt_token");
      router.push({ name: "login" });

      return Promise.reject(error);
    }
    let dcm = 'dcm';
    // let msg = i18n.t(`error.default`);
    if (error.response.status === 422) {
      let messages = error.response.data.error.message;
      let firstKey = Object.keys(messages)[0];
      let firstValue = messages[firstKey][0];
      let part = firstValue.slice(
        firstValue.indexOf(".") + 1,
        firstValue.length
      );
      dcm = firstKey + part;
      // msg = i18n.t(`error.validation.${firstKey}.${part}`);
    } else {
      if (error.response.data.error.code) {
        dcm = error.response.data.error.code;
        // msg = i18n.t(`error.${error.response.data.error.code}`);
      }
    }
    vm.$bvToast.toast(dcm + "!", {
      title: 'dcm',
      noCloseButton: false,
      autoHideDelay: 10000,
      appendToast: true,
      toaster: "b-toaster-top-center",
      variant: "danger",
      solid: true
    });

    return Promise.reject(error);
  }
);

export default axios;