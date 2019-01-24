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
          Revenue Months
        </nb-title>
      </nb-body>
      <nb-right>
        <nb-button transparent :on-press="handleChoicePress">>
          <nb-icon name="more"/>
        </nb-button>
      </nb-right>
    </nb-header>
    <nb-content padder>
      <nb-item>
          <nb-left>
            <nb-text>Months</nb-text>
          </nb-left>
          <nb-right>
            <nb-text>Revenue</nb-text>
          </nb-right>
        </nb-item>
      <nb-list-item v-for="revenue in listRevenueMonths">
        <nb-item>
          <nb-left>
            <nb-text>{{ revenue.month }}</nb-text>
          </nb-left>
          <nb-right>
            <nb-text>{{ action.handleFormatNumber(revenue.total) }}</nb-text>
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
import constant from '../common/Constant.js';

export default {
  data() {
    return {
      listRevenueMonths: [],
      loading: false,
      quantityOptions: [
        { text: "Revenue Days", icon: "analytics", iconColor: "#f42ced" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ],
      optionCancelIndex: 2,
      optionDestructiveIndex: 1,
      clicked: 0,
      action: action
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  created () {
    let email = store.state.userObj.email
    axios.get(constant.uri_revenue_months, {
      params: { email: email }
    }).then((response) => {
      this.listRevenueMonths = response.data
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
