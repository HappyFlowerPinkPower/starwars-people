<template>
    <div id="app">
      <div class="p-5">
          <h2 class="title is-2">Star Wars characters</h2>
          <LoaderBulma v-if="!active" />
          <PeopleTable v-show="active" @newPlanet="addPlanet" @setPlanet="showPlanet" @showTable="active = true" />
          <PlanetModal v-if="currentPlanet !== '{}'" :info="currentPlanet" @setPlanet="showPlanet" />
      </div>
    </div>
</template>

<script>
import PeopleTable from './components/PeopleTable.vue'
import PlanetModal from './components/PlanetModal.vue'
import LoaderBulma from './components/LoaderBulma.vue'

import Slug from './filters/Slug.js';

export default {
    name: 'App',
    components: {
        PeopleTable,
        PlanetModal,
        LoaderBulma
    },
    filters: {
        Slug
    },
    data() {
      return {
        active: false,
        planet: '',
        planets: {}
      }
    },
    computed: {
        currentPlanet() {
          return JSON.stringify(this.planets[this.planet] || {});
        }
    },
    methods: {
        addPlanet(content) {
          this.planets[this.$options.filters.Slug(content.name)] = content;
        },
        showPlanet(id) {
          if (!id) this.planet = '';
          else this.planet = id; 
        }
    },
}
</script>

<style>

</style>
