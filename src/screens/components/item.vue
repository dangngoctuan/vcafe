<template>
  <nb-container>
    <nb-content>
      <nb-list-item v-for="(table, index) in arrLeft">
        <nb-left :style="{ marginLeft: 30 }">
          <nb-button
            :class="table.active ? 'disable' : ''" rounded class="button"
            :on-press="() => { handleTablePress(table) }">
            <nb-text>TABLE  {{ table.ordering }}</nb-text>
          </nb-button>
        </nb-left>
        <nb-right :style="{flex: 1, marginRight: 30}" v-if="checkTable(arrRight[index])">
          <nb-button
            :class="arrRight[index].active ? 'disable' : ''" rounded class="button"
            :on-press="() => { handleTablePress(arrRight[index]) }">
            <nb-text>TABLE  {{ arrRight[index].ordering }}</nb-text>
          </nb-button>
        </nb-right>
      </nb-list-item>
    </nb-content>
  </nb-container>
</template>

<script>

import store from '../../store';
import { ActionSheet } from "native-base";
import action from '../share/helper.js';

export default {
  data() {
    return {
      arrLeft: [],
      arrRight: [],
      checkOptions: [
        { text: "Order", icon: "american-football", iconColor: "#2c8ef4" },
        { text: "Checkout", icon: "analytics", iconColor: "#f42ced" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ],
      optionCancelIndex: 3,
      optionDestructiveIndex: 2,
      clicked: 0,
      listTableOrder: store.state.list_table_order,
      listTables: [],
      tableOrdered: []
    }
  },
  props: {
    tables: Array,
    navigation: Object
  },
  created() {
    if (this.tables != 'undefined' && this.tables.length > 0) {
      this.arrLeft = this.tables.filter(function(element) {
        return (element.ordering % 2 != 0)
      })
      this.arrRight = this.tables.filter(function(element) {
        return (element.ordering % 2 === 0)
      })
    }
  },
  methods: {
    checkTable(val) {
      return val ? true : false
    },
    handleTablePress(table) {
      let listOrder = this.listTableOrder
      _this = this
      ActionSheet.show(
        {
          options: _this.checkOptions,
          cancelButtonIndex: _this.optionCancelIndex,
          destructiveButtonIndex: _this.optionDestructiveIndex,
          title: "Select An Option"
        },
        buttonIndex => {
          _this.clicked = _this.checkOptions[buttonIndex]
          _this.listTables = listOrder.filter(function(element) {
            return (element.id === table.id)
          })
          let includesTableOrder = _this.listTables.length
          if (_this.clicked.text === 'Order') {
            if (includesTableOrder == 0) {
              store.dispatch('SET_ORDER', {
                listTableOrder: table
              })
            }
            _this.navigation.navigate('Order')
          }
          if (_this.clicked.text === 'Checkout') {
            if (table.active) {
              store.dispatch('SET_CHECKOUT', {
                tableOrder: table
              })
              _this.navigation.navigate('Checkout')
            } else {
              action.showMessage('This Table is not order')
            }
          }
        }
      )
    }
  }
};
</script>

<style scoped>
  .button {
    height: 110;
    width: 110;
  }
  .disable {
    background-color: #a9a9a9
  }
</style>
