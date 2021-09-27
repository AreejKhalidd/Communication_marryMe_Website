<template>
  <div data-app style="direction: rtl">
    <Navbar/>
    <Sidebar/>
    <v-main>
      <v-container>
        <div id="app">


          <FollowersList style="margin: 20px !important;" v-for="follower in followers" :key="follower.id"
                         :id="follower.id" :name="follower.name"
                         :user1_id="follower.user_1"
                         :age="follower.age" :img="follower.user2_image"/>
          <ErrorPage style="margin: 50px !important;" v-if="error"/>

        </div>

      </v-container>
    </v-main>

  </div>


</template>

<script>
import FollowersList from '@/components/FollowersList.vue'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ErrorPage from '@/components/ErrorPage.vue'

import axios from "axios";

export default {
  name: "LikedMe",
  components: {
    FollowersList,
    Navbar,
    Sidebar,
    ErrorPage
  },
  data() {
    return {
      followers: [],
      drawer: false,
      group: null,
      error: false,
    }
  },
  mounted() {
    // GET request using axios with set headers
    const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
    axios.get("http://127.0.0.1:8000/api/showAllLiked", {headers: {Authorization: AuthStr}})
        .then(response => {
          // If request is good...
          this.error = false;
          this.followers = response.data
        })
        .catch(() => {
          this.error = true;
        });
  },
  watch: {
    group() {
      this.drawer = false
    },
  },

}
</script>

<style scoped>
.linkStyle {
  background: rgba(0, 0, 0, 0.75) !important;
  padding: 10px 0 20px 0;
  border: 1px solid #111;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.75);
}


</style>
