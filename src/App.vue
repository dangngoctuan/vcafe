<template>
  <root>
    <app-navigation></app-navigation>
  </root>
</template>


<script>
import React from "react";
import { StackNavigator, DrawerNavigator } from "vue-native-router";
import { Root } from "native-base";
import HomeScreen from "./screens/home/index.vue";

const Drawer = DrawerNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    }
  }
);
const AppNavigation = StackNavigator(
  {
    Drawer: Drawer
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);
export default {
  components: { Root, AppNavigation }
};

</script>