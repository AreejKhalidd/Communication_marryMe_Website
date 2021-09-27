<template>
  <div id="app">
    <v-app>
      <div class="all">
        <div class="page"> 
            <h4 class="hp" align="center"> {{ filtered }} </h4>
                     <div>                         
                        اظهار للمستخدمين من خلال                
                        <b-dropdown  :text="catg" class="dp" align="right" variant="white">
                          <b-dropdown-item-button @click="allcatg()">جميع المستخدمين </b-dropdown-item-button>
                          <b-dropdown-item-button @click="vipcatg()">VIP </b-dropdown-item-button>
                          <b-dropdown-item-button @click="freecatg()">Free</b-dropdown-item-button>
                          <b-dropdown-item-button @click="namecatg()">name</b-dropdown-item-button>
                          <b-dropdown-item-button @click="emailcatg()" >email</b-dropdown-item-button>
                          <b-dropdown-item-button @click="femalecatg()">Female</b-dropdown-item-button>
                          <b-dropdown-item-button @click="agecatg()"> date of creation  </b-dropdown-item-button>
                          <b-dropdown-item-button @click="certcatg()">certified</b-dropdown-item-button>
                          <b-dropdown-item-button @click="onlinecatg()">online</b-dropdown-item-button>
                        </b-dropdown>  
                     </div>
              <div v-id="all">
              <v-card class="card" v-for="(user, index) in users" :key="index">
                  <v-list class="list-style" three-line>
                    <template class="back">
                      <v-list-item style="max-width: 1300px">
                        <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%">
                          <v-img v-bind:src="user.image"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content class="shift">
                          <v-list-item-title class="textt">الأسم : {{ user.name }}</v-list-item-title>
                          <v-list-item-title  class="textt">النوع : {{ user.gender }}</v-list-item-title >
                          <v-list-item-title  class="textt">العمر : {{ user.age }}</v-list-item-title >       
                      </v-list-item-content>
                      <v-btn class="btn" @click="gotouserinfo(user,index)"> المزيد </v-btn>
                    </v-list-item>
                  </template>
                </v-list>
          </v-card>
          </div>
        </div>
      </div>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
    name: "AdminUserList",
  data() {
    return {   
                users:[],
                catg:"جميع المستخدمين", 
                filtered:"قائمة بجميع المستخدمين ",
                all:true,
                vip:false, 
                free:false, 
                name:false, 
                email:false, 
                online:false,
                cert:false,
                age:false,
                gender:false,
                bd:false, 
                datacreation:false,             
        }
    },
  mounted(){
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI2ODYyNzMsImV4cCI6MTYzMzA5NjY3MywibmJmIjoxNjMyNjg2MjczLCJqdGkiOiJzYkZiY21iQWdndHc3Z0FoIiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.u4xxYspuXhYGwRoFe4uFob5V72eTPggVL42A3gnR5LQ");
                console.log("ehhh?");
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersInfo",
                  headers: {Authorization: token},
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  /// All_Users_info///
                  this.users=response.data.All_Users_info;  
                  console.log("data hena");
                  console.log(this.users);
                  this.filtered = "list of all users ";
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
    },
    methods:
    {
        gotouserinfo(user,index){
          console.log(user);
          console.log(index);
            let i= user.id;
          this.$router.push({name: 'AdminUserinfo',params: { id:i }})
        },
        allcatg(){          
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI2ODYyNzMsImV4cCI6MTYzMzA5NjY3MywibmJmIjoxNjMyNjg2MjczLCJqdGkiOiJzYkZiY21iQWdndHc3Z0FoIiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.u4xxYspuXhYGwRoFe4uFob5V72eTPggVL42A3gnR5LQ");
                console.log("ehhh?");
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersInfo",
                  headers: {Authorization: token},
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  /// All_Users_info///
                  this.users=response.data.All_Users_info;  
                  this.filtered = "قائمة بجميع المستخدمين ";
                  this.catg="جميع المستخدمين";
                            this.all=true;
                            this.vip=false;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.gender=false;
                            this.email=false;
                            this.datacreation=false
                            this.online=false;
                            this.bd=false; 
                            this.cert=false,
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
        },
        vipcatg(){       
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI2ODYyNzMsImV4cCI6MTYzMzA5NjY3MywibmJmIjoxNjMyNjg2MjczLCJqdGkiOiJzYkZiY21iQWdndHc3Z0FoIiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.u4xxYspuXhYGwRoFe4uFob5V72eTPggVL42A3gnR5LQ");
                console.log("ehhh?");
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{VIP:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.filtered= "list of vip users ";
                            this.catg="vip user";
                            this.all=false;   
                            this.vip=true;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.gender=false;
                            this.email=false;
                            this.online=false;
                            this.datacreation=false;
                            this.cert=false,
                            this.bd=false;  
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
        },
        freecatg(){
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI2ODYyNzMsImV4cCI6MTYzMzA5NjY3MywibmJmIjoxNjMyNjg2MjczLCJqdGkiOiJzYkZiY21iQWdndHc3Z0FoIiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.u4xxYspuXhYGwRoFe4uFob5V72eTPggVL42A3gnR5LQ");
                console.log("ehhh?");
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{free:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.filtered= "list of free users ";
                            this.catg="free user";
                            this.all=false;   
                            this.vip=false;
                            this.free=true;
                            this.age=false;
                            this.name=false;
                            this.gender=false;
                            this.email=false;
                            this.online=false;
                            this.datacreation=false;
                            this.cert=false,
                            this.bd=false;  
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
        },
        onlinecatg(){
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI2ODYyNzMsImV4cCI6MTYzMzA5NjY3MywibmJmIjoxNjMyNjg2MjczLCJqdGkiOiJzYkZiY21iQWdndHc3Z0FoIiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.u4xxYspuXhYGwRoFe4uFob5V72eTPggVL42A3gnR5LQ");
                console.log("ehhh?");
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{online:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.filtered= "list of online users ";
                            this.catg="online user";
                            this.all=false;   
                            this.vip=false;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.gender=false;
                            this.email=false;
                            this.online=true;
                            this.datacreation=false;
                            this.bd=false;  
                            this.cert=false,
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
        },
        certcatg(){
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI2ODYyNzMsImV4cCI6MTYzMzA5NjY3MywibmJmIjoxNjMyNjg2MjczLCJqdGkiOiJzYkZiY21iQWdndHc3Z0FoIiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.u4xxYspuXhYGwRoFe4uFob5V72eTPggVL42A3gnR5LQ");
                console.log("ehhh?");
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{cert:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.filtered= "list of certifed users ";
                            this.catg="certifed user";
                            this.cert=true,
                            this.all=false;   
                            this.vip=false;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.gender=false;
                            this.email=false;
                            this.datacreation=false;
                            this.bd=false;  
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
        },
    }
}
</script>

<style scoped>
.page{
  margin-top:8px;
  background-color:white; 
  direction: rtl;
}
.card{
    box-shadow:5px 5px 5px rgba(255,98,101,1);
    background-color: white;
    margin:15px;  
}
.btn{
 margin-left:auto;
 variant:outline-secondary;
 color:black;
  background-color: grey;
  box-shadow: 0px 6px 0px white;
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;
  width:90px;
}
.textt{
  font-weight: bolder;
  font-size: 20px;
  background:white;
  margin-left:60%;
  }
.back{
  background-color:white;
}
.info{
  text-align: right;margin: 0 50px 0 20px;
  background:white;
}
.dp{
    height:30px;
    width:140x;
    border-radius:15px;
    padding-radius:15px;
    margin-bottom:4px;
    margin-top:1px;
    marigin-right:5px;
    marigin-left:5px;
    background-color: 	#f5f5f5;
    border: solid 1px rgba(255,98,101,1);
    border-radius:30px;
}
</style>