<template lang="pug">
  .current-filters
    ul.current-filters__list
      CurrentFilterItem(v-for="item in filters" v-bind:item-id="item.id" v-bind:content="item.name")   
</template>

<script>

import CurrentFilterItem from './CurrentFilterItem.vue'

export default {
  name: 'currentFilters',


  components: {
    CurrentFilterItem
  },

  
  computed: {
    filters() {
      return this.$store.state.filters
    }
  }
}
</script>

<style lang="stylus">

  .current-filters
    padding 30px 20px 0
    
    &__list
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      flex-wrap wrap        

</style>

