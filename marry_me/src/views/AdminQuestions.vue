<template>
    <v-app>
        <AdminNavbar/>
        <AdminSidebar/>
        <UpdateQuestions/>
    </v-app>
</template>

<script>
// import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import UpdateQuestions from '@/components/UpdateQuestions.vue'

export default {
  
  components: {
    AdminNavbar,
    AdminSidebar,
    UpdateQuestions
  },
}
</script>