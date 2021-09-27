<template>
<v-app style="direction: rtl">
  <Navbar/>
  <Sidebar/>
  <v-main>
    <v-container>
      <v-card v-for="r in report.reports" :key="r.id" style="background-color: white;margin:15px;direction: rtl" class="mx-auto">
        <v-list   class="list-style" three-line>
          <template>

            <v-list-item style="max-width: 1300px">
              <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%">
                <v-img :src="r.sender_img"></v-img>
              </v-list-item-avatar>

              <v-list-item-content style="text-align: right;margin: 0 20px 0 20px">

                <v-list-item-title class="font_name" style="font-weight: bolder">رقم الرسالة : {{ r.message_id }}</v-list-item-title>
                <v-list-item-subtitle class="font_age" style="font-weight: bolder">رقم البلاغ : {{ r.id }}</v-list-item-subtitle>
                <v-list-item-subtitle :id="r.id +'comment'" class="font_age" style="font-weight: bolder;display: none">التعليق : {{ r.details }}</v-list-item-subtitle>
                <v-list-item-subtitle :id="r.id +'action'" class="font_age" style="font-weight: bolder;display: none">القرار المأخوذ : في انتظار رد المشرف</v-list-item-subtitle>
                <v-list-item-subtitle :id="r.id +'data1'" class="font_age" style="font-weight: bolder;display: none">تم الانشاء في : {{r.created_at}}</v-list-item-subtitle>
                <v-list-item-subtitle :id="r.id +'data2'" class="font_age" style="font-weight: bolder;display: none">تم النحديث في : {{r.updated_at}}</v-list-item-subtitle>


              </v-list-item-content>

              <div  class="text-center">
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        style="background-color: red;font-weight: bolder;padding: 0 ;height: 25px;color: #EEEEEE;" depressed>
                      منع
                    </v-btn>
                    <font-awesome-icon
                        :id="r.id"
                        @click="change(r.id)"
                        title="رؤية اكثر"
                        style="color: #0062CC;cursor: pointer;font-size: 37px;margin-right: 15px;margin-bottom: -8px" :icon="showIcon"/>
                    <font-awesome-icon
                        @click="reverseChange(r.id)"
                        :id="r.id+'show'"
                        title="رؤية اقل"
                        style="display: none;color: #0062CC;cursor: pointer;font-size: 37px;margin-right: 15px;margin-bottom: -8px" :icon="lessIcon"/>

                    <v-icon
                        @click="takeAction(r.id,2)"
                        style="color: red;font-size: 27px;margin-right: 15px" depressed>
                      >
                      mdi-delete
                    </v-icon>


                  </template>

                  <v-card >
                    <v-card-title class="text-h5 ">
                      منع مرسل هذه الرسالة من دخول الموقع
                    </v-card-title>

                    <v-card-text>
                      هناك اختياران للمنع اختار ما تريد
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          @click="takeAction(r.id,3)" style="background-color: #FE6265"
                      >
                        منع
                      </v-btn>
                      <v-btn
                          @click="dialog = false;takeAction(r.id,4)"
                          color="primary"
                          text
                          style="margin-left: 7px"
                      >
                        منع لمدة محددة
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
      <EmptyPage :msg="this.msg" v-if="this.len" style="margin: 50px !important;"/>

    </v-container>
  </v-main>
</v-app>
</template>

<script>
import EmptyPage from '@/components/EmptyPage.vue'
import axios from "axios";
import {faCaretDown,faCaretUp} from '@fortawesome/free-solid-svg-icons'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: "AdminReports",
  components:{
    Navbar,
    Sidebar,
    EmptyPage
  },
  data() {
    return {
      msg:"لا يوجد اي بلاغات حتي الأن",
      dialog: false,
      report:[],
      len:null

    }
  },
  mounted() {
    this.reload();
  },
  methods: {
    redirect() {
      this.$router.push('/userProfile/' + this.sender_id)
    },
    takeAction(id,action){
      const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI2OTEyMjEsImV4cCI6MTYzMzEwMTYyMSwibmJmIjoxNjMyNjkxMjIxLCJqdGkiOiIxdUdzbmhhRjhaMUJ5TlV6Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.pw0pqQvQ-M-V7xM4bwkSBTOCAxPF7uIXgJhXh_NhiPQ");
      axios({
        method: 'put',
        url: "http://127.0.0.1:8000/api/admin/takeActionOnReport",
        headers: {Authorization: AuthStr},
        data: {
          report_id: id,
          action_type: action // This is the body part
        }
      });
      this.reload();
    },
    reload(){
      const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI2OTEyMjEsImV4cCI6MTYzMzEwMTYyMSwibmJmIjoxNjMyNjkxMjIxLCJqdGkiOiIxdUdzbmhhRjhaMUJ5TlV6Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.pw0pqQvQ-M-V7xM4bwkSBTOCAxPF7uIXgJhXh_NhiPQ");
      axios.get("http://127.0.0.1:8000/api/admin/getAllReports", {headers: {Authorization: AuthStr}})
          .then(response => {
            // If request is good...
            this.report = response.data
            this.error = false;
            this.len = response.data.msg;
          })
          .catch(() => {
            this.error = true;
          });
    },
    change(id){
      document.getElementById(id).style.display = 'none';
      document.getElementById(id+'show').style.display = 'inline';
      document.getElementById(id+'comment').style.display = 'inline';
      document.getElementById(id+'action').style.display = 'inline';
      document.getElementById(id+'data1').style.display = 'inline';
      document.getElementById(id+'data2').style.display = 'inline';
    },
    reverseChange(id){
      document.getElementById(id).style.display = 'inline';
      document.getElementById(id+'show').style.display = 'none';
      document.getElementById(id+'comment').style.display = 'none';
      document.getElementById(id+'action').style.display = 'none';
      document.getElementById(id+'data1').style.display = 'none';
      document.getElementById(id+'data2').style.display = 'none';
    }
  },
  computed: {
    showIcon() {
      return faCaretDown
    },
    lessIcon() {
      return faCaretUp
    },
  }
}
</script>

<style scoped>
@media screen and (max-width: 1024px) {
  .font_name{
    font-size: 24px;
  }
  .font_age{
    font-size: 20px;
  }

}

@media screen and (max-width: 950px) {
  .font_name{
    font-size: 20px;
  }
  .font_age{
    font-size: 16px;
  }

}


@media screen and (max-width: 650px) {
  .font_name{
    font-size: 18px;
  }
  .font_age{
    font-size: 13px;
  }


}

@media screen and (max-width: 480px) {
  .font_name{
    font-size: 15px;
  }
  .font_age{
    font-size: 11px;
  }

}
@media screen and (max-width: 360px) {
  .font_name{
    font-size: 11px;
  }
  .font_age{
    font-size: 8px;
  }

}
.list-style {
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  box-shadow: 0 0 20px gray;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}

.list-style:hover {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
  transition: 0.8s;
}

</style>
