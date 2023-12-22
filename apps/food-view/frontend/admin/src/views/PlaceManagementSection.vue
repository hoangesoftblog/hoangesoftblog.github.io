<template>
    <div>
        <!-- List View -->
        <h2>Places Management</h2>

        <table>
            <caption>Places Management</caption>
            <thead>
                <tr>
                    <th @click="sort('name')">Name {{ sortIcon('name') }}</th>
                    <th @click="sort('category')">Category {{ sortIcon('category') }}</th>
                    <th @click="sort('address')">Address {{ sortIcon('address') }}</th>
                    <th @click="sort('location')">Location {{ sortIcon('location') }}</th>
                    <th @click="sort('openingHours')">Opening Hours {{ sortIcon('openingHours') }}</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(place, index) in places" :key="place._id">
                    <td>{{ place.name }}</td>
                    <td>{{ place.category }}</td>
                    <td>{{ place.address.city }}, {{ place.address.district }}, {{ place.address.street }}</td>
                    <td>{{ place.location.coordinates }}</td>
                    <td>{{ place.openingHours.start }} - {{ place.openingHours.end }}</td>
                    <td>
                        <button @click="editPlace(place)">Edit</button>
                        <button @click="deletePlace(place)">Delete</button>
                        <button @click="viewDetails(place)">Details</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination">
            <button @click="page--" :disabled="page === 1">Previous</button>
            <span>Page {{ page }}</span>
            <button @click="page++" :disabled="!hasNext">Next</button>
        </div>

        <template>
            <TableComponent :headers="tableHeaders" :data="places" />
            <!-- Pagination -->
            <PaginationComponent :currentPage="page" :hasNext="hasNext" @update-page="offsetPage" />
        </template>

        <template>
            <!-- Add/Edit Place Form -->
            <h3>Add/Edit Place</h3>
            <!-- Form fields go here -->
            <div class="actions">
                <button @click="savePlace">Save</button>
            </div>
        </template>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { type Place } from "@/models";
import TableComponent from "@/components/table.vue";
import PaginationComponent from "@/components/pagination.vue";

type SortOrder = 1 | -1;

function parseSortOrder(config: any, sort: {column: string | null, direction: number}) {
    if (!((sort.column == null))) {
        config["sort"] = `${sort.direction == -1 ? "-" : ""}${sort.column}`
    }
    return config;
}

export default defineComponent({
    components: {
        TableComponent: TableComponent,
        PaginationComponent: PaginationComponent,
    },
    data() {
        return {
            places: [] as Place[], // Define the Place interface (to be created),  
            limit: 5,
            page: 1,
            hasNext: true,
            tableHeaders: [
                { label: "Name", key: "name" },
                { label: "Category", key: "category" },
                { label: "Address", key: "address" },
                { label: "Location", key: "location" },
                { label: "Opening Hours", key: "openingHours" },
                // Add more headers as needed
            ],

            // // Sorting config
            sortConfig: { 
                column: null, 
                direction: 1, 
            } as {column: string | null, direction: SortOrder},
            searchConfig: {
                page: this.page,
                limit: this.limit,
                sort: this.sortConfig,
            },
        };
    },
    mounted() {
        // Fetch places from the backend on component mount
        this.fetchPlaces();
    },
    methods: {
        async fetchPlaces() {
            console.log(`Fetching places for page ${this.page}`);
            
            const config = {
                page: this.page,
                limit: this.limit,
            };

            const configAfter = parseSortOrder(config, this.sortConfig);
            const urlSearchParams = new URLSearchParams(configAfter);
            
            try {
                // Replace 'backendApiEndpoint' with the actual endpoint to fetch places
                const response = await axios.get(`http://localhost:5172/places?${urlSearchParams}`);
                console.log("Fetching places done");
                // Update the 'places' data with the fetched places
                const data: { data: Place[], hasNext: boolean } = response.data;
                this.places = data.data;
                this.hasNext = data.hasNext;
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        },
        editPlace(place: Place) {
            // Handle edit functionality
            console.log("Editing place:", place);
        },
        deletePlace(place: Place) {
            // Handle delete functionality
            console.log("Deleting place:", place);
        },
        viewDetails(place: Place) {
            // Handle view details functionality
            console.log("Viewing details for place:", place);
        },
        savePlace() {
            // Placeholder for save place functionality (to be implemented)
            alert("Placeholder function for saving a place");
        },
        offsetPage(offset: number) {
            this.page = this.page + offset;
        },

        // // Sorting
        sortIcon(column: string) {
            if (this.sortConfig.column === column) {
                return this.sortConfig.direction === 1 ? '▲' : '▼';
            }
            return ''; // No icon for non-sorted columns
        },
        sort(column: string) {
            if (this.sortConfig.column === column) {
                // Toggle sort direction if the same column is clicked
                this.sortConfig.direction = this.sortConfig.direction === 1 ? -1 : 1;
            } else {
                // Set the new column for sorting
                this.sortConfig.column = column;
                this.sortConfig.direction = 1; // Default to ascending order
            }

            // Reset page to 1 after sorting
            this.page = 1;
        },
    },
    watch: {
        page() {
            // this.searchConfig = {
            //     page: this.page,
            //     sort: this.sortConfig,
            //     limit: this.limit,
            // }
            this.fetchPlaces();
        },
        sortConfig: {
            deep: true,
            // handler: function() {
            //     this.searchConfig = {
            //         page: this.page,
            //         sort: this.sortConfig,
            //         limit: this.limit,
            //     }
            // }
            handler: "fetchPlaces"
        },
        // searchConfig() {
        //     this.fetchPlaces();
        // }
    }
});
</script>
  
<style scoped>
/* Add scoped styles as needed */
</style>
  