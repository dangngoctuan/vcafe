<template>
  <nb-footer>
    <nb-footer-tab>
      <nb-button :onPress="() => navigation.navigate('Menu')">
        <nb-icon name="menu" />
        <nb-text>Menu</nb-text>
      </nb-button>
      <nb-button :onPress="() => navigation.navigate('RevenueMonths')">
        <nb-icon name="apps" />
        <nb-text>Revenue</nb-text>
      </nb-button>
      <nb-button vertical badge :onPress="() => navigation.navigate('Home')">
        <nb-badge>
          <nb-text></nb-text>
        </nb-badge>
        <nb-icon name="home" />
        <nb-text>Home</nb-text>
      </nb-button>
      <nb-button vertical badge :active="true">
        <nb-badge>
          <nb-text>11</nb-text>
        </nb-badge>
        <nb-icon name="notifications" :active="true" />
        <nb-text>Noti</nb-text>
      </nb-button>
    </nb-footer-tab>
  </nb-footer>
</template>

<script>
import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';

export default {
  props: {
    navigation: {
      type: Object
    }
  }
};
</script>

<style>
.bgdGree {
  background-color: green;
}
</style>
