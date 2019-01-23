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
          Revenue Days
        </nb-title>
      </nb-body>
      <nb-right>
      </nb-right>
    </nb-header>
    <nb-content padder>
      <nb-item>
          <nb-left>
            <nb-text>Days</nb-text>
          </nb-left>
          <nb-right>
            <nb-text>Revenue</nb-text>
          </nb-right>
        </nb-item>
      <nb-list-item v-for="revenue in listRevenueDays">
        <nb-item>
          <nb-left>
            <nb-text>{{ revenue.day }}</nb-text>
          </nb-left>
          <nb-right>
            <nb-text>{{ revenue.total }}</nb-text>
          </nb-right>
        </nb-item>
      </nb-list-item>
    </nb-content>
    <nb-spinner v-if="loading"></nb-spinner>
  </nb-container>
</template>

<script>
import store from '../store';
import action from './share/helper.js';
import axios from 'axios';
import { ActionSheet } from "native-base";

const uri_days = 'http://localhost:3000/api/information/users/revenue_days'

export default {
  data() {
    return {
      listRevenueDays: [],
      loading: false,
      quantityOptions: [
        { text: "Revenue Days", icon: "analytics", iconColor: "#f42ced" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ],
      optionCancelIndex: 2,
      optionDestructiveIndex: 1,
      clicked: 0,
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  created () {
    let email = store.state.userObj.email
    axios.get(uri_days, {
      params: { email: email }
    }).then((response) => {
      this.listRevenueDays = response.data
    })
  },
  methods: {
    handleChoicePress() {
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
          if (_this.clicked.text === 'Revenue Days' ) {
            _this.navigation.navigate('RevenueDays')
          }
        }
      )
    }
  }
};
</script>
