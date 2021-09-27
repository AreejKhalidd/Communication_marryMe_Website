<template>
  <div data-app style="direction: rtl">
    <Navbar/>
    <Sidebar/>

    <v-main>
      <v-container>
        <div id="app">
          <BlockList style="margin: 20px !important;" v-for="block in blocks" :key="block.id" :id="block.id"
                     :name="block.name" :age="block.age"
                     :blocked_id="block.blocked_id"
                     :img="block.blocked_image"/>
          <ErrorPage style="margin: 50px !important;" v-if="error"/>
        </div>

      </v-container>
    </v-main>

  </div>


</template>

<script>
import BlockList from '@/components/BlockList.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import axios from "axios";


export default {
  name: "Block",
  components: {
    Navbar,
    Sidebar,
    BlockList,
    ErrorPage
  },
  data() {
    return {
      blocks: [],
      drawer: false,
      group: null,
      error: false,
    }
  },
  mounted() {
    // GET request using axios with set headers
    const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
    axios.get("http://127.0.0.1:8000/api/getAllBlocks", {headers: {Authorization: AuthStr}})
        .then(response => {
          // If request is good...
          this.error = false;
          this.blocks = response.data;
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
