import { fetchPosts } from './fetch';
import { AsyncStorage } from 'react-native';

// ensure data for rendering given list type
export function FETCH_LIST_DATA ({ commit, dispatch }, { type, params }) {
  commit('FETCHING_LISTS');
  // console.log(params)
  return fetchPosts(type, params)
    .then(coffee_tables => {
      return commit('SET_TABLES', { coffee_tables })
    });
}

export function LOGIN ({ commit, state}, {userObj, navigate}) {
  commit('LOGGING_IN', true)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('LOGIN_SUCCESFULL', {userObj})
      AsyncStorage.setItem('email', userObj.email)
      navigate('Home');
      resolve();
    }, 1000)
  })
}

export function SET_USER({commit, state}, {userObj}) {
  return commit('LOGIN_SUCCESFULL', {userObj})
}
