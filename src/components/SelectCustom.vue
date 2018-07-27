<template lang="pug">
  .select(v-if="selectType == 'genres'" v-bind:class="{'is-active': isOpen}")
    .select-field(@click="isOpen = !isOpen") {{placeholder}}
    input.select-input(type="text" id="categoriesFilter")
    transition(name="dropdown")  
      ul.select-dropdown(v-show="isOpen")
        li.select-item(v-for="genre in genres" v-bind:key="genre.id" @click="chooseGenres(genre.name, genre.id), isOpen = !isOpen") {{genre.name}}

  .select(v-else-if="selectType == 'years'" v-bind:class="{'is-active': isOpen}")
    .select-field(@click="isOpen = !isOpen") {{placeholder}}
    input.select-input(type="text" id="yearsFilter")
    transition(name="dropdown")  
      ul.select-dropdown(v-show="isOpen")
        li.select-item(v-for="year in years" v-bind:key="year" @click="chooseYears(year), isOpen = !isOpen") {{year}}

  .select(v-else-if="selectType == 'actors'" v-bind:class="{'is-active': isOpen}")
    .select-field(@click="isOpen = !isOpen") {{placeholder}}
    input.select-input(type="text" id="actorsFilter")
    transition(name="dropdown")  
      ul.select-dropdown(v-show="isOpen")
        li.select-item(v-for="actor in actors" @click="isOpen = !isOpen") {{actor.name}}                
</template>

<script>

export default {
  name: 'selectCustom',


  props: ['placeholder', 'selectType'],


  data: function() {
    return {
      isOpen: false
    }
  },


  computed: {
    genres() {
      return this.$store.state.genres
    },

    years() {
      return this.$store.state.years
    },

    actors() {
      return this.$store.state.actors
    },

    filters() {
      return this.$store.state.filters
    },

    instance() {
      return this.$store.state.instance
    },

    getMoviesByFilters() {
      return this.$store.state.getMoviesByFilters
    }
  },


  methods: {
    chooseGenres(name, id) {

      this.filters.map((item) => {
        if(item.index === "with_genres") {
          this.$store.commit('removeFiltersMutation', item.id)
        }
      })

      let genre = {
        name: name,
        index: 'with_genres',
        id: id
      }
      this.$store.dispatch('addFiltersAction', genre)
      this.getMoviesByFilters()
    },

    chooseYears(name) {

      this.filters.map((item) => {
        if(item.index === "primary_release_year") {
          this.$store.commit('removeFiltersMutation', item.id)
        }
      })

      let year = {
        name: name,
        index: 'primary_release_year',
        id: name
      }
      this.$store.dispatch('addFiltersAction', year)
      this.getMoviesByFilters()
    }
  }
}
</script>

<style lang="stylus">

  .select
    cursor pointer
    position relative
    width 250px
    text-transform uppercase
    
    &-field
      width 100%
      height 40px
      line-height 40px
      padding: 0 15px
      background-color #fafafa 
      border-radius 8px
      border 2px solid #7a7a7a 
      color #7a7a7a
      opacity 0.7
      transition .3s ease
      position relative
      
      &:after
        display block
        content ''
        width 10px
        height 10px
        border-left 3px #7a7a7a solid
        border-bottom 3px #7a7a7a solid
        position absolute
        margin auto
        top -2px 
        bottom 0
        right 10px
        transform rotateZ(-45deg)
        transition .3s ease
        
    &.is-active
      
      .select-field
        
        &:after
          transform rotateZ(135deg) 
          top 5px    

    &-input
      display none
      
    &-dropdown
      display block
      position absolute
      width 100%
      height 300px
      left 0
      top 100%
      background-color #fafafa 
      border-radius 8px
      border 2px solid #7a7a7a 
      overflow-y scroll
      
    &-item
      color #7a7a7a
      opacity 0.7
      transition .5 ease 
      height 40px
      line-height 40px
      padding: 0 15px 

  .dropdown-enter-active, .dropdown-leave-active
    transition opacity .5s
    
  .dropdown-enter, .dropdown-leave-to
    opacity: 0
    
  @media screen and (min-width: 1024px)
    
    .select
      display inline-block
      margin-right 15px
      
      &-field:hover
        opacity 1
        
      &-item:hover
        opacity 1  
          

</style>  