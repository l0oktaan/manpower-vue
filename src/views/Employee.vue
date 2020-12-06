<template>
  <v-list>
      <v-list-item v-for="(item,index) in employees" :key="index">{{item.name}}</v-list-item>
  </v-list>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            employees: []
        }
    },
    mounted(){
        var path = 'https://jsonplaceholder.typicode.com/users';
        axios.get(path)
        .then(response=>{
            this.employees = response.data;
        })
    }
}
</script>

<style>

</style>