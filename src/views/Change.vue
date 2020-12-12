<template>
  <v-container>
      <v-row justify="end">
          <v-col md="4">
              
              </v-col>
      </v-row>
      <v-row>
          <v-col>
              
                <!-- <div v-for="(item,index) in change_list" :key="index">{{index + 1 + '' + item.employee_name}}</div> -->
                <v-progress-circular
                    indeterminate
                    color="primary"
                    v-if="loading"
                ></v-progress-circular>
                <v-data-table
                    :headers="headers"
                    :items="change_list"
                    :items-per-page="15"
                    :search = "search_change"
                    class="elevation-1"
                    v-if="change_list">
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>รายการเปลี่ยนแปลงข้อมูล</v-toolbar-title>
                            <v-divider
                            class="mx-4"
                            inset
                            vertical
                            ></v-divider>
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                color="green"
                                small
                                >
                                
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search_change"
                                append-icon="mdi-magnify"
                                label="ค้นหา"
                                clearable
                                hide-details
                                v-if="change_list"  
                                class="shrink mx-2"                             
                                
                            ></v-text-field>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.type="{ item }">
                        
                            {{ get_change_type(item.type) }}
                        
                    </template>
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
            
          </v-col>
      </v-row>
      <v-row>
          <v-col>{{change_list_link}}</v-col>
      </v-row>
      <v-row>
          <v-col>{{change_list_page}}</v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            loading: true,
            search_change: '',
            change_list : this.$store.getters.change_list,
            change_list_link : null,
            change_list_page : null,
            headers: [
                {
                    text: 'วันที่ดำเนินการ',
                    align: 'start',
                    // sortable: false,
                    value: 'updated_date',
                    class: ['blue darken-3', 'white--text']
                },
                { text: 'ประเภท', value: 'type', class: ['blue darken-3', 'white--text']},
                { text: 'เลขที่คำสั่ง', value: 'command_no', class: ['blue darken-3', 'white--text']},
                { text: 'คำสั่งลงวันที่', value: 'command_date', class: ['blue darken-3', 'white--text']},
                { text: 'เลขที่ตำแหน่ง', value: 'position_no',class: ['blue darken-3', 'white--text'] },
                { text: 'ชื่อ-สกุล', value: 'employee_name',class: ['blue darken-3', 'white--text'] },
                { text: 'ตำแหน่ง', value: 'position',class: ['blue darken-3', 'white--text'] },
                { text: 'ระดับ', value: 'level',class: ['blue darken-3', 'white--text'] },
                { text: 'ดำเนินการ', value: 'actions', sortable: false, class: ['blue darken-3', 'white--text'] },
                              
            ],      
            change_type: [
                {text: 'บรรจุ/รับโอน', value : 1},
                {text: 'เลื่อนระดับ', value : 2},
                {text: 'ย้ายเข้า', value : 3},
                {text: 'ย้ายออก', value : 4},
                {text: 'ลาออก/ให้โอน', value : 5},
                {text: 'ยกมา', value : 6},
                {text: 'ให้ไปรักษาการ', value : 7}
            ]
        }
    },
    async mounted(){
        await this.fetchData();
    },
    methods: {
        async fetchData(){
            if (!this.change_type){
                await this.$store.dispatch('get_change');
                this.loading = await false;
                this.change_list = await this.$store.getters.change_list;
                this.change_list_link = await this.$store.getters.change_list_link;
                this.change_list_page = await this.$store.getters.change_list_page;
            }else{
                this.loading = await false;
            }
            
        },
        get_change_type(value){
            // return this.change_type[this.change_type.indexOf(x=>x.value == value)]['text'];
            let index = this.change_type.findIndex(x=>x.value == value);
            
            return this.change_type[index]['text'];
        }
    }
}
</script>

<style scoped>
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
.v-text-field{
      width: 300px!important;
}
</style>