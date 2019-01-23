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
    coffeeTables: [],
    menus: [],
    loadingTables: false,
    loadingMenus: false,
    logging_in: false,
    loadingCheckout: false,
    userObj: {},
    list_table_order: [],
    table_current_order: {},
    table_total_bill: {}

  }
});

export default store;
