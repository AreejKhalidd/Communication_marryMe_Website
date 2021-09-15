<template>
  <div data-app>
    <div id="app">
      <v-app id="inspire" style="direction: rtl">
        <v-card
            class=" overflow-hidden"
            height="100%"
            width="100%"
        >
          <v-app-bar
              style="background-color: #FE6265;height: 70px;"
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
              right
              style="min-width: 15%;min-height: 100%;max-width: 40%;width: 200px ;direction: rtl;"

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
                <AnotherSideBar/>

              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
          <FollowersList style="margin: 20px !important;" v-for="follower in followers" :key="follower.id"
                         :id="follower.id" :name="follower.name" :age="follower.age" :img="follower.user2_image"/>
          <ErrorPage style="margin: 50px !important;" v-if="error"/>
        </v-card>
      </v-app>
    </div>


  </div>


</template>

<script>
import FollowersList from '@/components/FollowersList.vue'
import AnotherSideBar from '@/components/AnotherSideBar.vue'
import ErrorPage from '@/components/ErrorPage.vue'

import axios from "axios";

export default {
  name: "LikedMe",
  components: {
    FollowersList,
    AnotherSideBar,
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
    const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYyOTU0NCwiZXhwIjoxNjMxNjMzMTQ0LCJuYmYiOjE2MzE2Mjk1NDQsImp0aSI6Ik0xZExvR3YxUDZhN2hlRGkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.mwG7VR2G0jziHZb8YX1oYHidOw7hh9w7GfP-s-wGtwk");
    axios.get("http://127.0.0.1:8000/api/showAllLiked", {headers: {Authorization: AuthStr}})
        .then(response => {
          // If request is good...
          this.error = true;
          this.followers = response.data
        })
        .catch((error) => {
          if (error.response.status === 403) {
            this.error = true;
          }
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