<template>
  <root>
    <app-navigation></app-navigation>
  </root>
</template>


<script>
import React from "react";
import { StackNavigator, DrawerNavigator, navigationService } from "vue-native-router";
import { Root } from "native-base";
import HomeScreen from "./screens/home/index.vue";
import Sidebar from "./screens/home/sidebar.vue";
import LoginScreen from "./screens/Login.vue";
import SignUpScreen from "./screens/Register.vue";
import AddTableScreen from "./screens/AddTable.vue";
import RemoveTableScreen from "./screens/RemoveTable.vue";
import OrderScreen from "./screens/Order.vue";
import CheckoutScreen from "./screens/TotalBill.vue";
import RevenueMonthsScreen from "./screens/RevenueMonths.vue";
import RevenueDaysScreen from "./screens/RevenueDays.vue";
import MenuScreen from "./screens/Menu.vue";

const Drawer = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    AddTable: { screen: AddTableScreen },
    RemoveTable: { screen: RemoveTableScreen },
    Order: { screen: OrderScreen },
    Checkout: { screen: CheckoutScreen },
    RevenueMonths: { screen: RevenueMonthsScreen },
    RevenueDays: { screen: RevenueDaysScreen },
    Menu: { screen: MenuScreen },
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <Sidebar {...props} />
  }
);
const AppNavigation = StackNavigator(
  {
    Drawer: { screen: Drawer }
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
