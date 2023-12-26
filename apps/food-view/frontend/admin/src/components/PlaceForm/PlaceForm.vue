<!-- File: src/components/PlaceForm.vue -->

<template>
    <div class="add-place-form">
        <div class="flex flex-row items-center">
            <h3 class="flex-grow">{{ formMode === 'add' ? 'Add' : 'Edit' }} Place</h3>
            <button class="close-button" @click="$emit('closed')">Close</button>
        </div>
        <div class="error" v-if="isFormInvalid">
            Please fill in all required fields and correct validation errors.
        </div>
        <div class="form-group">
            <label for="placeName">Name:</label>
            <div class="form-group-input"><input v-model="newPlace.name" type="text" id="placeName" required /></div>
            <span v-if="!newPlace.name" class="error">Name is required.</span>
        </div>
        <div class="form-group">
            <label for="placeCategory">Category:</label>
            <div class="form-group-input">
                <input v-model="newPlace.category" type="text" id="placeCategory" required />
            </div>
            <span v-if="!newPlace.category" class="error">Category is required.</span>
        </div>
        <div class="form-group">
            <label for="placeStreet">Street:</label>
            <div class="form-group-input">
                <input v-model="newPlace.address.street" type="text" id="placeStreet" required />
            </div>
            <span v-if="!newPlace.address.street" class="error">Street is required.</span>
        </div>
        <div class="form-group">
            <label for="placeCity">City:</label>
            <div class="form-group-input">
                <input v-model="newPlace.address.city" type="text" id="placeCity" required />
            </div>
            <span v-if="!newPlace.address.city" class="error">City is required.</span>
        </div>
        <div class="form-group">
            <label for="placeDistrict">District:</label>
            <div class="form-group-input">
                <input v-model="newPlace.address.district" type="text" id="placeDistrict" required />
            </div>
            <span v-if="!newPlace.address.district" class="error">District is required.</span>
        </div>
        <div class="form-group">
            <label>Longitude - Latitude:</label>
            <div class="flex flex-row items-center form-group-input">
                <input v-model.number="newPlace.location.coordinates[0]" type="text" id="placeLongitude" required />
                <pre class="inline text-2xl"> - </pre>
                <input v-model.number="newPlace.location.coordinates[1]" type="text" id="placeLatitude" required />
            </div>
            <div class="flex flex-col">
                <span v-if="!newPlace.location.coordinates[0]" class="error">Longitude is required.</span>
                <span v-if="!newPlace.location.coordinates[1]" class="error">Latitude is required.</span>
            </div>
        </div>
        <div class="form-group">
            <label>Opening Hours:</label>
            <div class="flex flex-row items-center form-group-input">
                <input v-model="newPlace.openingHours.start" type="time" id="placeStartTime" required
                    @change="(e) => { console.log(e); }" />
                <pre class="inline text-2xl"> - </pre>
                <input v-model="newPlace.openingHours.end" type="time" id="placeEndTime" required />
            </div>
            <div class="flex flex-col">
                <span v-if="!newPlace.openingHours.start" class="error">Opening Hours Start is required.</span>
                <span v-if="!newPlace.openingHours.end" class="error">Opening Hours End is required.</span>
                <span v-if="(newPlace.openingHours.start > newPlace.openingHours.end)" class="error">
                    Opening Hours Start must be larger than Opening Hours End.
                </span>
            </div>
        </div>
        <div class="form-group">
        </div>

        <div class="actions">
            <button @click="savePlace" :disabled="isFormInvalid">Save</button>
        </div>
    </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add scoped styles as needed */
.add-place-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

h3 {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.close-button {
    background-color: #f44336;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
}

.error {
    color: #f44336;
    margin-bottom: 10px;
}

.form-group {
    margin-bottom: 1em;
}

.form-group-input {
    margin-bottom: 0.25em;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-width: 0.125em;
    border-radius: 0.25em;
}

.opening-hours {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: no;
}

.actions {
    text-align: right;
}

button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>

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
        coordinates: [0, 0] as [number, number],
    },
    openingHours: {
        start: '',
        end: '',
    },
};

export default defineComponent({
    props: {
        formMode: {
            // Todo: Write about PropType
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
                (isNaN(this.newPlace.location.coordinates[0]) || isNaN(this.newPlace.location.coordinates[1])) ||
                // (parseFloat(this.newPlace.location.coordinates[0] < -90) < 
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
        newPlace: {
            handler(value) {
                console.log(arguments);
            },
            deep: true
        }
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
                const response = await axios.put(`http://localhost:5172/places/${(this.newPlace as Place)._id}`, this.newPlace);
                if (response.status === 200) {
                    // Successfully updated the place, clear the form and fetch updated places
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
            this.newPlace = structuredClone(defaultPlace) as PlaceWithoutId;
        },
    }
});
</script>
