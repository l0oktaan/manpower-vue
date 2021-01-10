<template>
<v-container>
    <v-row>
        <v-col cols="3">
            <v-text-field                
                append-outer-icon="mdi-magnify"
                label="ค้นหาข้อมูล"
                clearable
                hide-details                    
                class="shrink mx-2"
                v-on:keyup.enter="search"
                v-model="filter"
                @click:append-outer="search"
                @click:clear="clearFilter"
            ></v-text-field>
            
        </v-col>
        <v-col cols="2">
            <!-- <v-btn
                class="mx-2"
                fab
                dark
                small
                color="success"
                >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn> -->
            
            <v-dialog
                
                v-model="dialog"
                
                persistent
                max-width="800px"
                
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        tile
                        color="success"
                        v-bind="attrs"
                        v-on="on"
                        >
                        <v-icon left>
                            mdi-plus
                        </v-icon>
                        เพิ่มข้อมูล
                    </v-btn>
                </template>
                <v-card>                    
                    <v-card-title>
                        <span class="headline">ข้อมูลข้าราชการ</span>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="black"
                            icon
                            @click="close_modal"
                            >
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                            <validation-observer
                                ref="observer"
                                v-slot="{ invalid }"
                            >                            
                                <form @submit.prevent="submit">
                                    
                                    <v-container>
                                        <v-row>
                                            <v-col cols="3">
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="prefix"
                                                    rules="required"
                                                >
                                                    <v-select
                                                    v-model="prefix"
                                                    :items="arr_prefix"
                                                    :error-messages="errors"
                                                    label="คำนำหน้า"
                                                    data-vv-name="prefix"
                                                    
                                                    
                                                    ></v-select>
                                                </validation-provider>
                                            </v-col>
                                            <v-col>
                                                
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="prefix_select"
                                                    :rules="prefix ? (prefix == 9 ? 'required' : '') : ''"
                                                    
                                                >
                                                    <v-autocomplete
                                                        data-vv-name="prefix_select"
                                                        v-model="prefix_select"
                                                        :items="prefix_list"
                                                        item-text="prefix"                                                    
                                                        :error-messages="errors"
                                                        clearable                                                 
                                                        label="ระบุคำนำหน้า"
                                                        v-show="prefix == 9"
                                                        
                                                    ></v-autocomplete>
                                                </validation-provider>
                                            </v-col>
                                            <v-col>                                                
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="gender"
                                                    rules="required"
                                                >
                                                <v-radio-group
                                                    class="gender"
                                                    v-model="gender"
                                                    row
                                                    v-if="prefix == 9"
                                                    :error-messages="errors"
                                                    mandatory
                                                    >
                                                    <v-radio
                                                        label="ชาย"
                                                        value="1"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="หญิง"
                                                        value="2"
                                                    ></v-radio>
                                                </v-radio-group>
                                                </validation-provider>
                                            </v-col>
                                        </v-row>
                                        
                                        <v-row>                                            
                                            <v-col>
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="ชื่อ"
                                                    rules="required"
                                                >
                                                    <v-text-field
                                                        v-model="name"
                                                        dense
                                                        :error-messages="errors"
                                                        label="ชื่อ"
                                                        
                                                        
                                                    ></v-text-field>
                                                </validation-provider>
                                            </v-col>
                                            <v-col>
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="นามสกุล"
                                                    rules="required"
                                                >
                                                    <v-text-field
                                                        v-model="surname"
                                                        dense
                                                        :error-messages="errors"
                                                        label="นามสกุล"
                                                        
                                                        
                                                    ></v-text-field>
                                                </validation-provider>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="หมายเลขบัตรประชาชน"
                                                    :rules="{                                                            
                                                            digits: 13,                                                            
                                                        }"
                                                >
                                                    <v-text-field
                                                        v-model="citizen_id"
                                                        
                                                        :error-messages="errors"
                                                        label="หมายเลขบัตรประชาชน"
                                                        
                                                        dense
                                                        maxlength="13"
                                                    ></v-text-field>
                                                </validation-provider>
                                            </v-col>
                                            <v-col>
                                                <v-switch
                                                class="add_type"
                                                    v-model="switch1"
                                                    :label="`บันทึกข้อมูลการบรรจุ`"
                                                ></v-switch>
                                            </v-col>
                                            <v-slide-x-transition>
                                            <v-col v-show="switch1">                                                                                                
                                                <v-radio-group
                                                    v-model="add_type"
                                                    row
                                                    dense
                                                    class="add_type"
                                                    mandatory
                                                    >
                                                    <v-radio
                                                        label="บรรจุใหม่ (บัญชีกรม)"
                                                        value="11"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="บรรจุใหม่ (บัญชีอื่น)"
                                                        value="12"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="รับโอน"
                                                        value="13"
                                                    ></v-radio>
                                                </v-radio-group>                                                
                                            </v-col>    
                                            </v-slide-x-transition>                                        
                                        </v-row>
                                        <v-slide-x-transition>
                                        <v-row v-show="switch1">           
                                            
                                            <v-col cols="3">
                                                <v-menu
                                                    ref="start_menu"
                                                    v-model="start_menu"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="start_date"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field                                                        
                                                        v-model="getStartThaiDate"
                                                        label="ตั้งแต่วันที่"                                                        
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="start_date"
                                                        no-title
                                                        scrollable
                                                        locale="th-TH"
                                                        >
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            text
                                                            color="primary"
                                                            @click="start_menu = false"
                                                        >
                                                            ยกเลิก
                                                        </v-btn>
                                                        <v-btn
                                                            text
                                                            color="primary"
                                                            @click="$refs.start_menu.save(start_date)"
                                                        >
                                                            ตกลง
                                                        </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>  
                                            <v-col cols="2">
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="command_no"
                                                    :rules="switch1 ? 'required' : ''"
                                                >
                                                    <v-text-field
                                                        v-model="command_no"                                                        
                                                        :error-messages="errors"
                                                        label="เลขที่คำสั่ง"
                                                                                                                
                                                    ></v-text-field>
                                                </validation-provider>
                                            </v-col>   
                                            <v-col cols="3">
                                                <v-menu
                                                    ref="menu"
                                                    v-model="menu"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="command_date"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field                                                        
                                                        v-model="getThaiDate"
                                                        label="ลงวันที่"
                                                        
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="command_date"
                                                        no-title
                                                        scrollable
                                                        locale="th-TH"
                                                        >
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            text
                                                            color="primary"
                                                            @click="menu = false"
                                                        >
                                                            ยกเลิก
                                                        </v-btn>
                                                        <v-btn
                                                            text
                                                            color="primary"
                                                            @click="$refs.menu.save(command_date)"
                                                        >
                                                            ตกลง
                                                        </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>                                 
                                            <v-col cols="4">  
                                                                                              
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="level"
                                                    :rules="switch1 ? 'required' : ''"
                                                >
                                                    <v-select
                                                    
                                                    v-model="level"
                                                    :items="level_list"
                                                    item-text="name"
                                                    item-value="id"
                                                    :error-messages="errors"
                                                    label="ระดับ"
                                                    data-vv-name="level"
                                                    
                                                    v-if="level_list"
                                                    ></v-select>
                                                </validation-provider>
                                            </v-col>
                                        </v-row>
                                        </v-slide-x-transition>
                                        <v-slide-x-transition>
                                        <v-row v-show="switch1">
                                            <v-col cols="3">
                                                <validation-provider
                                                    v-slot="{ errors }"
                                                    name="position"
                                                    :rules="switch1 ? 'required' : ''"
                                                >                                                    
                                                    <v-autocomplete
                                                        class="position"
                                                        data-vv-name="position"
                                                        v-model="position"
                                                        :items="position_list"
                                                        item-text="no"                                                    
                                                        :error-messages="errors"
                                                        clearable                                                 
                                                        label="หมายเลขตำแหน่ง"
                                                        v-if="position_list"
                                                        
                                                    ></v-autocomplete>
                                                </validation-provider>
                                            </v-col>
                                            <v-col>
                                                <v-list-item>
                                                    <v-list-item-content>                                                        
                                                        <v-list-item-subtitle><strong>ตำแหน่ง : </strong><span v-if="position_select">{{position_select.name1}}</span></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>                                                        
                                                        <v-list-item-subtitle><strong>ระดับ (กรอบ) : </strong><span v-if="position_select">{{position_select.level_frame}}</span></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        
                                                        <v-list-item-subtitle><strong>กลุ่มงาน : </strong><span v-if="position_select">{{position_select.section}}</span></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        
                                                        <v-list-item-subtitle><strong>สังกัด : </strong><span v-if="position_select">{{position_select.division}}</span></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                
                                            </v-col>
                                        </v-row>
                                        </v-slide-x-transition>
                                        <v-row justify="center">
                                            <v-col cols="12">
                                                
                                                <v-card 
                                                    elevation="0"
                                                >
                                                    <v-card-actions>   
                                                        <v-spacer></v-spacer>                                                     
                                                        <v-btn
                                                            color="red darken-1"
                                                            text
                                                            type="reset"
                                                            @click="clear"
                                                        >
                                                            <v-icon left>
                                                                far fa-times-circle
                                                            </v-icon>
                                                            ยกเลิก
                                                        </v-btn>
                                                        <v-btn
                                                            color="blue darken-1"
                                                            type="submit"
                                                            text
                                                            :disabled="invalid"
                                                            
                                                        >
                                                            <v-icon left>
                                                                far fa-save
                                                            </v-icon>
                                                            บันทึก
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                                
                                            </v-col>
                                        </v-row>
                                    
                                    </v-container>
                                    
                                </form>
                            </validation-observer>                                             
                    </v-card-text>
                    
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="4">
            <v-alert
                v-model="alert"                
                close-text="Close Alert"
                transition="scale-transition"
                type="warning"
                dismissible
                
                >
                    ไม่พบข้อมูล
            </v-alert>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <!-- {{filter}}
            {{result_search}} -->
            
            <v-data-table
                
                :headers="headers"
                :items="result_search"
                :items-per-page="10"
                
                class="elevation-1"
                v-show="result_search.length>0"                
            >                
            </v-data-table>
        </v-col>
    </v-row>
</v-container>
  
</template>

<script>
import axios from 'axios';
import { required, max, digits, regex} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
...required,
message: 'กรุณาใส่ข้อมูล',
})
extend('max', {
...max,
message: 'ความยาวไม่เกิน {length} ตัวอักษร',
})
extend('digits', {
    ...digits,
    message: 'ใส่ได้เฉพาะตัวเลข และจำนวน {length} หลัก',
})
extend('regex', {
    ...regex,
    message: 'รูปแบบข้อมูลไม่ถูกต้อง',
})

export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data(){
        return {
            change: null,
            dialog: false,
            filter: null,
            result_search: [],
            valid: false,
            firstname: '',
            lastname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            headers: [                
                { text: 'ชื่อ - นามสกุล', value: 'fullname', class: ['blue darken-3', 'white--text']},
                // { text: 'เลขที่คำสั่ง', value: 'command_no', class: ['blue darken-3', 'white--text']},
                // { text: 'คำสั่งลงวันที่', value: 'command_date', class: ['blue darken-3', 'white--text']},
                // { text: 'เลขที่ตำแหน่ง', value: 'position_no',class: ['blue darken-3', 'white--text'] },
                // { text: 'ชื่อ-สกุล', value: 'employee_name',class: ['blue darken-3', 'white--text'] },
                // { text: 'ตำแหน่ง', value: 'position',class: ['blue darken-3', 'white--text'] },
                // { text: 'ระดับ', value: 'level',class: ['blue darken-3', 'white--text'] },
                // { text: 'ดำเนินการ', value: 'actions', sortable: false, class: ['blue darken-3', 'white--text'] },
                              
            ],
            alert: false,
            
            arr_prefix: [                
                { text: 'นาย', value: 2},
                { text: 'นางสาว', value: 4},
                { text: 'นาง', value: 5},
                { text: 'อื่น ๆ', value: 9},
            ],
            
            arr_gender: ['ชาย','หญิง'],
            prefix_list : this.$store.getters.prefix_list,
            prefix_select: null,

            prefix: null,
            gender: 1,
            name: '',
            surname: '',
            citizen_id: '',
            status: 0,

            switch1: false,
            start_date: new Date().toISOString().substr(0, 10),
            command_no : null,            
            command_date: new Date().toISOString().substr(0, 10),
            menu: false,
            start_menu: false,
            add_type: 1,
            position: null,
            position_select: null,
            position_list: this.$store.getters.empty_position,
            level: null,
            level_list: this.$store.getters.level_list,

        }
    },
    async mounted(){
        
        if (!this.prefix_list){
            console.log('get prefix');
            await this.$store.dispatch('get_prefix_list');
            this.prefix_list = await this.$store.getters.prefix_list;
        }
        if (!this.position_list){
            await this.$store.dispatch('get_empty_position');
            this.position_list = await this.$store.getters.empty_position;
        }
        if (!this.level_list){
            await this.$store.dispatch('get_level_list');
            this.level_list = await this.$store.getters.level_list;
        }
    },
    watch: {
        alert(){
            if (this.alert == true){
                setTimeout(()=>{
                    this.alert = false
                },3000);
            }
        },
        position(){
            if (this.position){
                
                this.position_select = this.position_list[this.position_list.findIndex(x=>x.no == this.position)];
                console.log('position :' + this.position_select);
            }else{
                this.position_select = null;
            }
        }
    },
    computed: {
        getThaiDate(){
            var d = new Date(this.command_date);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            //return moment(String(value)).format('LL')
        },
        getStartThaiDate(){
            var d = new Date(this.start_date);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            //return moment(String(value)).format('LL')
        },
    },
    methods: {
        async search(){
            
            if (this.filter && this.filter != ''){
                
                let path = '/api/employee';
                let response = await axios.get(path,{params:{
                    filter: this.filter
                }});
                this.result_search = await response.data.data;
                if (this.result_search.length == 0){
                    this.alert = true;
                }
                
            }
            
        },
        clearFilter(){
            this.filter = '';
            this.result_search = [];
        },
        async submit(){
            
            console.log('submit');
            let path = '/api/employee';
            try {
                let response = await axios.post(path,{
                prefix_id: this.prefix,
                name: this.name,
                surname: this.surname,
                citizen_id: this.citizen_id,
                gender: this.gender,
                status: this.switch1 ? 1 : 2,
                description: 'test'                
            })
                let employee = await response.data.data;
                if (employee){     
                        this.status = await employee.status;
                }
                if (this.switch1){
                    console.log('employee :' + employee.id);
                    console.log('type :' + this.add_type);
                    console.log('position_id :' + this.position);
                    console.log('level :' + this.level);
                    console.log('command_no :' + this.command_no);
                    console.log('command_date :' + this.command_date);
                    
                    path = await '/api/change';
                    response = await axios.post(path,{
                        "employee_id": employee.id,
                        "type": this.add_type,
                        "position_id": this.position,
                        "level_hold_id": this.level,
                        "command_no": this.command_no,
                        "command_date": this.command_date,
                        "status": 1                        
                    })
                    
                    this.change = await response.data.data;
                    if (this.change){
                        console.log('changed');
                    }
                }
            } catch (error) {
                console.log('error' + error);
            }
            
            // this.dialog = false;
            
            //this.$refs.observer.validate();
        },
        clear(){            
            this.gender = 1;
            this.prefix_select = null;
            this.prefix = null;
            this.citizen_id = '';
            this.name = '';
            this.surname = '';
            
            this.switch1 = false;
            this.command_no = null;
            this.start_date = new Date().toISOString().substr(0, 10);
            this.command_date = new Date().toISOString().substr(0, 10);
            this.level = null;
            this.position = null;
            this.position_select = null;
            // this.$refs.observer.reset();
        },
        close_modal(){
            this.clear();
            // this.$refs.observer.validate();
            this.$refs.observer.reset();
            this.dialog = false;
        },
        
        

    }
}
</script>

<style scoped>
.v-btn--tile ,.gender{
    margin-top: 10px!important;
}
.gender{
    margin-top: 18px!important;
}
.v-input--selection-controls{
    
}
.v-btn{
    font-weight: normal!important;
}
.add_type{
    margin-top: 0px!important;
}
.position{
    margin-top: 0px!important;
    padding-top: 0px!important;
}
.col{
    padding-top: 5px!important;
    padding-bottom: 5px!important;
}
.v-list-item{
    min-height: 32px!important;
}
</style>