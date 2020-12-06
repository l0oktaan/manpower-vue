<template>
  <v-app>
    
    <nav-bar></nav-bar>   

    <tool-bar></tool-bar>
    

    <!-- Sizes your content based upon application components -->
    <v-main app>

      <!-- Provides the application the proper gutter -->
      <v-container fluid >
        
        <!-- If using vue-router -->
        
        <router-view></router-view>
        
      </v-container>
    </v-main>

    <my-footer></my-footer>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ToolBar from '@/components/ToolBar.vue'
import MyFooter from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    ToolBar,
    MyFooter,
    
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>

.space-top{
  height: 50px;
}
.change-font{
  font-family: "Sarabun",Helvetica, sans-serif;
}
</style>