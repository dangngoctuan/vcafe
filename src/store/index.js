/**
 * reference
 * https://github.com/weexteam/weex-hackernews/tree/master/src/store
 */

import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import { Toast } from 'native-base';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    activeType: 'users',
    users: [],
    loadingPosts: false,
    userObj: {}
  },
  showMessage(message) {
    Toast.show({
      text: message
    })
  },
});

export default store;
