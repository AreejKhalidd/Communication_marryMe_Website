<template>
  <div id="homepage">
    <Navbar/>
    <Sidebar/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'


 export default {
    name: "HomePage",
    components: {
    Navbar,
    Sidebar,
   },
}
</script>

<style scoped>
</style>