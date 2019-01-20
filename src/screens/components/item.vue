<template>
  <nb-container>
    <nb-content>
      <nb-list-item v-for="(table, index) in arrLeft">
        <nb-left :style="{ marginLeft: 30 }">
          <nb-button rounded class="button">
            <nb-text>TABLE   {{ table }}</nb-text>
          </nb-button>
        </nb-left>
        <nb-right :style="{flex: 1, marginRight: 30}" v-if="checkTable(arrRight[index])">
          <nb-button rounded class="button">
            <nb-text>TABLE   {{ arrRight[index] }}</nb-text>
          </nb-button>
        </nb-right>
      </nb-list-item>
    </nb-content>
  </nb-container>
</template>

<script>

import store from '../../store';


export default {
  data() {
    return {
      arrLeft: [],
      arrRight: [],
    }
  },
  props: {
    tables: Array
  },
  created() {
    this.arrLeft = this.tables.filter(function(element, index, array) {
      return (index % 2 === 0)
    })
    this.arrRight = this.tables.filter(function(element, index, array) {
      return (index % 2 != 0)
    })
  },
  methods: {
    checkTable(val) {
      return val ? true : false
    }
  }
};
</script>

<style scoped>
  .button {
    height: 110;
    width: 110;
  }
</style>
