<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-text>
        <div>ข้อมูลตำแหน่งว่าง</div>       
        
        <v-list v-for="(items,name1) in positions" :key="name1">
            <b>{{name1 + ' ' + items.length + ' อัตรา'}}</b>
            <!-- <v-list-item v-for="(item,index) in items" :key="index">{{item.section + ' ' + item.division}}</v-list-item> -->
        </v-list>
    </v-card-text>
    
  </v-card>
</template>

<script>
import _ from 'lodash'
export default {
    data(){
        return {
            positions : [],
            empty_position : [],//this.$store.getters.empty_position
            position_list : []
        }
    },
    watch : {
        empty_position(){
            this.positions = _.groupBy(this.empty_position, 'name1')
        }
    },
    mounted(){
        this.$store.dispatch('get_empty_position');
        this.empty_position = this.$store.getters.empty_position;
    },
    methods: {
        // get_positions() {
        //     return _.groupBy(this.empty_position, 'name2') 
        // }
        get_list(name1){
            return this.empty_position.filter(item=>{
                return item.name1.indexOf(name1) > -1
            })
        }
    },
    computed: {
        
},
}
</script>

<style>

</style>