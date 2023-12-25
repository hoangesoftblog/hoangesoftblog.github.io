<!-- File: src/components/PlaceForm.vue -->

<template>
    <div class="add-place-form">
        <h3>{{ formMode === 'add' ? 'Add' : 'Edit' }} Place</h3>
        <div class="error" v-if="isFormInvalid">
            Please fill in all required fields and correct validation errors.
        </div>
        <div class="form-group">
            <label for="placeName">Name:</label>
            <input v-model="newPlace.name" type="text" id="placeName" required />
            <span v-if="!newPlace.name" class="error">Name is required.</span>
        </div>
        <div class="form-group">
            <label for="placeCategory">Category:</label>
            <input v-model="newPlace.category" type="text" id="placeCategory" required />
            <span v-if="!newPlace.category" class="error">Category is required.</span>
        </div>
        <div class="form-group">
            <label for="placeStreet">Street:</label>
            <input v-model="newPlace.address.street" type="text" id="placeStreet" required />
            <span v-if="!newPlace.address.street" class="error">Street is required.</span>
        </div>
        <div class="form-group">
            <label for="placeCity">City:</label>
            <input v-model="newPlace.address.city" type="text" id="placeCity" required />
            <span v-if="!newPlace.address.city" class="error">City is required.</span>
        </div>
        <div class="form-group">
            <label for="placeDistrict">District:</label>
            <input v-model="newPlace.address.district" type="text" id="placeDistrict" required />
            <span v-if="!newPlace.address.district" class="error">District is required.</span>
        </div>
        <div class="form-group">
            <label>Longitude - Latitude:</label>
            <input v-model="newPlace.location.coordinates[0]" type="text" id="placeLongitude" required />
            <input v-model="newPlace.location.coordinates[1]" type="text" id="placeLatitude" required />
            <span v-if="!newPlace.location.coordinates[0]" class="error">Longitude is required.</span>
            <span v-if="!newPlace.location.coordinates[1]" class="error">Latitude is required.</span>
        </div>
        <div class="form-group">
            <label for="placeLatitude">Latitude:</label>
        </div>
        <div class="form-group">
            <label>Opening Hours:</label>
            <div>
                <input v-model="newPlace.openingHours.start" type="time" id="placeStartTime" required
                    @change="(e) => { console.log(e); }" />
                <pre style="display: inline;"> - </pre>
                <input v-model="newPlace.openingHours.end" type="time" id="placeEndTime" required />
            </div>
            <span v-if="!newPlace.openingHours.start" class="error">Opening Hours Start is required.</span>
            <span v-if="!newPlace.openingHours.end" class="error">Opening Hours End is required.</span>
            <span v-if="(newPlace.openingHours.start > newPlace.openingHours.end)" class="error">Opening Hours Start must
                be larger than Opening Hours End.</span>
        </div>
        <div class="form-group">
        </div>

        <div class="actions">
            <button @click="savePlace" :disabled="isFormInvalid">Save</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import axios from 'axios';
import { type Place, type PlaceWithoutId } from "@/models";

const defaultPlace = {
    name: '',
    category: '',
    address: {
        street: '',
        city: '',
        district: '',
        // postalCode: '',
    },
    location: {
        type: 'Point',
        coordinates: [0, 0],
    },
    openingHours: {
        start: '',
        end: '',
    },
};

export default defineComponent({
    props: {
        formMode: {
            type: String as PropType<'add' | 'edit'>,
            required: true,
        },
        // Add a prop for the place details when in edit mode
        editPlaceDetails: {
            type: Object as PropType<PlaceWithoutId>,
            default: () => ({} as PlaceWithoutId),
        },
    },
    data() {
        return {
            newPlace: structuredClone(defaultPlace) as PlaceWithoutId,
        };
    },
    computed: {
        isFormInvalid() {
            return (
                !this.newPlace.name ||
                !this.newPlace.category ||
                !this.newPlace.address.street ||
                !this.newPlace.address.city ||
                !this.newPlace.address.district ||
                !this.newPlace.location.coordinates[0] ||
                !this.newPlace.location.coordinates[1] ||
                // !this.newPlace.openingHours.start ||
                // !this.newPlace.openingHours.end) || 
                // !(this.newPlace.openingHours.start < this.newPlace.openingHours.end ||
                (isNaN(this.newPlace.location.coordinates[0])  ||
                false
            );
        },
    },
    watch: {
        editPlaceDetails: {
            handler(value) {
                if (this.formMode == "add") {
                    this.newPlace = Object.assign(this.newPlace, value) as PlaceWithoutId;
                } else if (this.formMode == "edit") {
                    this.newPlace = Object.assign(this.newPlace, value) as Place;
                }

                console.log(this.newPlace);
            },
            immediate: true,
        },
    },
    methods: {
        async savePlace() {
            if (this.formMode == "edit") {
                await this.editPlace();
            }
            else {
                await this.addPlace();
            }
        },
        async addPlace() {
            try {
                // Send a POST request to add the new place
                const response = await axios.post('http://localhost:5172/places', this.newPlace);

                if (response.status === 201) {
                    // Successfully added the place, clear the form and fetch updated places
                    this.resetForm();

                    // Emit an event to inform the parent component about the successful addition
                    this.$emit('saved', "add", this.newPlace);
                } else {
                    alert(`Failed to add place. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error adding place:', error);
            } finally {

            }
        },
        async editPlace() {
            try {
                // Send a POST request to add the new place
                const response = await axios.put(`http://localhost:5172/places/${(this.newPlace as Place)._id}`, this.newPlace);

                if (response.status === 200) {
                    // Successfully added the place, clear the form and fetch updated places
                    this.resetForm();

                    // Emit an event to inform the parent component about the successful addition
                    this.$emit('saved', "edit", this.newPlace);
                } else {
                    alert(`Failed to edit place. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error editting place:', this.newPlace, error);
            } finally {

            }
        },
        resetForm() {

        },
    }
});
</script>

<style scoped>
/* Add scoped styles as needed */
.error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    display: block;
}

label {
    display: block
}
</style>
