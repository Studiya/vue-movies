<template lang="pug">
  .home
    .filters
      SelectCustom(placeholder="Genres", select-type="genres")
      SelectCustom(placeholder="Years", select-type="years") 
      //- SelectCustom(placeholder="Actors", select-type="actors")   
    CurrentFilters 
    MoviesList  
</template>

<script>

import SelectCustom from '@/components/SelectCustom.vue'
import CurrentFilters from '@/components/CurrentFilters.vue'
import MoviesList from '@/components/MoviesList.vue'

export default {
  name: 'home',


  components: {
    SelectCustom,
    CurrentFilters,
    MoviesList
  },


  computed: {

    actors() {
      return this.$store.state.actors
    },

    instance() {
      return this.$store.state.instance
    }
  },


  methods: {
    getGenres() {
      this.instance.get('/genre/movie/list?api_key=a09dec18ead1c8a9c7aa6b98d41038dd', {

      })
      .then((response) => {
        if (response.status == 200) {
          this.$store.dispatch('getGenresAction', response.data.genres)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    getYears() {
      let date = new Date(),
        nowYear = date.getFullYear(),
        yearsList = []

      for(let i = 1883; i <= nowYear; i++) {
        yearsList.push(i)
      }
      this.$store.commit('getYearsMutation', yearsList)
    }

    // getActors() {

    //   let actorsList = []

    //   this.actors.map((item) => {
    //     let name = item.name;
    //     let surname = item.surname;

    //     this.instance.get('/search/person?api_key=a09dec18ead1c8a9c7aa6b98d41038dd&query=' + name + '+' + surname, {

    //     })
    //     .then((response) => {
    //       if (response.status == 200) {
    //         actorsList.push(response.data.results[0])
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   })

    //   console.log(actorsList)

    //   // this.$store.dispatch('getActorsAction', actorsList)
    // }
  },


  created: function() {
    this.getGenres(),
    this.getYears()
    // this.getActors()
  }
}
</script>

<style lang="stylus">

  .filters
    padding 30px 20px 0
    position relative
    z-index 1

</style>
