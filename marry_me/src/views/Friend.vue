<template>
  <div data-app>
    <v-toolbar  style="background-color: #FE6265;color: black;direction: rtl">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title style="">قائمة المعجب بهم</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <FriendList  v-for="friend in friends" :key="friend.id" :id="friend.id" :name="friend.name" :age="friend.age" :img="friend.user2_image"/>
  </div>


</template>

<script>
import FriendList from '@/components/FriendList.vue'
import axios from "axios";

export default {
  name: "Friend",
  components: {
    FriendList
  },
  data()  {
    return{
      friends: []
    }
  },
  mounted() {
    // GET request using axios with set headers
    const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTU2MDkxMCwiZXhwIjoxNjMxNTY0NTEwLCJuYmYiOjE2MzE1NjA5MTAsImp0aSI6ImYwRzM0bGZYRkFoRkVtY3UiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.IcGP4TX6W7to8hd0PEODTpqilW5lRPH9bpUAkH5OES0");
    axios.get("http://127.0.0.1:8000/api/getAllFriends", {headers: {Authorization: AuthStr}})
        .then(response => {
          // If request is good...
          console.log(response.statusText);
          this.friends = response.data
          console.log(this.friends)
        })
        .catch((error) => {
          console.log('error ' + error);
          return "There is not any data"
        });
  }

}
</script>

<style scoped>

</style>