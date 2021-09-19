<template>
  <div class="homepage">
    <Navbar/>
    <Sidebar/>
    <SlidingCards/>
    <PreferencesList/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import PreferencesList from '@/components/PreferencesList.vue'
import SlidingCards from '@/components/SlidingCards.vue'


 export default {
    name: "HomePage",
    components: {
    Navbar,
    Sidebar,
    PreferencesList,
    SlidingCards,
   },
}
</script>

<style scoped>
.homepage{
  background-color:white;
}
</style>