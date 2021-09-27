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
              dark
              prominent
              style="background-color: #FE6265;height: 70px"
          >
            <v-app-bar-nav-icon style="margin-top: 5px" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title style="width: 1200px;flex: auto;margin-bottom: 65px">قائمة طلبات الصداقة</v-toolbar-title>

            <v-spacer></v-spacer>

          </v-app-bar>

          <v-navigation-drawer
              v-model="drawer"
              absolute
              bottom
              right
              style="min-width: 15%;min-height: 100%;max-width: 40%;width: 200px  "
              temporary

          >
            <v-list
                class="linkStyle"
                dense
                nav
            >
              <v-list-item-group
                  v-model="group"
                  active-class="deep-purple--text text--accent-4"
              >
                <AnotherSideBar/>

              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
          <v-main>
            <v-container>
              <v-tabs style="min-width: 200px!important;"  v-if="!error">
                <v-tab @click="all=true;sent=true;req=true;accept=false;reject=false;callMounted();flag_all=true">كل الطلبات</v-tab>
                <v-tab  @click="all=true;sent=true;req=false;accept=false;reject=false;callMounted();flag_all=true;">المرسلة</v-tab>
                <v-tab  @click="all=true;sent=false;req=true;accept=false;reject=false;callMounted();flag_all=true">المرسلة لي</v-tab>
                <v-tab  @click="sent=false;req=false;accept=true;reject=false;callMounted();flag_all=false">الطلبات المقبولة</v-tab>
                <v-tab  @click="sent=false;req=false;accept=false;reject=true;callMounted();flag_all=false"> الطلبات المرفوضة</v-tab>

              </v-tabs>
              <div v-if="!error">
                <br>
                <br>

              </div>
              <div v-if="all && sent">

                <h1 id="head" v-if="!error &&this.counter!==0" class="subheader">الطلبات الذي ارسلتها</h1>
                <RequestsList v-for="request in requests.requests_sent" :id="request.id" :key="request.id"
                              :age="request.age"
                              :req_id="request.req_id"
                              :status="request.status"
                              :img="request.image" :name="request.name"
                              :mess="this.message"
                              :count="decCount"/>
              </div>
              <div  v-if="all && req">
                <h1 v-if="!error && this.counter_dec!==0" class="subheader" style="margin-top: 50px">الطلبات الذي ارسلت
                  إليك</h1>

                <RecRequest v-for="request in requests.requests_received" :id="request.id"
                            :sender_id="request.sender_id"
                            :status="request.status"
                            :key="request.id"
                            :age="request.age"
                            :img="request.image" :name="request.name"
                            :count="reqCount"/>
              </div>
              <div  v-if=" accept">

                <AcceptedRequests v-for="request in requests.requests_received" :id="request.id"
                            :sender_id="request.sender_id"
                            :status="request.status"
                            :key="request.id"
                            :age="request.age"
                            :img="request.image" :name="request.name"
                            :count="reqCount"/>
              </div>
              <div  v-if="reject">

                <RejectedRequests v-for="request in requests.requests_received" :id="request.id"
                            :sender_id="request.sender_id"
                            :status="request.status"
                            :key="request.id"
                            :age="request.age"
                            :img="request.image" :name="request.name"
                            :count="reqCount"/>
              </div>
              <ErrorPage v-if="error" style="margin: 50px !important;"/>
              <EmptyPage :msg="this.msg"  v-if="this.counter_dec===0 &&this.counter===0 &&!error&&flag_all" style="margin: 50px !important;"/>

            </v-container>
          </v-main>

        </v-card>

      </v-app>
    </div>

  </div>


</template>

<script>
import RequestsList from '@/components/RequestsList.vue'
import RecRequest from '@/components/RecRequest.vue'
import AnotherSideBar from '@/components/AnotherSideBar.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import EmptyPage from '@/components/EmptyPage.vue'
import AcceptedRequests from '@/components/AcceptedRequests.vue'
import RejectedRequests from '@/components/RejectedRequests.vue'

import axios from "axios";

export default {
  name: "Request",
  components: {

    RequestsList,
    AnotherSideBar,
    ErrorPage,
    RecRequest,
    EmptyPage,
    AcceptedRequests,
    RejectedRequests
  },
  data() {
    return {
      all:true,
      sent:true,
      req:true,
      accept:false,
      reject:false,
      requests: [],
      drawer: false,
      group: null,
      error: false,
      flag_all:true,
      counter: 0,
      msg:" لا يوجد اي طلبات حاليا لعرضها",
      counter_dec: 0
    }
  },
  mounted() {
    // GET request using axios with set headers
    const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTYzMjcwMzYwMSwiZXhwIjoxNjMzMTE0MDAxLCJuYmYiOjE2MzI3MDM2MDEsImp0aSI6IjdlZE1FaVBtTTlGVjhtU2kiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.twkp8_gwKH7_qi_6HOz5hQ32DFylrkkID0bJEQYuWQU");
    axios.get("http://127.0.0.1:8000/api/getAllRequests", {headers: {Authorization: AuthStr}})
        .then(response => {
          // If request is good...
          this.requests = response.data
          this.error = false;
          let filteredItem =
              this.requests.requests_received.filter(item => (item.status !== 1 && item.status !== 2));

          this.counter_dec = filteredItem.length;
          this.counter = this.requests.requests_sent.length;
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
  methods:{
    decCount(){
  //    if(this.counter!==0){
        this.counter--;
    //  }
    },
    reqCount(){
   //   if(this.counter_dec!==0){
        this.counter_dec--;
   //   }
    },
    callMounted(){
      const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTYzMjcwMzYwMSwiZXhwIjoxNjMzMTE0MDAxLCJuYmYiOjE2MzI3MDM2MDEsImp0aSI6IjdlZE1FaVBtTTlGVjhtU2kiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.twkp8_gwKH7_qi_6HOz5hQ32DFylrkkID0bJEQYuWQU");
      axios.get("http://127.0.0.1:8000/api/getAllRequests", {headers: {Authorization: AuthStr}})
          .then(response => {
            // If request is good...
            this.requests = response.data
            this.error = false;
            let filteredItem =
                this.requests.requests_received.filter(item => (item.status !== 1 && item.status !== 2));

            this.counter_dec = filteredItem.length;
            this.counter = this.requests.requests_sent.length;
          })
          .catch(() => {
            this.error = true;
          });

    }
  }


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

.subheader {
  text-align: center;
  font-size: 40px;
  margin: 30px;
  color: #FE6265 !important;

}

</style>
