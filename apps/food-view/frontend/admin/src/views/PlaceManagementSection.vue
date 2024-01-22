<!-- File: src/views/PlaceManagementSection.vue -->
<template>
    <div>
        <!-- List View -->
        <div class="mt-8 mb-4 flex flex-row items-center">
            <h2 class="text-2xl font-bold mb-4 grow">Places Management</h2>
            <div class="flex items-center mb-4 gap-2">
                <form class="py-2" @submit.prevent="search">
                    <!-- Todo: Throttle & debounce -->
                    <input v-model="query" class="border-2 py-2 px-2 mr-2" type="text"/>
                    <button type="submit" class="py-2 border-2 px-2">Search</button>
                </form>
                <button @click="addBtnClick()" class="bg-blue-500 text-white py-2 px-4 rounded">+</button>
            </div>
        </div>

        <table class="min-w-full border border-gray-300">
            <!-- <caption class="text-lg font-bold mb-4">Places Management</caption> -->
            <thead>
                <tr>
                    <th v-for="{ label, key } in tableHeaders" :key="key" @click="sort(key)"
                        class="cursor-pointer bg-gray-200 px-4 py-2 text-left">
                        <div class="flex flex-row flex-nowrap gap-2">
                            <p class="grow">{{ label }}</p>
                            <pre>{{ sortIcon(key) || " " }}</pre>
                        </div>
                    </th>
                    <th class="bg-gray-200 px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(place, index) in places" :key="place._id">
                    <td v-for="{ key, display } in tableHeaders" :key="key" class="border px-4 py-2">{{ (display?.(place))
                        ?? (place as any)[key] ?? "" }}</td>
                    <td class="border px-4 py-2">
                        <div class="flex flex-row flex-nowrap gap-2">
                            <button @click="viewDetails(place)"
                                class="bg-green-500 text-white py-1 px-2 rounded">Details</button>
                            <button @click="editBtnClick(place)"
                                class="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
                            <button @click="deletePlace(place)"
                                    class="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot>

            </tfoot>
        </table>

        <div class="flex flex-row items-center mt-4">
            <span class=" mr-4 flex-grow">
                <label for="limit" class="mr-2">Size:</label>
                <select v-model="limit" id="limit" class="border rounded py-1 px-2">
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                </select>
            </span>
            <!-- Pagination -->
            <div class="">
                <button @click="page--" :disabled="page === 1"
                    class="bg-blue-500 text-white py-1 px-2 rounded mr-2 disabled:bg-gray-500">Previous
                </button>
                <pre style="display: inline-block;"> Page: {{ page }} </pre>
                <button @click="page++" :disabled="!hasNext" class="bg-blue-500 text-white py-1 px-2 rounded ml-2 disabled:bg-gray-500"> Next
                </button>
            </div>
        </div>

        <PlaceForm v-if="formMode != ''" :form-mode="formMode" :place="placeToEdit" @saved="placeSaved"
            @closed="formMode = ''" />
        <PlaceDetail v-if="selectedPlace" :place="selectedPlace" @closed="selectedPlace = undefined;"/>
    </div>
</template>
  
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add scoped styles as needed */
.place-management-section {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}
</style>
  
  
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { type Place } from "@/models";
import TableComponent from "@/components/table.vue";
import PaginationComponent from "@/components/pagination.vue";
import PlaceForm from "@/components/PlaceForm/PlaceForm.vue";
import PlaceDetail from '@/components/PlaceDetail/PlaceDetail.vue';

type SortDirection = 1 | -1;
type SortOrder = { column: string | null, direction: SortDirection };
type FormMode = "add" | "edit" | "";

function parseSortOrder(config: any, sort: SortOrder) {
    if (sort.column != null) {
        config["sort"] = `${sort.direction == -1 ? "-" : ""}${sort.column}`
    }
    return config;
}

export default defineComponent({
    components: {
        TableComponent: TableComponent,
        PaginationComponent: PaginationComponent,
        PlaceForm: PlaceForm,
        PlaceDetail
    },
    data() {
        return {
            places: [] as Place[], // Define the Place interface (to be created),  
            limit: 5,
            page: 1,
            query: undefined as string | undefined,
            hasNext: true,
            // // Sorting config
            sortConfig: {column: null, direction: 1,} as SortOrder,
            // PlaceForm.vue
            formMode: "" as FormMode,
            placeToEdit: undefined as Place | undefined,
            // PlaceDetail.vue
            selectedPlace: undefined as Place | undefined,
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
                }, {
                    label: "Hours",
                    key: "openingHours",
                    display: (p: Place) => (`${p.openingHours.start} - ${p.openingHours.end}`)
                },
            ],
        };
    },
    mounted() {
        // Fetch places from the backend on component mount
        this.fetchPlaces();
    },
    methods: {
        async fetchPlaces({q, page=1, limit=5, sort}: {q?: string, page?: number, limit?: number, sort?: SortOrder} = {}) {
            console.log(`Fetching places for page ${this.page}`);

            const configAfter = parseSortOrder({
                page: page,
                limit: limit,
            }, sort ?? {column: null, direction: 1});

            if (q) {
                configAfter["q"] = q;
            }

            const urlSearchParams = new URLSearchParams(configAfter);

            try {
                const response = await axios.get(`http://localhost:5172/places?${urlSearchParams}`);
                console.log("Fetching places done");
                const data: { data: Place[], hasNext: boolean } = response.data;
                this.places = data.data;
                this.hasNext = data.hasNext;
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        },
        async search() {
            this.fetchPlaces({
                q: this.query,
                limit: this.limit,
                page: this.page,
                sort: this.sortConfig,
            })
        },
        async editPlace(place: Place) {
            console.log("Edit Place:", place);
            try {
                const response = await axios.put(`http://localhost:5172/places/${(place as Place)._id}`, place);
                if (response.status === 200) {
                    // Successfully updated the place, clear the form and fetch updated places
                    // Emit an event to inform the parent component about the successful addition
                    alert("Successfully updated the place");
                    this.closePlaceForm();
                } else {
                    alert(`Failed to edit place. Status: ${response.status}`);
                }
            } catch (error) {
                alert(`Failed to edit place. Error: ${error}`);

                console.error('Error editting place:', place, error);
            } finally {
            }
        },
        async addPlace(place: Place) {
            console.log("Add place", place);
            try {
                const response = await axios.post('http://localhost:5172/places', place);
                if (response.status === 201) {
                    // Successfully added the place, clear the form and fetch updated places
                    alert("Successfully add the place");
                    this.closePlaceForm();
                    // Emit an event to inform the parent component about the successful addition
                } else {
                    alert(`Failed to add place. Status: ${response.status}`);
                }
            } catch (error) {
                alert(`Failed to edit place. Error: ${error}`);

                console.error('Error adding place:', error);
            } finally {

            }
        },
        async deletePlace(place: Place) {
            // Handle delete functionality
            const answer = confirm("Do you want to delete?");
            if (!answer) {
                return;
            }
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
        async placeSaved(formMode: FormMode, placeReturn: Place) {
            if (formMode == "edit") {
                await this.editPlace(placeReturn);
            }
            else if (formMode == "add") {
                await this.addPlace(placeReturn);
            }
            // console.log(arguments);
            await this.fetchPlaces();
        },
        
        async addBtnClick() {
            console.log("addBtnClick:");
            this.formMode = "add";
            this.page = 1;
        },
        async editBtnClick(place: Place) {
            // Handle edit functionality
            console.log("editBtnClick:", place);
            this.formMode = "edit";
            this.placeToEdit = { ...place };
        },
        viewDetails(place: Place) {
            // Handle view details functionality
            console.log("Viewing details for place:", place);

            this.selectedPlace = place;
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
        closePlaceForm() {
            this.formMode = "";
            this.placeToEdit = undefined;
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
            this.refresh();
        },
        refresh() {
            this.page = 1;
            // this.fetchPlaces();
        }
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
            handler: "fetchPlaces",
            // immediate: true,
            
            // handler: function() {
            //     this.searchConfig = {
            //         page: this.page,
            //         sort: this.sortConfig,
            //         limit: this.limit,
            //     }
            // },
        },
        limit: {
            handler: function() {
                this.fetchPlaces({limit: this.limit})
            },
        }
        // searchConfig() {
        //     this.fetchPlaces();
        // }
    }
});
</script>
  