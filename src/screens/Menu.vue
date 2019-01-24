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
          MENU
        </nb-title>
      </nb-body>
      <nb-right>
      </nb-right>
    </nb-header>
    <nb-content padder>
      <nb-item>
        <nb-left>
          <nb-text>Images</nb-text>
        </nb-left>
        <nb-body>
          <nb-text>Menus</nb-text>
        </nb-body>
        <nb-right>
          <nb-text>Price</nb-text>
        </nb-right>
      </nb-item>
      <nb-list-item v-for="menu in listMenus">
        <nb-item>
          <nb-left>
            <nb-thumbnail small :source="image"/>
          </nb-left>
          <nb-body :style="{flex: 1}">
            <nb-text>{{ menu.beverages }}</nb-text>
          </nb-body>
          <nb-right>
            <nb-text>{{ action.handleFormatNumber(menu.price) }}</nb-text>
          </nb-right>
        </nb-item>
      </nb-list-item>
    </nb-content>
    <nb-spinner v-if="loading"></nb-spinner>
  </nb-container>
</template>

<script>
import action from './share/helper.js';
import store from '../store';
import image from "../../assets/images/len.png"
export default {
  data() {
    return {
      image: image,
      action: action
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
  }
};
</script>
