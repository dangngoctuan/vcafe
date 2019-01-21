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
    uriMenus: 'menus',
    coffee_tables: [],
    menus: [],
    loadingTables: false,
    loadingMenus: false,
    userObj: {},
    logging_in: false,
    table_order: [],
    table_total_bil: []
  }
});

export default store;
