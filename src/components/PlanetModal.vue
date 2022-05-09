<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <header class="modal-card-head">
                <p class="modal-card-title">Planet Info</p>
                <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body">
                <ul>
                    <li><strong>Name</strong> {{ planet.name }}</li>
                    <li><strong>Diameter</strong> {{ planet.diameter | FormatNumber }} m</li>
                    <li><strong>Climate</strong> {{ planet.climate | Capitalize }}</li>
                    <li><strong>Population</strong> {{ planet.population | FormatNumber }} people</li>
                </ul>
            </section>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
    </div>
</template>

<script>
import FormatNumber from '../filters/FormatNumber.js'
import Capitalize from '../filters/Capitalize.js'

export default {
    props: {
        info: String
    },
    filters: {
        FormatNumber,
        Capitalize
    },
    computed: {
        planet() {
            return JSON.parse(this.info)
        }
    },
    methods: {
        closeModal() {
            this.$emit('setPlanet', false);
        }
    },
}
</script>

<style scoped>
</style>
