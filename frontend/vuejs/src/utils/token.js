import Cookies from 'js-cookie';

const ACCESS_TOKEN = 'access_token';

export default {
  getToken() {
    return Cookies.get(ACCESS_TOKEN);
  },

  setToken(accessToken) {
    Cookies.set(ACCESS_TOKEN, accessToken);
  },

  removeToken() {
    Cookies.remove(ACCESS_TOKEN);
  }
};
