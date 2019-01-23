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
      <nb-button :onPress="() => navigation.navigate('Popular')">
        <nb-icon name="navigate" />
        <nb-text>Popular</nb-text>
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
