<template>
  <div id="app">
    <v-app>
      <div class="all">
        <div class="page"> 
            <h4 class="hp" align="center"> {{ this.title }} </h4>
                     <div align="right" class="mr-5">                                          
                        <b-dropdown  :text="catg" class="dp"  variant="white">
                          <b-dropdown-item-button @click="allcatg()">جميع المستخدمين </b-dropdown-item-button>
                          <b-dropdown-item-button @click="namecatg()">المستخدمين بالاسم</b-dropdown-item-button>
                          <b-dropdown-item-button @click="vipcatg()"> المستخدمين  VIP</b-dropdown-item-button>
                          <b-dropdown-item-button @click="freecatg()">المستخدمين المجانيين</b-dropdown-item-button>
                          <b-dropdown-item-button @click="femalecatg()">المستخدمين الاناث</b-dropdown-item-button>
                          <b-dropdown-item-button @click="malecatg()">المستخدمين الذكور</b-dropdown-item-button>
                          <b-dropdown-item-button @click="certcatg()">المستخدمين  المصدق حسابهم</b-dropdown-item-button>
                          <b-dropdown-item-button @click="onlinecatg()">المستخدمين المتاحين الان</b-dropdown-item-button>
                        </b-dropdown>  
                         <span>  </span> 
                        <input v-if="name"  type="text"  v-model="searchname"  placeholder="   .. البحث بالاسم" size="sm" class="in" @enter="gosearchbyname()" />
                        <span>  </span> 
                        <v-btn style="{width:30px; height:30px;}" class="btn" @click="startsearch()">عرض </v-btn>
                    <span></span> 
                     </div>
              <div id="all">
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
    components: {
   },
  data() {
    return {   
                users:[],
                catg:"جميع المستخدمين", 
                title:"قائمة بجميع المستخدمين ",
                all:true,
                vip:false, 
                free:false, 
                name:false, 
                searchname:null,
                online:false,
                cert:false,
                age:false,
                female:false,
                male:false,           
        }
    },
  mounted(){
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzMyMTgxMjEsImV4cCI6MTYzMzYyODUyMSwibmJmIjoxNjMzMjE4MTIxLCJqdGkiOiJKU3Q5MWV6MmF6T1Jya2k1Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.GdVUWDKV2HdvkH1LI0iQeCwb-fJ6jKQo9pdIVR4rjKY");
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
                  this.title = "قائمة بجميع المستخدمين ";   
                    if(response.data.All_Users_info.length===0)
                       this.title="لا يوجد مستخدمين"; 
                  this.catg="جميع المستخدمين";
                      })
                              .catch(() => {
                              console.log('There is error:');
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
        startsearch(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzMyMTgxMjEsImV4cCI6MTYzMzYyODUyMSwibmJmIjoxNjMzMjE4MTIxLCJqdGkiOiJKU3Q5MWV6MmF6T1Jya2k1Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.GdVUWDKV2HdvkH1LI0iQeCwb-fJ6jKQo9pdIVR4rjKY");
              if(this.all)
              {
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
                  this.title = "قائمة بجميع المستخدمين ";   
                    if(response.data.All_Users_info.length===0)
                       this.title="لا يوجد مستخدمين"; 
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
              }
              else if (this.vip)
              {  
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{VIP:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.title= " قائمة المستخدمين   VIP ";    
                    if(response.data.Users_info.length===0)
                       this.title="لا يوجد مستخدمين"; 
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
              }
              else if (this.free){
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{free:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.title= "قائمة المستخدمين المجانيين ";    
                    if(response.data.Users_info.length===0)
                       this.title="لا يوجد مستخدمين"; 
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
              }
              else if (this.online){
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{online:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.title= "قائمة المستخدمين المتاحين الان ";   
                    if(response.data.length===0)
                       this.title="لا يوجد مستخدمين"; 
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
              }
              else if (this.cert){
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{cert:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.title= "قائمة المستخدمين  المصدق حسابهم ";    
                    if(response.data.Users_info.length===0)
                       this.title="لا يوجد مستخدمين";
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
              }
              else if (this.female){
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{gender:"Female"}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.title= "قائمة المستخدمين الاناث    ";    
                    if(response.data.Users_info.length===0)
                       this.title="لا يوجد مستخدمين";
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
              }
              else if (this.male)
              {
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{gender:"Male"}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;  
                  this.title= "قائمة المستخدمين الذكور    ";    
                    if(response.data.Users_info.length===0)
                       this.title="لا يوجد مستخدمين";
                  console.log("data hena");
                  console.log(this.users);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured";
                              
                      });
              }
              else if (this.name){        
                console.log("searchhh byy");
                console.log(this.searchname);  
                  if(!this.searchname)
                  {
                        this.title= "قم بادخال الاسم للبحث عنه...";
                        return;
                  }
                  axios({
                    method: 'get',
                    url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                    headers: {Authorization: token},
                    params:{name:this.searchname}
                    }).then(response => {
                    console.log("ehhh?");
                    console.log(response.data);
                    this.users=response.data.Users_info;  
                    this.title= "قائمة المستخدمين بالاسم الذي ادخلته    ";    
                    if(response.data.Users_info.length===0)
                       this.title="لا يوجد مستخدمين";
                    console.log("data hena");
                    console.log(this.users);
                        })
                                .catch((error) => {
                                console.log('There is error:'+error);
                                return "error occoured";
                                
                        });
              }
        },
        allcatg(){          
                            this.catg="جميع المستخدمين";
                            this.all=true;
                            this.vip=false;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.female=false;
                            this.male=false;
                            this.email=false;
                            this.online=false;
                            this.cert=false;
        },
        vipcatg(){
                            this.catg="المستخدمين VIP"; 
                            this.all=false;   
                            this.vip=true;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.female=false;
                            this.male=false;
                            this.email=false;
                            this.online=false;
                            this.cert=false;
        },
        freecatg(){
                            this.catg="المستخدمين المجانيين";
                            this.all=false;   
                            this.vip=false;
                            this.free=true;
                            this.age=false;
                            this.name=false;
                            this.female=false;
                            this.male=false;
                            this.email=false;
                            this.online=false;
                            this.cert=false;
        },
        onlinecatg(){
                            this.catg="المستخدمين المتاحين الان";
                            this.all=false;   
                            this.vip=false;
                            this.free=false;
                            this.female=false;
                            this.male=false;
                            this.name=false;
                            this.gender=false;
                            this.email=false;
                            this.online=true;
                            this.cert=false;
        },
        certcatg(){
                            this.catg="المستخدمين  المصدق حسابهم";
                            this.cert=true;
                            this.all=false;   
                            this.vip=false;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.female=false;
                            this.male=false;
                            this.email=false;
        },
        femalecatg(){
                            this.catg="المستخدمين الاناث";
                            this.cert=false;
                            this.all=false;   
                            this.vip=false;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.female=true;
                            this.male=false;
                            this.email=false;
        },
        malecatg(){ 
                            this.catg=" المستخدمين الذكور";
                            this.cert=false;
                            this.all=false;   
                            this.vip=false;
                            this.free=false;
                            this.age=false;
                            this.name=false;
                            this.female=false;
                            this.male=true;
                            this.email=false;
        },
        namecatg(){
              this.catg=" المستخدمين بالاسم";
              this.cert=false;
              this.all=false;   
              this.vip=false;
              this.free=false;
              this.age=false;
              this.name=true;
              this.female=false;
              this.male=false;
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
}
.in{
    height:30px;
    width:150px;
    border-radius:15px;
    padding-radius:15px;
    margin-bottom:4px;
    margin-top:1px;
    border: solid 1px rgba(255,98,101,1);
    border-radius:30px;
    background-color:	#f5f5f5;
    text-align:center;
    align-text:left;
}
.btn{
    border-radius:15px;
    padding-radius:15px;
    margin-bottom:4px;
    margin-top:1px;
    marigin-right:5px;
    marigin-left:5px;
    background-color: 	#f5f5f5;
    border: solid 1px rgba(255,98,101,1);
}
.btn:hover {
  cursor:pointer;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: 	#f5f5f5;
  color:grey;
  border-radius: 12px;
}
</style>