<!-- File: src/components/PlaceDetail/PlaceDetail.vue -->
<template>
    <!-- Todo: Beautify this component -->
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="flex flex-row">
                <h2 class="text-2xl font-bold grow">Details</h2>
                <button @click="closeModal">Close</button>
            </div>
            <div class="place-details">
                <h3>{{ place.name }}</h3>
                <p>Category: {{ place.category }}</p>
                <p>Address: {{ place.address.street }}, {{ place.address.district }}, {{ place.address.city }}</p>
                <p>Opening Hours: {{ place.openingHours.start }} - {{ place.openingHours.end }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.modal-background {
    /* Add background styling here */
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
}

/* Add other styling as needed */
</style>
<script lang="ts">
import { type Place } from '@/models';

export default {
    props: {
        place: {
            type: Object,
            required: true,
            // validator: (value) => value instanceof Place, // Ensure it's a valid Place object
        },
    },
    methods: {
        closeModal() {
            this.$emit('closed');
        },
    },
};
</script>