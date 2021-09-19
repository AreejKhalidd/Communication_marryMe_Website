<template>
  <div class="homepage">
    <Navbar/>
    <Sidebar/>
    <div v-if="VIP === 0">
    <SlidingCards/>
    </div>
    <PreferencesList/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import PreferencesList from '@/components/PreferencesList.vue'
import SlidingCards from '@/components/SlidingCards.vue'
import axios from "axios";

 export default {
    name: "HomePage",
    components: {
    Navbar,
    Sidebar,
    PreferencesList,
    SlidingCards,
   },
      data() {
    return {
      VIP: "",
    }
  },
     mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjAyNzk4MiwiZXhwIjoxNjMyMDMxNTgyLCJuYmYiOjE2MzIwMjc5ODIsImp0aSI6ImRlZjBNeGJmRktJeUdHNHEiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.XeOzByPLFX7xxLF9ABLPaTqAMSttrp0fE06AaWSG6hs");
          axios({
            method: 'get',
            url: "http://127.0.0.1:8000/api/profile",
            headers: {Authorization: token}
          }).then(response => {
          console.log(response.data)
          this.VIP=response.data.VIP;
                })
                        .catch((error) => {
                        console.log('There is error:'+error);
                        return "error occoured"
                });
  },
}
</script>

<style scoped>
.homepage{
  background-color:white;
}
</style>