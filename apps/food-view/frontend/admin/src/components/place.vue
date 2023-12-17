<template>
    <div>
        <h2>Admin Places List</h2>
        <ul>
            <li v-for="place in places" :key="place._id">
                {{ place.name }} - {{ place.category }} - {{ place.address }}
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import {type Place} from "@/models";

export default defineComponent({
    data() {
        return {
            places: [] as Place[], // Define the Place interface (to be created)
        };
    },
    mounted() {
        // Fetch places from the backend on component mount
        this.fetchPlaces();
    },
    methods: {
        async fetchPlaces() {
            try {
                // Replace 'backendApiEndpoint' with the actual endpoint to fetch places
                const response = await axios.get('http://localhost:5172/places');
                console.log("Fetching places done");
                // Update the 'places' data with the fetched places
                this.places = response.data;
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        },
    },
});
</script>
  
<style scoped>
/* Add scoped styles as needed */
</style>
  