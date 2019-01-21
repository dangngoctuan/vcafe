<template>
  <nb-container>
    <nb-content :style="stylesObj.drawerContent" :bounces="false">
      <nb-list>
        <nb-list-item>
          <nb-text>{{userData.email}}</nb-text>
        </nb-list-item>
        <nb-list-item>
          <nb-text :on-press="logOut">Logout</nb-text>
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
import thumbnail from "../../../assets/images/user.png";
import { NavigationActions } from 'vue-native-router';
import store from '../../store';
import { firebaseApp } from '../../common/firebaseConfig.js';
import action from '../share/helper.js';

const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: "Drawer"})]
                    })

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    logOut() {
      _this = this
      firebaseApp.auth().signOut().then(function() {
        _this.navigation.navigate("Login")
        action.showMessage('Logout Successfull')
      }).catch(function(error) {
        action.showMessage(error.message)
      })
    }
  },
  computed: {
    userData () {
      return store.state.userObj;
    }
  },
  data: {
    stylesObj: {
      profilePic: {
            height: 40,
            width: 40,
            borderRadius: Platform.OS === "android" ? 40 : 20
        },
        drawerContent: {
            paddingTop: Platform.OS === "android" ? 20 : 30
        }
    },
    thumbnail: thumbnail
  }
};
</script>
