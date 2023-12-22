<template>
    <table>
        <caption></caption>
        <thead>
            <tr>
                <th v-for="header in headers" :key="header.key">{{ header.label }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data" :key="row._id">
                <td v-for="header in headers" :key="header.key">{{ row[header.key] }}</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script lang="ts">
export default {
    props: {
        headers: Array,
        data: Array,
    },
};
</script>
  
<style>
/* Styles go here */
</style>
  