<template>
  <nb-container :style="{backgroundColor: '#fff'}">
    <nb-header>
      <nb-left>
        <nb-button transparent
          :on-press="() => navigation.navigate('Login')">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>
          Reset Password
        </nb-title>
      </nb-body>
      <nb-right>
      </nb-right>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <nb-item>
          <nb-input placeholder="Email" v-model="email" auto-capitalize="none"/>
        </nb-item>
      </nb-form>
      <view :style="{ marginTop: 10 }">
        <nb-button block :on-press="resetPassword">
          <nb-text>Submit</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import action from './share/helper.js';
import {firebaseApp} from '../common/firebaseConfig.js';

export default {
  data() {
    return {
      email: ''
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    resetPassword() {
      firebaseApp.auth().sendPasswordResetEmail(this.email).then((response) => {
        action.showMessage('Please check email change password!')
      }).catch(function(error) {
        action.showMessage(error.message)
      })
      this.navigation.navigate('Login')
    }
  }
}
</script>
