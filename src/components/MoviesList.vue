<template lang="pug">
  .movies
    ul.movies-list
      li.movies-item(v-for="item in movies")
        img(v-bind:src="posterInstance + item.poster_path")
        h2 {{item.title}} 
</template>

<script>

export default {
  name: 'moviesList',
  
  data: function() {
    return {
      posterInstance: 'https://image.tmdb.org/t/p/w500'
    }
  },

  computed: {
    movies() {
      return this.$store.state.movies
    }
  }
}
</script>

<style lang="stylus">

  .movies
    padding 30px 20px 0
    
    &-list
      display flex
      flex-direction row
      justify-content space-between
      align-items flex-start
      flex-wrap wrap
      
    &-item
      display inline-block
      width 250px
      margin-bottom 20px
      background-color #fafafa 
      border-radius 8px
      border 2px solid #7a7a7a 
      padding 15px
      
      img 
        width 100%   

</style>