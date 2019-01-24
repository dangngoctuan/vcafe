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
          CHECKOUT
        </nb-title>
      </nb-body>
      <nb-right>
      </nb-right>
    </nb-header>
    <nb-content padder>
      <nb-list-item>
        <nb-item>
          <nb-left>
            <nb-text></nb-text>
          </nb-left>
          <nb-body>
            <nb-text>TOTAL:</nb-text>
          </nb-body>
          <nb-right>
            <nb-text></nb-text>
          </nb-right>
          <nb-right>
            <nb-text>{{ action.handleFormatNumber(total) }}</nb-text>
          </nb-right>
        </nb-item>
      </nb-list-item>
      <nb-item>
        <nb-left>
          <nb-text>Select</nb-text>
        </nb-left>
        <nb-body>
          <nb-text>Menus</nb-text>
        </nb-body>
        <nb-right>
          <nb-text>Price</nb-text>
        </nb-right>
        <nb-right>
          <nb-text>Quantity</nb-text>
        </nb-right>
      </nb-item>
      <nb-list-item v-for="order in listOrders">
        <nb-item>
          <nb-left>
            <nb-checkbox :checked="true" color="green"/>
          </nb-left>
          <nb-body :style="{flex: 1}">
            <nb-text>{{ order.beverages }}</nb-text>
          </nb-body>
          <nb-right>
            <nb-text>{{ action.handleFormatNumber(order.price) }}</nb-text>
          </nb-right>
          <nb-right>
            <nb-button success>
              <nb-text>{{ order.quantity }}</nb-text>
            </nb-button>
          </nb-right>
        </nb-item>
      </nb-list-item>
    </nb-content>
    <nb-spinner v-if="loading"></nb-spinner>
    <view :style="{ marginTop: 10 }" v-if="!loading">
      <nb-spinner v-if="loaded"></nb-spinner>
      <nb-button block success :on-press="checkout">
        <nb-text>CheckOut</nb-text>
      </nb-button>
      <nb-button
        :style="{ marginTop: 5 }" block warning
        :on-press="cancelCheckout">
        <nb-text>Cancel</nb-text>
      </nb-button>
    </view>
  </nb-container>
</template>

<script>
import store from '../store';
import action from './share/helper.js';
import axios from 'axios';
import constant from '../common/Constant.js';

export default {
  data() {
    return {
      listOrders: [],
      total: '',
      loaded: false,
      action: action
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    loading () {
      return store.state.loadingCheckout
    }
  },
  created () {
    let table_total_bill = store.state.table_total_bill
    let email = store.state.userObj.email
    axios.get(constant.uri_total_bills, {
      params: { email: email, table_total_bill: table_total_bill }
    }).then((response) => {
      let data = response.data
      this.listOrders = data.attributes_menus
      this.total = data.total_bills
    })
  },
  methods: {
    checkout() {
      this.loaded = true
      _this = this
      let email = store.state.userObj.email
      let table_total_bill = store.state.table_total_bill
      axios.get(constant.uri_checkout,
        { params: { email: email, table_total_bill: table_total_bill, total_bills: _this.total }
      }).then((response) => {
        _this.loaded = false
        store.dispatch('REMOVE_ORDER', {
          listTableOrder: table_total_bill
        })
        this.navigation.navigate('Home')
        action.showMessage(response.data.message)
      })
    },
    cancelCheckout() {
      store.dispatch('REMOVE_ORDER', {
        listTableOrder: this.currentTableOrder
      })
      action.showMessage('Cancel Checkout')
      this.navigation.navigate('Home')
    }
  }
};
</script>
