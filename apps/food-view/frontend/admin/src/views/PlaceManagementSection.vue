<!-- File: src/views/PlaceManagementSection.vue -->
<template>
    <div>
        <!-- List View -->
        <div>
            <h2>Places Management</h2>
            <div>
                <span>
                    <label for="limit">Size: </label>
                    <select v-model="limit" id="limit">
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                    </select>
                </span>
                <button @click="formMode='add'">Add places</button>
            </div>
        </div>
        <table>
            <caption>Places Management</caption>
            <thead>
                <tr>
                    <th v-for="{ label, key } in tableHeaders" :key="key" @click="sort(key)">{{ label }} {{ sortIcon(key) }}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(place, index) in places" :key="place._id">
                    <td v-for="{ key, display } in tableHeaders" :key="key">{{ (display?.(place)) ?? (place as any)[key] ??
                        "" }}</td>
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
            <button @click="page--" :disabled="page === 1">Previous </button>
            <span> Page {{ page }} </span>
            <button @click="page++" :disabled="!hasNext"> Next </button>
        </div>

        <PlaceForm v-if="formMode != ''" @saved="placeSaved" :form-mode="formMode" :edit-place-details="placeToEdit"/>

    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { type Place } from "@/models";
import TableComponent from "@/components/table.vue";
import PaginationComponent from "@/components/pagination.vue";
import AddPlaceForm from "@/components/PlaceForm/PlaceForm.vue";

type SortOrder = 1 | -1;

function parseSortOrder(config: any, sort: { column: string | null, direction: number }) {
    if (sort.column != null) {
        config["sort"] = `${sort.direction == -1 ? "-" : ""}${sort.column}`
    }
    return config;
}

export default defineComponent({
    components: {
        TableComponent: TableComponent,
        PaginationComponent: PaginationComponent,
        PlaceForm: AddPlaceForm
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
                // { label: "Location", key: "location" },
                {
                    label: "Address",
                    key: "address",
                    // Todo: Make this to insert as HTML
                    // https://vuejs.org/guide/essentials/template-syntax#raw-html
                    display: (p: Place) => (`${p.address.city}, ${p.address.district}, ${p.address.street}`)
                },
                {
                    label: "Opening Hours",
                    key: "openingHours",
                    display: (p: Place) => (`${p.openingHours.start} - ${p.openingHours.end}`)
                },
                // Add more headers as needed
            ],
            
            // // Sorting config
            sortConfig: {
                column: null,
                direction: 1,
            } as { column: string | null, direction: SortOrder },
            // searchConfig: {
            //     page: this.page,
            //     limit: this.limit,
            //     sort: this.sortConfig,
            // },

            formMode: "" as "add" | "edit" | "",
            placeToEdit: undefined as Place | undefined,
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
        async editPlace(place: Place) {
            // Handle edit functionality
            console.log("Editing place:", place);
            this.formMode = "edit";
            this.placeToEdit = {...place};
        },
        async addPlace(place: Place) {
            this.page = 1;
        },
        async deletePlace(place: Place) {
            // Handle delete functionality
            console.log("Deleting place:", place);
            try {
                const response = await axios.delete(`http://localhost:5172/places/${place._id}`);
                if (response.status !== 200) {
                    const { data: { message } }: { data: { message: string } } = response.data;
                    throw new Error(`${response.status.toString()} - ${response.statusText} - ${message}`)
                }
            }
            catch (error) {
                console.error('Error deleting place:', error);
            }
            finally {
                this.page = 1;
            }

        },
        async placeSaved() {
            this.formMode = "";
            await this.fetchPlaces();
        },
        viewDetails(place: Place) {
            // Handle view details functionality
            console.log("Viewing details for place:", place);
        },
        // savePlace() {
        //     // Placeholder for save place functionality (to be implemented)
        //     alert("Placeholder function for saving a place");
        // },
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

    //// Todo: Find ways to handle a redundant fetch:
    ////// Scenario: page=2, now enable sorting.
    ////// Watch sortConfig will pull once.
    ////// And in sort(), page get updated, pull once more => 2 fetches in-a-row
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
  