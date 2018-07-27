<template lang="pug">
  li.current-filters__item(v-bind:class="{'is-hover': isHover}" v-bind:id="itemId") {{content}}
    span.current-filters__item-remove(@mouseover="isHover = !isHover" @mouseout="isHover = !isHover" @click="removeFilter(itemId)")
</template>

<script>

export default {
  name: 'currentFilterItem',


  props: ['content', 'itemId'],


  data: function() {
    return {
      isHover: false
    }
  },


  computed: {
    filters() {
      return this.$store.state.filters
    },
    getMoviesByFilters() {
      return this.$store.state.getMoviesByFilters
    }
  },

  
  methods: {
    removeFilter(id) {
      console.log(id)
      this.$store.commit('removeFiltersMutation', id)

      this.getMoviesByFilters()
    }
  }
}
</script>

<style lang="stylus">
    
  .current-filters__item
    display inline-block
    height 40px
    line-height 40px
    padding: 0 25px 0 15px
    background-color #fafafa 
    border-radius 8px
    border 2px solid #7a7a7a 
    color #7a7a7a
    position relative 
    text-transform uppercase
    cursor default
    transition .3s ease
    margin-right 10px
    
    &:last-child
      margin-right 0
    
    &.is-hover
      opacity 0.7
    
    &-remove
      position absolute
      width 10px
      height 10px
      margin auto
      top 0
      bottom 0
      right 10px
      cursor pointer
      
      &:before
        content ''
        display block
        width 100%
        height 2px
        background-color #7a7a7a
        position absolute
        margin auto
        top 0
        bottom 0
        left 0
        right 0
        transform rotateZ(135deg)
        
      &:after
        content ''
        display block
        width 100%
        height 2px
        background-color #7a7a7a
        position absolute
        margin auto
        top 0
        bottom 0
        left 0
        right 0
        transform rotateZ(-135deg)        

</style>