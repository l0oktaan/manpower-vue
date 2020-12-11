<template>
<v-container class="grey lighten-5">
    <v-row justify="start">
        <v-col md="3">
            <v-card>
                <v-card-text>
                    <div>ข้อมูลตำแหน่งว่าง</div>       
                    
                    <v-list v-for="(items,name1) in positions" :key="name1">
                        <b @click="get_list(name1)">{{name1 + ' ' + items.length + ' อัตรา'}}</b>
                        <!-- <v-list-item v-for="(item,index) in items" :key="index">{{item.section + ' ' + item.division}}</v-list-item> -->
                    </v-list>
                </v-card-text>                
            </v-card>
        </v-col>
        <v-col md="9">
            <b>{{position_name}}</b>
            <!-- <v-list-item v-for="(item,index) in position_list" :key="index">
                {{'เลขที่ ' + item.no + ' ' + item.level_frame + ' ' + item.section + ' ' + item.division}}
            </v-list-item> -->
            <v-data-table
                :headers="headers"
                :items="position_list"
                :items-per-page="5"
                class="elevation-1"
            ></v-data-table>
        </v-col>
    </v-row>
</v-container>
  
</template>

<script>
// import PositionEmpty from '@/components/Chart/PositionEmpty.vue'
import _ from 'lodash'
export default {
    components: {
        
    },
    data(){
        return {
            positions : [],
            empty_position : [],//this.$store.getters.empty_position
            position_list : [],
            position_name: '',
            headers: [
                {
                    text: 'เลขที่ตำแหน่ง',
                    align: 'start',
                    sortable: false,
                    value: 'no',
                },
                { text: 'ระดับ', value: 'level_frame' },
                { text: 'กลุ่มงาน', value: 'section' },
                { text: 'สังกัด', value: 'division' }                
                ],
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
            this.position_name = name1;            
            this.position_list = this.empty_position.filter(x=>x.name1 == name1);
        }
    },
}
</script>

<style>

</style>