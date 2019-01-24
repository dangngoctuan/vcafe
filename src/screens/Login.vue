<template>
  <nb-container v-if="loaded" :style="{backgroundColor: '#fff'}">
    <nb-header>
      <nb-body>
        <nb-title>
          Login
        </nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <nb-item>
          <nb-input placeholder="Email" v-model="email" auto-capitalize="none"/>
        </nb-item>
        <nb-item last>
          <nb-input placeholder="Password" v-model="password" auto-capitalize="none" secure-text-entry/>
        </nb-item>
      </nb-form>
      <view :style="{ marginTop: 10 }">
        <nb-button block :on-press="handleLogin">
          <nb-spinner v-if="logging_in" size="small" />
          <nb-text>Login </nb-text>
        </nb-button>
        <nb-button transparent :on-press="gotoResetPassword">
          <nb-body>
            <nb-text>Forgot Password?</nb-text>
          </nb-body>
        </nb-button>
        <nb-button transparent :on-press="gotoRegister">
          <nb-body>
            <nb-text>Don't have an account? Sign Up</nb-text>
          </nb-body>
        </nb-button>
      </view>
      <nb-spinner v-if="loading"></nb-spinner>
    </nb-content>
  </nb-container>
  <nb-spinner v-if="!loaded"></nb-spinner>
</template>

<script>
import { Dimensions, Platform, AsyncStorage } from "react-native";
import { NavigationActions } from 'vue-native-router';
import store from '../store';
import {firebaseApp} from '../common/firebaseConfig.js';
import action from './share/helper.js';

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    logging_in () {
      return store.state.logging_in;
    }
  },
  data() {
    return {
      email: '',
      password: '',
      loaded: false,
      loading: false
    }
  },
  created() {
    _this = this
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if(user) {
        _this.loaded = true
        store.dispatch('SET_USER', { userObj: { email: user.email } })
        _this.navigation.navigate('Home')
      } else {
        _this.loaded = true
      }
    })
  },
  methods: {
    handleLogin() {
      let _this = this
      this.loading = true
      firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password).then((response) => {
        store.dispatch('LOGIN', {
          userObj: { email: response.user.email },
          navigate: this.navigation.navigate
        });
        action.showMessage('Login Successfull')
      }).catch(function(error) {
        _this.loading = false
        action.showMessage(error.message)
      });
    },
    gotoRegister() {
      this.navigation.navigate('SignUp');
    },
    gotoResetPassword() {
      this.navigation.navigate('ResetPassword');
    }
  }
};
</script>
