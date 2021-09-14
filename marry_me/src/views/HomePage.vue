<template>
  <div id="homepage">
    <Navbar/>
    <Sidebar/>
    <PreferencesList/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import PreferencesList from '@/components/PreferencesList.vue'


 export default {
    name: "HomePage",
    components: {
    Navbar,
    Sidebar,
    PreferencesList,
   },
}
</script>

<style scoped>
</style>