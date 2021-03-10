/* eslint no-param-reassign: "error" */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * require.context() is a special feature supported by webpack's compiler that 
 * allows you to get all matching modules starting from some base directory
 * param 1: path to the directory
 * param 2: an option to include sub directory (default = true)
 * param 3: a filter for control of the modules included
 */
const requireContext = require.context('./modules', false, /.*\.js$/);

const modules = requireContext
  .keys()
  .map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
  .reduce((modules, [name, moduleItem]) => {
    if (moduleItem.namespaced === undefined) {
      /**
       * Actions, mutations and getters are registered in the global namespace by default.
       * Define two getters with the same name in different, non-namespaced modules => error.
       * Therefore, to make your modules to be more self-contained & reusable => "namespaced: true".
       * Actions, mutations and getters will be automatically namespaced based on the path the module.
       * (dispatch|commit|getters)['namespace/(action_name|mutation_name|getter_name)']
       */
      moduleItem.namespaced = true;
    }

    /**
     * module-name: { state, mutations, getters, actions, namespaced }
     */
    return { ...modules, [name]: moduleItem };
  }, {});
  

  /**
   * Divide store into modules.
   * Each module can contain its own state, mutations, actions, getters, and even nested modules.
   */
export default new Vuex.Store({
  modules
});

