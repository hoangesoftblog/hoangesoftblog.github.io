<!-- File: src/components/PlaceDetail/PlaceDetail.vue -->
<template>
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

    <template>
        <div class="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
                <div class="flex justify-between items-center pb-3">
                    <h2 class="text-2xl font-bold text-gray-700">Details</h2>
                    <button class="modal-close cursor-pointer z-50" @click="closeModal">
                        <svg class="fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                            viewBox="0 0 18 18">
                            <path
                                d="M12.45 5.55a.9.9 0 00-1.27 0L9 7.73 6.82 5.55a.9.9 0 10-1.27 1.27L7.73 9l-2.18 2.18a.9.9 0 101.27 1.27L9 10.27l2.18 2.18a.9.9 0 001.27-1.27L10.27 9l2.18-2.18a.9.9 0 000-1.27z" />
                        </svg>
                    </button>
                </div>
                <div class="place-details mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ place.name }}</h3>
                    <p class="text-gray-600 mb-1">Category: 
                        <div class="inline-box text-gray-700 p-2"> 
                            {{ place.category }}
                        </div>
                    </p>
                    <p class="text-gray-600 mb-1">Address: <span class="text-gray-700">{{ place.address.street }}, {{
                        place.address.district }}, {{ place.address.city }}</span></p>
                    <p class="text-gray-600">Opening Hours: <span class="text-gray-700">{{ place.openingHours.start }} - {{
                        place.openingHours.end }}</span></p>
                </div>
            </div>
        </div>
    </template>

    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
                <h2 class="text-3xl font-bold text-gray-900">Details</h2>
                <div class="mt-2 px-7 py-3">
                    <h3 class="text-xl font-semibold text-gray-700">{{ place.name }}</h3>
                    <p class="text-sm text-gray-500 mt-1">Category: 
                        <div class="inline-block text-gray-700">
                            <!-- <div class="inline-block px-2 py-0.5 rounded-full text-slate-100 bg-red-400">
                                {{ place.category}}
                            </div> -->
                            <badge>{{ place.category}}</badge>
                        </div>
                    </p>
                    <p class="text-sm text-gray-500 mt-1">Address: <span class="text-gray-700">{{ place.address.street
                    }}, {{ place.address.district }}, {{ place.address.city }}</span></p>
                    <p class="text-sm text-gray-500 mt-1">Opening Hours: <span class="text-gray-700">{{
                        place.openingHours.start }} - {{ place.openingHours.end }}</span></p>
                </div>
                <div class="items-center px-4 py-3">
                    <button id="ok-btn" @click="closeModal"
                        class="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    
    <template>
        <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div class="modal-background absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div class="modal-content container mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
                <div class="flex flex-row items-center justify-between border-b pb-2">
                    <h2 class="text-2xl font-bold">Details</h2>
                    <button class="py-2 px-4 bg-red-500 text-white font-bold rounded hover:bg-red-700"
                        @click="closeModal">Close</button>
                </div>
                <div class="place-details mt-4">
                    <h3 class="text-xl font-semibold mb-2">{{ place.name }}</h3>
                    <p class="text-gray-600"><span class="font-medium">Category:</span> {{ place.category }}</p>
                    <p class="text-gray-600"><span class="font-medium">Address:</span> {{ place.address.street }}, {{
                        place.address.district }}, {{ place.address.city }}</p>
                    <p class="text-gray-600"><span class="font-medium">Opening Hours:</span> {{ place.openingHours.start }} - {{
                        place.openingHours.end }}</p>
                </div>
            </div>
        </div>
    </template>
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
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
}

.bg-smoke-light {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-close {
    transition: transform 0.3s ease;
}

.modal-close:hover {
    transform: rotate(90deg);
}

/* Add other styling as needed */
</style>
<script lang="ts">
import { type Place } from '@/models';
import Badge from "@/components/Badge/Badge.vue";

export default {
    components: {
        Badge
    },
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