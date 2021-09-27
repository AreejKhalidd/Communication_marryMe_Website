<template>

  <div data-app style="direction: rtl">
    <Navbar/>
    <Sidebar/>
    <v-main>
      <v-container>
        <div id="app">

          <FriendList style="margin: 20px !important;" v-for="friend in friends" :key="friend.id" :id="friend.id"
                      :name="friend.name" :age="friend.age"
                      :user2_id="friend.user_2"
                      :img="friend.user2_image"/>
          <ErrorPage style="margin: 50px !important;" v-if="error"/>

        </div>

      </v-container>
    </v-main>

  </div>


</template>

<script>
import FriendList from '@/components/FriendList.vue'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import axios from "axios";

export default {
  name: "Friend",
  components: {
    Navbar,
    Sidebar,
    FriendList,
    ErrorPage
  },
  data() {
    return {
      friends: [],
      error: false
    }
  },
  mounted() {
    // GET request using axios with set headers
    const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
    axios.get("http://127.0.0.1:8000/api/getAllFriends", {headers: {Authorization: AuthStr}})
        .then(response => {
          // If request is good...
          this.error = false;
          console.log(response.statusText);
          this.friends = response.data
          console.log(this.friends)
        })
        .catch(() => {

          this.error = true;
        });
  },


}
</script>

<style scoped>

</style>
