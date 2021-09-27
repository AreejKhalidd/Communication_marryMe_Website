<template>

  <div data-app>
    <div id="app" style="direction: rtl">
      <Navbar/>
      <Sidebar/>

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
              <EmptyPage :msg="this.msg"  v-if="this.counter_dec===0 &&this.counter===0 &&!error&&flag_all" style=";margin: 50px !important;"/>

            </v-container>
          </v-main>
    </div>

  </div>


</template>

<script>
import RequestsList from '@/components/RequestsList.vue'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import RecRequest from '@/components/RecRequest.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import EmptyPage from '@/components/EmptyPage.vue'
import AcceptedRequests from '@/components/AcceptedRequests.vue'
import RejectedRequests from '@/components/RejectedRequests.vue'

import axios from "axios";

export default {
  name: "Request",
  components: {
    Navbar,
    Sidebar,
    RequestsList,
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
    this.callMounted();
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
      const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
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
