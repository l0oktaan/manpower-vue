<template>
<v-container class="grey lighten-5">
    <v-row>
        <v-col sm-3><position-empty></position-empty></v-col>
        <v-col sm-9></v-col>
    </v-row>
</v-container>
  
</template>

<script>
import PositionEmpty from '@/components/Chart/PositionEmpty.vue'
export default {
    components: {
        PositionEmpty
    }
}
</script>

<style>

</style>