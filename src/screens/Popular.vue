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
          Popular
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
        <nb-right>
          <nb-text>Ordered</nb-text>
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
            <nb-text>{{ menu.price }}</nb-text>
          </nb-right>
          <nb-right>
            <nb-button success>
              <nb-text>{{ menu.ordering }}</nb-text>
            </nb-button>
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
import image from "../../assets/images/len.png";
import axios from 'axios';
import constant from '../common/Constant.js';

export default {
  data() {
    return {
      image: image,
      listMenus: [],
      loading: false
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  created () {
    let email = store.state.userObj.email
    axios.get(constant.uri_sort_popular, {
      params: { email: email }
    }).then((response) => {
      this.listMenus = response.data
    })
  }
};
</script>
