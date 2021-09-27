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
    const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTYzMjc2MjMzMywiZXhwIjoxNjMzMTcyNzMzLCJuYmYiOjE2MzI3NjIzMzMsImp0aSI6InhCQk43Z1Vtb2I1ZGo5N2ciLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y6UWyQ7h7EJyxUKjTTGopLCVy0wGZ6cxBcDWBNsjIc8");
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
.linkStyle {
  background: rgba(0, 0, 0, 0.75) !important;
  padding: 10px 0 20px 0;
  border: 1px solid #111;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.75);
}

</style>
