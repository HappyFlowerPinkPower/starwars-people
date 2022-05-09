<template>
    <table class="table is-striped is-fullwidth">
        <thead>
            <tr>
                <th @click="filter = 'name'; type = !type">Name</th>
                <th @click="filter = 'height'; type = !type">Height</th>
                <th @click="filter = 'mass'; type = !type">Mass</th>
                <th @click="filter = 'planet'; type = !type">Planet</th>
                <th @click="filter = 'created'; type = !type">Created</th>
                <th @click="filter = 'edited'; type = !type">Edited</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="person, keyPerson in sortedPeople" :key="keyPerson">
                <td>{{ person.name }}</td>
                <td>{{ person.height }} cm</td>
                <td>{{ person.mass }} kg</td>
                <td @click="setPlanet(person.planet)" class="planet-button">{{ person.planet }}</td>
                <td>{{ person.created | FormatDate }}</td>
                <td>{{ person.edited | FormatDate }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import FormatDate from '../filters/FormatDate.js';
import Slug from '../filters/Slug.js';

export default {
    filters: {
        FormatDate,
        Slug
    },
    data() {
        return {
            type: false,
            filter: '',
            people: []
        }
    },
    computed: {
        sortedPeople() {
            return this.people.map(item => item).sort((a, b) => {
                if (this.filter === '') return;

                if (this.type) {
                    if (a[this.filter] > b[this.filter]) return 1;
                    else if (a[this.filter] < b[this.filter]) return -1;
                    else return 0;
                } else {
                    if (a[this.filter] > b[this.filter]) return -1;
                    else if (a[this.filter] < b[this.filter]) return 1;
                    else return 0;
                }
            });
        }
    },
    methods: {
        setPlanet(id) {
            this.$emit('setPlanet', this.$options.filters.Slug(id));
        }
    },
    async created() {
        const getData = async () => {
            const data = await fetch('https://swapi.dev/api/people');
            const { results } = await data.json();

            return results;
        }

        const getPlanet = async (url) => {
            const data = await fetch(url);
            const json = await data.json();

            return json;
        }

        try {
            let result = [];

            for (const person of await getData()) {
                const { homeworld } = person;
                const planet = await getPlanet(homeworld);
                
                this.$emit('newPlanet', {
                    name: planet.name,
                    diameter: planet.diameter,
                    climate: planet.climate,
                    population: planet.population
                });

                result.push({
                    name: person.name,
                    height: parseInt(person.height),
                    mass: parseInt(person.mass),
                    planet: planet.name,
                    created: person.created,
                    edited: person.edited
                });
            }

            this.people = result;
        } catch (error) {
            console.error(error);
        } finally {
            this.$emit('showTable', true);
        }
    }
}
</script>

<style scoped>
  th,
  .planet-button {
      cursor: pointer;
  }
</style>
