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
            <nb-right/>
        </nb-header>
        <nb-content>
            <nb-list>
                <item
                    v-if="!loading"
                    :tables="listTables"
                     />
                <nb-spinner v-if="loading"></nb-spinner>
            </nb-list>
        </nb-content>
    </nb-container>
</template>

<script>
import React from 'react';
import Item from '../components/item';
import { Dimensions, AsyncStorage } from 'react-native';
import store from '../../store';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  computed: {
    listTables () {
      return store.state.coffee_tables;
    },
    loading () {
        return store.state.loadingTables;
    }
  },
  props: {
      navigation: Object
  },
  created () {
    this.fetchList(store.state.uriTables, store.state.userObj.email);
  },
  methods: {
    fetchList (type, params) {
      return store.dispatch('FETCH_LIST_DATA', {
        type: type,
        params: { email: params }
      });
    }
  },
  components: {
      Item
  }
};
</script>
