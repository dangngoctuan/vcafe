import { fetchDatum } from './fetch';
import { AsyncStorage } from 'react-native';
import store from './index.js'

// ensure data for rendering given list type
export function FETCH_LIST_DATA ({ commit, dispatch }, { type, params }) {
  if (type == store.state.uriTables) {
    commit('FETCHING_LIST_TABLE');
    return fetchDatum(type, params)
      .then(coffee_tables => {
        return commit('SET_TABLES', { coffee_tables })
      });
  } else {
    commit('FETCHING_LIST_MENU');
    return fetchDatum(type, params)
      .then(menus => {
        return commit('SET_MENUS', { menus })
      });
  }
}

export function LOGIN ({ commit, state}, { userObj, navigate }) {
  commit('LOGGING_IN', true)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('LOGIN_SUCCESFULL', { userObj })
      AsyncStorage.setItem('email', userObj.email)
      navigate('Home');
      resolve();
    }, 1000)
  })
}

export function SET_USER({commit, state}, {userObj}) {
  return commit('LOGIN_SUCCESFULL', {userObj})
}
