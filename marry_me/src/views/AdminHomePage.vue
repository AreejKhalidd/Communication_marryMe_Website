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
    
   <!-- <v-list-item>
          <v-list-item-avatar class="mt-n7">
              <v-sheet color="green" width="80" height="80" elevation="10">
                  <v-icon dark large >store</v-icon>
              </v-sheet>
          </v-list-item-avatar>
    <v-list-item-content>
        <div >reports</div>
    </v-list-item-content>
    </v-list-item>-->
        
    
 <!-- <v-card
    height="100%"
    width="100%"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>-->
       
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
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI3NjIwMTQsImV4cCI6MTYzMjc2NTYxNCwibmJmIjoxNjMyNzYyMDE0LCJqdGkiOiJZcDNlYzRybTlpYjJYcFJKIiwic3ViIjoxLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.sxoLdFDbp5HEuyFP94wKpCRfYOtGTQEPWW21Ij-WUCw");
          axios({
            method: 'get',
            url: "http://127.0.0.1:8000/api/getNumOfOnlineUsers",
            headers: {Authorization: token /*`${'Bearer'} ${localStorage.getItem('usertoken')}`*/  }
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

</style>
