import axios from 'axios'
import Cookies from "js-cookie";
import * as types from "../mutation-types"

/**
 * snake_case || camelCase
 * Avoid having more than one instance of an object.
 */
export const state = {
  token: Cookies.get("ba_project_jwt_token"),
  account: []
};

/**
 * camelCase
 * Start from 'is' when returns Boolean, or 'get' otherwise.
 * Answer to question what is it returning?
 * Contain module name to ensure that getter is unique.
 */
export const getters = {
  getToken: state => state.token,
  getAccount: state => state.account
};

/**
 * UPPER_SNAKE_CASE
 */
export const mutations = {
  [types.AUTH.SET_TOKEN](state, token) {
    state.token = token;
  },
  // REGISTER: (state, res) => {
    //   state.statusRegister = res;
  // }
};
  
/**
 * camelCase
 * Fetch something from the server(or cache) — in this case, they have to be asynchronous (return promise).
 * Mutate state of current module.
 * Dispatch actions from the same module (to avoid repeating logic).
 * Dispatch actions from another module (only if it’s absolutely required).
 */
export const actions = {
  login ({ commit }, credential) {
    return new Promise((res, rej) => {
      axios.post('api/login', credential)
        .then(response => {
          commit(types.AUTH.SET_TOKEN, response.access_token);
          Cookies.set("ba_project_jwt_token", response.access_token, {
            expires: response.expires_in / 86400
          });
          res(response);
        })
        .catch(error => {
          rej(error);
        })
    })
  },
  // async register ({ commit }, credential) {
  //   return new Promise((res, rej) => {
  //     axios.post('api/register', credential)
  //       .then(result => {
  //         commit('setToken', null);
  //         res(result);
  //       })
  //       .catch(error => {
  //         rej(error);
  //       })
  //   });
    // commit('REGISTER', response.status);
    // const { data } = await axios
    // .post('api/register', credential)
    // .then(res => res)
    // .catch(error => {
    //   return error;
    // });
    // return data;
  // },
  // getAuth ({ commit }, token) {
  //   return new Promise((res, rej) => {
  //     axios.get('api/me/' + token)
  //       .then(result => {
  //         res(result);
  //       })
  //       .catch(error => {
  //         commit('setToken', null);
  //         rej(error);
  //       })
  //   })
  // }
}
