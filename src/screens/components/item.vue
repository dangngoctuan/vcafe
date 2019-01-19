<template>
  <nb-container>
    <nb-content>
      <nb-list-item v-for="(user, index) in arrLeft">
        <nb-left :style="{ marginLeft: 30 }">
          <nb-button rounded class="button">
            <nb-text>Round   {{ user }}</nb-text>
          </nb-button>
        </nb-left>
        <nb-right :style="{flex: 1, marginRight: 30}">
          <nb-button rounded class="button">
            <nb-text>Round   {{ arrRight[index] }}</nb-text>
          </nb-button>
        </nb-right>
      </nb-list-item>
    </nb-content>
  </nb-container>
</template>

<script>

export default {
  data() {
    return {
      arrLeft: [],
      arrRight: [],
      arr: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  props: {
    users: Array
  },
  created() {
    this.arrLeft = this.arr.filter(function(element, index, array) {
      return (index % 2 === 0)
    })
    this.arrRight = this.arr.filter(function(element, index, array) {
      return (index % 2 != 0)
    })
  }
};
</script>

<style scoped>
  .button {
    height: 110;
    width: 110;
  }
</style>
