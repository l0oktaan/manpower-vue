<template>
<!-- <v-container class="grey lighten-5"> -->
    
    <v-row justify="start">
        <v-col md="3" sm="4">
            <!-- <v-card>
                <v-card-text>
                    <div>ข้อมูลตำแหน่งว่าง</div>      
                    
                    <v-list v-for="(items,name1) in positions" :key="name1">
                        <b @click="get_list(name1)">{{name1 + ' ' + items.length + ' อัตรา'}}</b> -->
                        <!-- <v-list-item v-for="(item,index) in items" :key="index">{{item.section + ' ' + item.division}}</v-list-item> -->
                    <!-- </v-list>
                </v-card-text>                
            </v-card> -->
            
            <h3>ข้อมูลตำแหน่งว่าง</h3>
            <!-- {{positions}} -->
            <v-progress-circular
                indeterminate
                color="primary"
                v-if="loading"
            ></v-progress-circular>
            <v-slide-y-transition>
            <v-card v-show="!loading">
                <!-- <div v-for="(position,index) in positions" :key="index">
                    {{position.name1}}
                </div> -->
                <!-- {{positions}} -->
                <v-list v-for="(item,index) in positions" :key="index" >
                    <v-list-item :class="item.name == position_name ? 'list_select' : ''" @click="get_list(item.name)">                        
                        <v-list-item-content>
                            {{item.name}}
                        </v-list-item-content>  
                        
                        <v-list-item-avatar size="30" color="blue" align="right" >
                            {{item.count}}
                        </v-list-item-avatar>                        
                                             
                    </v-list-item>  
                    <v-divider></v-divider>                  
                </v-list>
                <!-- <v-list>
                    <v-list-item>
                        <v-list-item-avatar color="blue">
                            10
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                >Auto & transport</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >$700 left</v-list-item-subtitle
                            >
                        </v-list-item-content>
                        <v-list-item-content align="right">
                        <v-list-item-title class="indigo--text"
                            >$1,200</v-list-item-title
                        >
                        <v-list-item-subtitle
                            >$500 of 1,200</v-list-item-subtitle
                        >
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                    <v-list-item>
                        <v-list-item-avatar color="blue">
                            10
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                >Auto & transport</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >$700 left</v-list-item-subtitle
                            >
                        </v-list-item-content>
                        <v-list-item-content align="right">
                        <v-list-item-title class="indigo--text"
                            >$1,200</v-list-item-title
                        >
                        <v-list-item-subtitle
                            >$500 of 1,200</v-list-item-subtitle
                        >
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                </v-list> -->
            </v-card>
            </v-slide-y-transition>
        </v-col>
        <v-col md="9" sm="8">
            <b>รายละเอียดตำแหน่ง : </b>                  
                <v-chip
                    class="ma-2"
                    close
                    color="teal"
                    text-color="white"
                    @click:close="clear_search"
                    v-if="position_name"
                    >                    
                    {{position_name}}
                </v-chip>
                
            <!-- <v-list-item v-for="(item,index) in position_list" :key="index">
                {{'เลขที่ ' + item.no + ' ' + item.level_frame + ' ' + item.section + ' ' + item.division}}
            </v-list-item> -->
            <v-row>
                <v-spacer></v-spacer>
                <v-col md="4" class="pt-1 pb-1">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="ค้นหา"
                        clearable
                        hide-details
                        v-if="position_name"
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <!-- <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
                v-if="position_name"
            ></v-text-field> -->
            <v-slide-y-transition>
            <v-data-table
                
                :headers="headers"
                :items="position_list"
                :items-per-page="10"
                :search="search"
                class="elevation-1"
                v-show="position_name"                
            >
                <template v-slot:item.actions="{ item }">
                    
                    <v-btn
                        color="primary"
                        fab
                        x-small
                        dark
                        @click="editItem(item)"
                        ma-2
                        >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    
                    
                </template>
            </v-data-table>
            </v-slide-y-transition>
        </v-col>
    </v-row>
<!-- </v-container> -->
  
</template>

<script>
// import PositionEmpty from '@/components/Chart/PositionEmpty.vue'
import _ from 'lodash'


export default {
    components: {
        
    },
    data(){
        return {
            loading: true,
            search: '',
            positions : [],
            empty_position : this.$store.getters.empty_position,
            position_list : [],
            position_name: this.$store.getters.empty_position_name, //'',
            arr_header_class: ['blue darken-3', 'white--text'],
            headers: [
                {
                    text: 'เลขที่ตำแหน่ง',
                    align: 'start',
                    // sortable: false,
                    value: 'no',
                    class: ['blue darken-3', 'white--text'],
                },
                { text: 'ระดับ', value: 'level_frame', class: ['blue darken-3', 'white--text'],},
                { text: 'กลุ่มงาน', value: 'section' , class: ['blue darken-3', 'white--text']},
                { text: 'หน่วยงาน', value: 'division' , class: ['blue darken-3', 'white--text']},
                { text: 'ดำเนินการ', value: 'actions', sortable: false, class: ['blue darken-3', 'white--text'] },                
                ],
        }
    },
    watch : {
        async empty_position(){
            let iposition = await _.groupBy(this.empty_position, 'name1');            
            let arrPosition = [];
            await Object.keys(iposition).forEach(p => {
                arrPosition.push({
                    name : p,
                    count : iposition[p].length
                })
            })           

            this.positions = await _.orderBy(arrPosition,'count','desc');
            
        }
    },
    async beforeMount(){
        // await this.$store.dispatch('get_empty_position');
    },
    async mounted(){
        await this.fetchData();
    },
    created(){
        // this.empty_position = this.$store.getters.empty_position;
    },
    methods: {
        async fetchData(){
            this.arr_header_class = ['blue darken-3', 'white--text'];
        
        // this.$nextTick(()=>{
            // await this.$store.dispatch('get_empty_position');
            if (!this.empty_position){
                await this.$store.dispatch('get_empty_position');
                this.empty_position = await this.$store.getters.empty_position;
                this.loading = await false;
            }else{
                this.loading = false;
            }
            let iposition = await _.groupBy(this.empty_position, 'division');            
            let arrPosition = [];
            await Object.keys(iposition).forEach(p => {
                arrPosition.push({
                    name : p,
                    count : iposition[p].length
                })
            })           

            this.positions = await _.orderBy(arrPosition,'count','desc');
            
            
        // });
        
        // this.empty_position_name = this.$store.getters.empty_position_name;
        
            if (await this.position_name){
                this.position_list = await this.empty_position.filter(x=>x.name1 == this.position_name);
                // await this.get_list(this.empty_position_name);
            }
        },
        // get_positions() {
        //     return _.groupBy(this.empty_position, 'name2') 
        // }
        get_list(name1){
            this.$store.commit('empty_position_name',name1);
            this.position_name = name1;
            this.position_list = this.empty_position.filter(x=>x.name1 == name1);
        },
        clear_search(){
            this.search = '';
            this.position_name = null;
            this.$store.commit('empty_position_name',null);
        }
    },
    
}
</script>

<style scoped lang="scss">
.v-list-item__avatar{
    cursor: pointer!important;
}
.list_select{
    background-color: rgb(171, 220, 243)!important;
}
.v-list{
    padding: 0 !important;
}

.v-list-item__content{
    font-size: 0.9rem!important;
}
.text-start{
    font-size: 0.8rem!important;
}
</style>