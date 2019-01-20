<template>
  <nb-container :style="{backgroundColor: '#fff'}">
    <nb-header>
      <nb-body>
        <nb-title>
          SignUp
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
        <nb-button block :on-press="handleSignUp">
          <nb-text>Sign Up</nb-text>
        </nb-button>
        <nb-button block :on-press="gotoLogin">
          <nb-text>Already have an account? Login</nb-text>
        </nb-button>
      </view>
      <nb-spinner v-if="loading"></nb-spinner>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Platform, AsyncStorage } from "react-native";
import { NavigationActions } from 'vue-native-router';
import store from '../store';
import {firebaseApp} from '../common/firebaseConfig.js';
import action from './share/helper.js';
import axios from 'axios'

const uri = 'http://localhost:3000/api/information/users'

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data: function() {
    return {
      email: '',
      password: '',
      loading: false
    };
  },
  methods: {
    handleSignUp() {
      let _this = this
      _this.loading = true
      firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          axios.get(uri, { params: { email: response.user.email } }).then((res) => {
            store.dispatch('LOGIN', {
              userObj: { email: res.data.email },
              navigate: this.navigation.navigate
            });
          })
          action.showMessage('Register Successfull')
      }).catch(function(error) {
        _this.loading = false
        action.showMessage(error.message)
      })
    },
    gotoLogin: function(){
      this.navigation.navigate('Login');
    }
  }
};
</script>
