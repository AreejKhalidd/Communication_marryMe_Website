<template>
  <v-app>
   <v-main id="content">
     <AdminNavbar/> 
      <AdminSidebar/>
      <v-row>
    
   <!-- <v-list-item>
          <v-list-item-avatar class="mt-n7">
              <v-sheet color="green" width="80" height="80" elevation="10">
                  <v-icon dark large >store</v-icon>
              </v-sheet>
          </v-list-item-avatar>
    <v-list-item-content>
        <div >reports</div>
    </v-list-item-content>
    </v-list-item>-->
        
    
 <!-- <v-card
    height="100%"
    width="100%"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
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
  </v-card>-->












         
          
         

          
        
              
        
            
                
        
       
     </v-row>
    </v-main>
  </v-app>
</template>

<script>
//import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
export default {
   components: {
    AdminNavbar,
    AdminSidebar,
   },
  data() {
        return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    
   
  },
  methods: {
   

  } 

};
</script>

<style lang="scss">




</style>
