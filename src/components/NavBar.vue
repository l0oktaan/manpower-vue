<template>


    <v-navigation-drawer
        dark
        app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
    <v-list-item px-2 class="main-menu">
        <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

        <v-list-item-title>เมนูหลัก</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router :to="item.route"
          active-class="border"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


</template>

<script>
export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Dashboard', icon: 'mdi-monitor-dashboard', route: '/' },
          { title: 'ตำแหน่งว่าง', icon: 'mdi-account-clock', route: '/empty' },
          { title: 'ข้อมูลหน่วยงาน', icon: 'mdi-home-city', route: '/division' },
          { title: 'ข้อมูลตำแหน่ง', icon: 'mdi-chevron-triple-up', route: '/position' },
          { title: 'ข้อมูลข้าราชการ', icon: 'mdi-account-group', route: '/employee' },
          { title: 'เปลี่ยนแปลงข้อมูล', icon: 'fas fa-sync', route: '/change' },
        ],
        mini: false,
      }
    },
}
</script>

<style scoped>
.v-list-item__title{
    line-height: 1.5!important;
    padding-bottom: 6px;
}
.main-menu{
    min-height: 64px!important;
}
</style>