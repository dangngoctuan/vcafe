<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
          <nb-left>
            <nb-button
              transparent
              :on-press="() => navigation.navigate('DrawerOpen')"
              >
              <nb-icon name="menu" />
            </nb-button>
          </nb-left>
          <nb-body>
              <nb-title>COFFEE</nb-title>
          </nb-body>
          <nb-right>
            <nb-button transparent :on-press="handleBtnPress">>
              <nb-icon name="more"/>
            </nb-button>
          </nb-right>
        </nb-header>
        <nb-content>
            <nb-list>
                <item
                    v-if="!loading"
                    :tables="listTables"
                    :navigation="navigation"
                     />
                <nb-spinner v-if="loading"></nb-spinner>
            </nb-list>
        </nb-content>
        <footer :navigation="navigation"/>
    </nb-container>
</template>

<script>
import React from 'react';
import Item from '../components/item';
import { Dimensions, AsyncStorage } from 'react-native';
import store from '../../store';
import Footer from '../components/footer.vue';
import { ActionSheet } from "native-base";
import action from '../share/helper.js';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  data() {
    return {
      tablesOptions: [
        { text: "Add Tables", icon: "american-football", iconColor: "#2c8ef4" },
        { text: "Remove Tables", icon: "analytics", iconColor: "#f42ced" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ],
      optionCancelIndex: 3,
      optionDestructiveIndex: 2,
      clicked: 0
    }
  },
  computed: {
    listTables () {
      if (Array.isArray(store.state.coffeeTables)) {
        return store.state.coffeeTables;
      } else {
        return []
      }
    },
    loading () {
      return store.state.loadingTables;
    }
  },
  props: {
    navigation: Object
  },
  created () {
    action.fetchList(store.state.uriTables, store.state.userObj.email);
  },
  methods: {
    handleBtnPress: function() {
      _this = this
      ActionSheet.show(
        {
          options: _this.tablesOptions,
          cancelButtonIndex: _this.optionCancelIndex,
          destructiveButtonIndex: _this.optionDestructiveIndex,
          title: "Select An Option"
        },
        buttonIndex => {
          _this.clicked = _this.tablesOptions[buttonIndex];
          if (_this.clicked.text === 'Add Tables' ) {
            return _this.navigation.navigate('AddTable')
          }
          if (_this.clicked.text === 'Remove Tables' ) {
            return _this.navigation.navigate('RemoveTable')
          }
        }
      )
    }
  },
  components: {
    Item, Footer
  }
}
</script>
