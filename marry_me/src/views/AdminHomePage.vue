<template>
  <v-app>
   <v-main id="content">
     <AdminNavbar/> 
      <AdminSidebar/>
      <v-row>

          <div>

      <v-card  class="carddd">
        <v-card-text>
          <div> عدد التقارير </div>
          <div class="numbers">
              {{this.number}} <br>
          </div>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>

      <v-card  class="carddd">
        <v-card-text>
          <div style=""> عدد المحادثات </div>
          <div class="numbers">
              {{this.number}} <br>
          </div>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
 <br>
      <v-card  class="carddd">
        <v-card-text>
          <div>عدد المستخدمين المحظورين</div>
          <div class="numbers">
             {{this.number}}<br>
          </div>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>

      <v-card  class="carddd">
        <v-card-text>
          <div>عدد المستخدمين المتصليت</div>
          <div class="numbers">
            30<br>
          </div>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
<br>
      <v-card  class="carddd">
        <v-card-text>
          <div>Number of online users</div>
          <div class="numbers">
            30<br>
          </div>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>

      <v-card  class="carddd">
        <v-card-text>
          <div>Number of online users</div>
          <div class="numbers">
            30<br>
          </div>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>

</div>

<div>

             <v-card
    style="margin-right:2rem;background-color:LightBlue;"
    color="green"
    dark
    max-width="600"
  >
    <v-card-text
    style="
    margin-top: -22rem;
    margin-left: 21rem;
    margin-right: 0rem;
    background-color: LightBlue;
">
      <v-sheet color="LightBlue">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            ${{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text
      style="
 
    background-color: LightBlue;
">
      <div class="text-h4 font-weight-thin">
        Sales Last 24h
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn
        block
        text
      >
        Go to Report
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
     </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
export default {
   components: {
    AdminNavbar,
    AdminSidebar,
   },
  data() {
        return {

               value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
         number: null,
      }
    
   
  },

      mounted(){
          //const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI3NjIwMTQsImV4cCI6MTYzMjc2NTYxNCwibmJmIjoxNjMyNzYyMDE0LCJqdGkiOiJZcDNlYzRybTlpYjJYcFJKIiwic3ViIjoxLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.sxoLdFDbp5HEuyFP94wKpCRfYOtGTQEPWW21Ij-WUCw");
          axios({
            method: 'get',
            url: "http://127.0.0.1:8000/api/getNumOfOnlineUsers",
            headers: {Authorization:`${'Bearer'} ${localStorage.getItem('adminToken')}`  }
          }).then(response => {
          console.log(response.data)
          this.number=response.data.body;
                })
                        .catch((error) => {
                        console.log('There is error:'+error);
                        this.error = true;
                        return "error occoured"
                });
  },
  methods: {
   

  } 

};
</script>

<style lang="scss">

.carddd{
  display:inline-block;
  width:200px;
  height:100px;
  margin-top:10px;
  margin-bottom:10px;
  margin-left:10px;
}
.numbers{
   margin-top:10px;
   font-weight:bold;
   font-family: 'Arial';
   font-size: 2rem;
}
div.carddd.v-card.v-sheet.theme--light{
    margin-left: -39rem;
    margin-right: 12rem;
}
div.mx-auto.text-center.v-card.v-sheet.theme--dark.green{
    margin-top: -19rem;
}

</style>
