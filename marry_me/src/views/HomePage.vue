<template>
  <div >
    <Navbar v-if="error==false" />
    <Sidebar v-if="error==false" />
      <v-app v-if="error==true">
            <ErrorPage style="margin: 50px !important;" v-if="error"/>
      </v-app>
    <div v-if="VIP === 0">
    <SlidingCards v-if="error==false"/>
    </div>
    <PreferencesList v-if="error==false"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import PreferencesList from '@/components/PreferencesList.vue'
import SlidingCards from '@/components/SlidingCards.vue'
import axios from "axios";
import ErrorPage from '@/components/ErrorPage.vue'
 export default {
    name: "HomePage",
    components: {
    Navbar,
    Sidebar,
    PreferencesList,
    SlidingCards,
    ErrorPage,
   },
      data() {
        return {
          VIP: "",
          error: false,
        }
  },
     methods:{
           redirect(){
             this.$router.push({ name: 'Login' })
           }
     },
     mounted(){
          const token = 'Bearer '.concat("yJ0eiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI2MTk2NCwiZXhwIjoxNjMyMjY1NTY0LCJuYmYiOjE2MzIyNjE5NjQsImp0aSI6ImluZHFuTmNXSkJZc1FPTlUiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.wgI5qATfQHZbAw-pmuqVAxylssPHVIdBG8AKFurNzbA");
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
                        this.error = true;
                        return "error occoured"
                });
  },
}
</script>

<style scoped>

</style>