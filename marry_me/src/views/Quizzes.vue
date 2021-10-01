<template>
  <div data-app>
    <div id="app">
      <v-app id="inspire" style="direction: rtl">
           <v-card
              
          >
          <v-img
                  style="margin-left: 0px"
                  src="@/assets/marry_me.jpeg"
                  alt="MarryMe Logo"
                  position="left left"
                  height="90"
                  width="120"
                ></v-img>
          <h1
                    style="
                      text-align: center;
                      margin-bottom: 2rem;
                      color: tomato;
                      margin-right: 1rem;
                    "
                  >
                    اسئلة التسجيل
           </h1>
          </v-card>
          <Questions />
          <ErrorPage style="margin: 50px !important;" v-if="error"/>
      </v-app>
    </div>


  </div>


</template>

<script>
import ErrorPage from '@/components/ErrorPage.vue'
import Questions from '@/components/Questions.vue'


export default {
  name: "Block",
  components: {
    ErrorPage,
    Questions
  },
  data() {
    return {
      blocks: [],
      drawer: false,
      group: null,
      error: false,
    }
  },
//   mounted() {
//     // GET request using axios with set headers
//     const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYyOTU0NCwiZXhwIjoxNjMxNjMzMTQ0LCJuYmYiOjE2MzE2Mjk1NDQsImp0aSI6Ik0xZExvR3YxUDZhN2hlRGkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.mwG7VR2G0jziHZb8YX1oYHidOw7hh9w7GfP-s-wGtwk");
//     axios.get("http://127.0.0.1:8000/api/getAllBlocks", {headers: {Authorization: AuthStr}})
//         .then(response => {
//           // If request is good...
//           this.error = true;
//           this.blocks = response.data;
//         })
//         .catch((error) => {
//           if (error.response.status === 403) {
//             this.error = true;
//           }
//         });
//   },

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