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
          ORDER
        </nb-title>
      </nb-body>
      <nb-right>
      </nb-right>
    </nb-header>
    <nb-content padder>
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
      <nb-list-item v-for="menu in listMenus">
        <nb-item>
          <nb-left>
            <nb-checkbox :checked="checkedMenus.includes(menu)" :on-press="() => { addToListOrder(menu) }" color="green"/>
          </nb-left>
          <nb-body :style="{flex: 1}">
            <nb-text>{{ menu.beverages }}</nb-text>
          </nb-body>
          <nb-right>
            <nb-text>{{ menu.price }}</nb-text>
          </nb-right>
          <nb-right>
            <nb-button success>
              <nb-text
                :on-blur="() => { changeListOrder(menu) }"
                :on-press="() => { changeQuantity(menu) }"
                :on-long-press="() => { actionChangeQuantity(menu) }"
                >{{ menu.quantity }}</nb-text>
            </nb-button>
          </nb-right>
        </nb-item>
      </nb-list-item>
    </nb-content>
    <nb-spinner v-if="loading"></nb-spinner>
    <view :style="{ marginTop: 10 }" v-if="!loading">
      <nb-spinner v-if="loaded"></nb-spinner>
      <nb-button block success :on-press="orderMenus">
        <nb-text>Order</nb-text>
      </nb-button>
      <nb-button
        :style="{ marginTop: 5 }" block warning
        :on-press="cancelOrder">
        <nb-text>Cancel</nb-text>
      </nb-button>
    </view>
  </nb-container>
</template>

<script>
import { Dimensions, Platform, AsyncStorage } from "react-native";
import { NavigationActions } from 'vue-native-router';
import store from '../store';
import {firebaseApp} from '../common/firebaseConfig.js';
import action from './share/helper.js';
import axios from 'axios';
import { ActionSheet } from "native-base";

const uri = 'http://localhost:3000/api/information/orders'

export default {
  data() {
    return {
      checkedMenus: [],
      loaded: false,
      quantityOptions: [
        { text: "Plus Quantity", icon: "american-football", iconColor: "#2c8ef4" },
        { text: "Minus Quantity", icon: "analytics", iconColor: "#f42ced" },
        { text: "Fixed Quantity", icon: "analytics", iconColor: "#f42ced" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ],
      optionCancelIndex: 4,
      optionDestructiveIndex: 3,
      clicked: 0,
      plusAndMenus: true,
      currentTableOrder: store.state.table_current_order
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    listMenus () {
      return store.state.menus
    },
    loading () {
      return store.state.loadingMenus;
    }
  },
  created () {
    action.fetchList(store.state.uriMenus, store.state.userObj.email)
  },
  methods: {
    addToListOrder(menu) {
      let listMenus = this.checkedMenus
      if (listMenus.includes(menu)) {
        listMenus.splice(listMenus.indexOf(menu), 1)
        menu.quantity = 0
      } else {
        menu.quantity += 1
        this.checkedMenus.push(menu)
      }
    },
    orderMenus() {
      this.loaded = true
      _this = this
      let email = store.state.userObj.email
      axios.get(uri,
        { params: { email: email, list_menus: _this.checkedMenus, current_table: _this.currentTableOrder  }
      }).then((response) => {
        action.showMessage(response.data.message)
        _this.navigation.navigate('Home')
        _this.loaded = false
      })
    },
    actionChangeQuantity(menu) {
      _this = this
      ActionSheet.show(
        {
          options: _this.quantityOptions,
          cancelButtonIndex: _this.optionCancelIndex,
          destructiveButtonIndex: _this.optionDestructiveIndex,
          title: "Select An Option"
        },
        buttonIndex => {
          _this.clicked = _this.quantityOptions[buttonIndex]
          if (_this.clicked.text === 'Plus Quantity' ) {
            _this.plusAndMenus = true
          }
          if (_this.clicked.text === 'Minus Quantity' ) {
            _this.plusAndMenus = false
          }
          if (_this.clicked.text === 'Fixed Quantity' ) {
            let listMenus = this.checkedMenus
            let currentOrderNeedChange = listMenus.filter(function(element) {
              return element.id = menu.id
            })
            listMenus[listMenus.indexOf(currentOrderNeedChange[0])] = menu
          }
        }
      )
    },
    changeQuantity(menu) {
      let listMenus = this.checkedMenus
      if (listMenus.includes(menu)) {
        if (this.plusAndMenus) {
          menu.quantity += 1
        } else {
          if (menu.quantity > 0) { menu.quantity -= 1 }
        }
      }
    },
    cancelOrder() {
      store.dispatch('REMOVE_ORDER', {
        listTableOrder: this.currentTableOrder
      })
      action.showMessage('Cancel Order')
      this.navigation.navigate('Home')
    }
  }
};
</script>
