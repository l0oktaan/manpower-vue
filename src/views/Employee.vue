<template>
<div>
<v-list>
    <!-- <v-list-item v-for="(item,index) in position_empty" :key="index">{{item.id}}</v-list-item> -->
    <v-list-item-content v-for="(xitem,xindex) in position_empty" :key="xindex">
        <v-list-item-title>{{xitem.id}}</v-list-item-title>
        <v-list-item-subtitle >
            <v-radio-group                
                column     
                v-model="position_empty[xindex].result"                       
                >
                <v-radio
                    :label="' [' + yitem.id + '] ' + yitem.name + ' [' + yitem.position_id + '] '"
                    :value="yitem.position_id"
                    v-for="(yitem,yindex) in get_employee(xitem.id)" :key="yindex"
                    @click="selected(xitem.id,yitem.position_id)"
                    :readonly = "find_select(yitem.position_id)"
                ></v-radio>
                
                </v-radio-group>        
        </v-list-item-subtitle>
        
    </v-list-item-content>
</v-list>
{{result}}
<p>{{position_empty}}</p>
</div>
  
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {            
            position_empty : [
                {"id" : 1, "result" : 0},
                {"id" : 2, "result" : 0},
                {"id" : 3, "result" : 0},
                // {"id" : 4, "result" : 0},
                // {"id" : 5, "result" : 0},
                // {"id" : 6, "result" : 0},
                // {"id" : 7, "result" : 0},
                // {"id" : 8, "result" : 0},
                // {"id" : 9, "result" : 0},
                // {"id" : 10, "result" : 0}
            ],
            employee : [
                {"id" : 1, "name" : "AAA", "position_id" : 22, "require" : [1,4,7,10,44]},
                {"id" : 2, "name" : "BBB", "position_id" : 33, "require" : [1,3,5,22]},
                {"id" : 3, "name" : "CCC", "position_id" : 44, "require" : [2,3,4,7,9]},
                // {"id" : 4, "name" : "DDD", "position_id" : 55, "require" : [1,2,6,22]},
                // {"id" : 5, "name" : "EEE", "position_id" : 66, "require" : [8,22,33,55]},
                // {"id" : 6, "name" : "FFF", "position_id" : 77, "require" : [6,7,8,66]}
            ],
            list: [],
            result : []
        }
    },
    methods : {
        get_employee(position_id){
            return this.employee.filter(x=>x.require.indexOf(position_id)>=0);
        },
        selected(position_id,employee_id){
            if (this.result.length > 0) {
                let exist_result = this.result.filter(x=>x.position_id == position_id).length;                
                if (exist_result > 0) {
                    this.result[this.result.findIndex(x=>x.position_id == position_id)].employee_id = employee_id;                    
                }else{
                    this.result.push(
                        {"position_id" : position_id,"employee_id" : employee_id}
                    );
                    
                }
                this.add_queue(position_id,employee_id);
            }else{
                this.result.push(
                    {"position_id" : position_id,"employee_id" : employee_id}
                );
                this.add_queue(position_id,employee_id);
            }
            

        },
        add_queue(position_id,employee_id){
            // let x_index = this.position_empty.findIndex(x=>x.id == position_id);
            // let employee = this.employee[this.employee.findIndex(x=>x.id == employee_id)];
            // Object.assign(this.position_empty[x_index],{"sub_position" : [{
            //     "id" : employee.position_id
            // }]})
            console.log('po: ' + position_id + ' em : ' + employee_id);
            let exist_position = this.position_empty.findIndex(x=>x.sub_of == position_id);
            console.log('subof index :' + exist_position);
            if (exist_position >= 0 ){
                this.position_empty.splice(exist_position,1);
            }            
            this.position_empty.push(
                {"id" : employee_id, "sub_of" : position_id}
            )
        },
        find_select(employee_id){
            let index = this.result.findIndex(x=>x.employee_id == employee_id);
            return index >= 0 ? true : false;
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