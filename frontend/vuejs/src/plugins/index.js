import axios from "./axios";

export default {
	install(Vue) {
		Vue.directive("focus", {
			inserted: function (el) {
				el.focus();
			}
    });
    
		Vue.prototype.$axios = axios;
	}
};