/**
 * reference
 * https://github.com/weexteam/weex-hackernews/tree/master/src/store
 */

import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    uriTables: 'coffee_tables',
    coffee_tables: [],
    loadingTables: false,
    userObj: {},
    logging_in: false,
  }
});

export default store;
