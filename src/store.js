import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {actors} from './actors'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    instance: axios.create({
      baseURL: 'https://api.themoviedb.org/3/',
      timeout: 10000,
      headers: {}
    }),
    genres: [],
    years: [],
    actors: actors,
    filters: [],
    movies: [],
    getMoviesByFilters: function() {

      this.$store.commit('removeMoviesList')

      if(this.filters.length > 0) {

      let dataLink = '/discover/movie?api_key=a09dec18ead1c8a9c7aa6b98d41038dd'

      this.filters.map((item) => {
        dataLink = dataLink + '&' + item.index + '=' + item.id
      })

      this.instance.get(dataLink, {

      })
      .then((response) => {
        if (response.status == 200) {

          response.data.results.map((item) => {
            this.$store.dispatch('getMoviesByFiltersAction', item)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
    }
  },


  mutations: {
    getGenresMutation(state, newGenres) {
      state.genres = newGenres
    },

    getYearsMutation(state, newYears) {
      state.years = newYears
    },

    getActorsMutation(state, newActors) {
      state.actors = newActors
    },

    addFiltersMutation(state, newFilter) {
      state.filters.push(newFilter)
    },

    removeFiltersMutation(state, removed) {
      state.filters.map((item) => {
        if(item.id === removed) {
          var itemIndex = state.filters.indexOf(item)
          state.filters.splice(itemIndex, 1)
        }
      })
    },

    getMoviesByFiltersMutation(state, newMovies) {
      state.movies.push(newMovies)
    },

    removeMoviesList(state) {
      state.movies = []
    }
  },


  actions: {
    getGenresAction({commit}, newGenres) {
      commit('getGenresMutation', newGenres)
    },

    getActorsAction({commit}, newActors) {
      commit('getActorsMutation', newActors)
    },

    addFiltersAction({commit}, newFilter) {
      commit('addFiltersMutation', newFilter)
    },

    getMoviesByFiltersAction({commit}, newMovies) {
      commit('getMoviesByFiltersMutation', newMovies)
    }
  }
})
