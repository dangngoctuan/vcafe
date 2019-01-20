<template>
  <nb-container :style="{backgroundColor: '#fff'}">
    <nb-header>
      <nb-left>
        <nb-button transparent
          :on-press="() => navigation.navigate('Home')">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>
          ADD TABLE
        </nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <nb-item>
          <nb-input placeholder="Input quantity table" v-model="quantity" auto-capitalize="none"/>
        </nb-item>
      </nb-form>
      <view :style="{ marginTop: 10 }">
        <nb-button block :on-press="addTable">
          <nb-text>Submit</nb-text>
        </nb-button>
      </view>
      <nb-spinner v-if="loading"></nb-spinner>
    </nb-content>
  </nb-container>
</template>

<script>
import { NavigationActions } from 'vue-native-router';
import store from '../store';
import action from './share/helper.js';
import axios from 'axios';

const uri = 'http://localhost:3000/api/information/coffee_tables/add_tables'

export default {
  data() {
    return {
      quantity: '',
      loading: false
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    addTable() {
      this.loading = true
      _this = this
      let email = store.state.userObj.email
      axios.get(uri, {
        params: { email: email, quantity: _this.quantity }
      }).then((response) => {
        _this.loading = false
        action.showMessage(response.data.message)
        _this.navigation.navigate('Home')
      })
    }
  }
}
</script>
