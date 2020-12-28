<template>
  <h3>Edit Change</h3>
</template>

<script>
export default {
    data(){
        return {
            change_type: [
                {text: 'บรรจุ/รับโอน', value : 1},
                {text: 'เลื่อนระดับ', value : 2},
                {text: 'ย้ายเข้า', value : 3},
                {text: 'ย้ายออก', value : 4},
                {text: 'ลาออก/ให้โอน', value : 5},
                {text: 'ยกมา', value : 6},
                {text: 'ให้ไปรักษาการ', value : 7}
            ],
        }
    }
}
</script>

<style>

</style>