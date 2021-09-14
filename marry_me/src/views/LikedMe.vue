<template>
  <div data-app>
    <div id="app">
      <v-app id="inspire">
        <v-card
            class=" overflow-hidden"
            height="100%"
            width="100%"
        >
          <v-app-bar
              style="background-color: #FE6265;height: 70px"
              dark
              prominent
          >
            <v-app-bar-nav-icon style="margin-top: 5px" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title style="width: 1200px;flex: auto;margin-bottom: 65px">قائمة المعجبين بي</v-toolbar-title>

            <v-spacer></v-spacer>

          </v-app-bar>

          <v-navigation-drawer
              v-model="drawer"
              absolute
              bottom
              temporary
              style="min-width: 15%;min-height: 100%;max-width: 40%;width: 200px  "

          >
            <v-list
                nav
                dense
                class="linkStyle"
            >
              <v-list-item-group
                  v-model="group"
                  active-class="deep-purple--text text--accent-4"
              >
                <AnotherSideBar />

              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
          <FollowersList style="margin: 20px !important;"   v-for="follower in followers" :key="follower.id" :id="follower.id" :name="follower.name" :age="follower.age" :img="follower.user2_image"/>
        </v-card>
      </v-app>
    </div>


  </div>


</template>

<script>
import FollowersList from '@/components/FollowersList.vue'
import AnotherSideBar from '@/components/AnotherSideBar.vue'
import axios from "axios";

export default {
  name: "LikedMe",
  components: {
    FollowersList,
    AnotherSideBar
  },
  data()  {
    return{
      followers: [],
      drawer: false,
      group: null,
    }
  },
  mounted() {
    // GET request using axios with set headers
    const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTU3NDE2NiwiZXhwIjoxNjMxNTc3NzY2LCJuYmYiOjE2MzE1NzQxNjYsImp0aSI6InV6WTA0dVl2T1FXWmg0d08iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ulOKxKZl9pqI9RyF7yNP_xq2fXWT4MOfljQoj-PtUZQ");
    axios.get("http://127.0.0.1:8000/api/showAllLiked", {headers: {Authorization: AuthStr}})
        .then(response => {
          // If request is good...
          console.log(response.request);
          this.followers = response.data
        })
        .catch((error) => {
          console.log('error ' + error);
          return "There is not any data"
        });
  },
  watch: {
    group () {
      this.drawer = false
    },
  },

}
</script>

<style scoped>
.linkStyle{
  background:rgba(0, 0, 0, 0.75) !important;
  padding:10px 0 20px 0;
  border:1px solid #111;
  width: 100%;
  height: 100%;
  box-shadow:0 4px 5px rgba(0, 0, 0, 0.75);
}




</style>