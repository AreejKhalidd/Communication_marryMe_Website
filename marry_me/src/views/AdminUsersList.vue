<template>
  <div id="app">
    <v-app>     
      <v-app v-if="notoken">
                       <div class="text-center" style="margin: 50px !important;">
                          <v-alert text prominent type="error" icon="mdi-cloud-alert" style="direction: rtl" >
                            لقد انتهت مدة صلاحيتك للتصفح داخل الموقع يرجي تسجيل الدخول  مرة اخري.
                          </v-alert>
                          <v-btn depressed color="primary" @click="redirect()">
                            نسجيل الدخول
                          </v-btn>
                        </div>
      </v-app> 
      <div class="all" v-if="!notoken">
        <div class="page"> 
            <h4 class="hp" align="center"> قائمة بالمستخدمين </h4>
              <div align="right" class="listbtns">                      
                <v-row>
                <div  style="direction: rtl; align:right;text-align: right;margin-right:20%; display:inline-block;">  
                       <v-checkbox style="display:inline-block;" v-model="all" :label="` جميع المستخدمين `" ></v-checkbox> 
                        <v-checkbox style="display:inline-block;" v-model="name" :label="` البحث بالاسم `" ></v-checkbox> 
                        <input  type="text"  v-model="searchname"  placeholder="   .. ادخل الاسم" size="sm" class="in" v-if="name"/>
                        <v-checkbox style="display:inline-block;" v-model="vip" :label="` VIP `" ></v-checkbox>
                        <v-checkbox style="display:inline-block;" v-model="cert" :label="` المصرح حسابهم `"></v-checkbox>
                        <v-checkbox style="display:inline-block; " v-model="female" :label="` الاناث `"> </v-checkbox>
                        <v-checkbox style="display:inline-block; " v-model="male" :label="`الذكور  `"> </v-checkbox>
                        <span>  </span>    
                        <span>  </span> 
                        <span/><span/>
                        <v-btn class="btn2" @click="startsearch()" > عرض  </v-btn>
                        <span></span> 
                  </div>
                  </v-row>
                                  <h4 class="hp" align="center"> {{ this.title }} </h4>
              </div>
              <div id="all">
              <v-card class="card" v-for="(user, index) in users" :key="index">
                  <v-list class="list-style" three-line>
                    <template class="back">
                      <v-list-item style="max-width: 1300px">
                        <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%" >
                                  <v-img            
                                  v-if="!user.image"
                                  v-bind:src="img"
                                ></v-img> 
                                <v-img            
                                  v-else-if="user.image.includes('http')"
                                  v-bind:src="user.image"
                                ></v-img>
                                  <v-img            
                                  v-else-if="!user.image.includes('http')"
                                  v-bind:src="`http://127.0.0.1:8000${user.image}`"
                                ></v-img> 
    
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
import img from "../assets/UserDefaultAvatar.png";
export default {
    name: "AdminUserList",
    components: {
    },
  data() {
    return {   
                users:[],
                catg:"جميع المستخدمين", 
                img:img, 
                notoken:false, 
                filter:false,                
                all:false,
                searchname:'',
                name:false,
                female:false, 
                gender:false,             
                vip:false,
                free:false,
                male:false,
                cert:false,
                c:0,
                v:0,
                title:"", 
                         
        }
    },
  mounted(){              
              if(!localStorage.getItem('adminToken'))
              {
                this.notoken=true;
                return;
              }
                ///const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzMyOTUyMTksImV4cCI6MTYzMzcwNTYxOSwibmJmIjoxNjMzMjk1MjE5LCJqdGkiOiJVOFVFNWFmRUxJYTdNams5Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.L_xQAe8y2eyhVKGjjTWAdbAAb9hOMgGrPynI6BaI2Bs");///
               const token = 'Bearer '.concat(localStorage.getItem('adminToken'));
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
                  this.title="";
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
        redirect(){
          this.$router.push({ name: 'AdminLogin' })
        },      
        openfilter(){
          this.filter=!this.filter;
        },
        gotouserinfo(user,index){
          console.log(user);
          console.log(index);
            let i= user.id;
          this.$router.push({name: 'AdminUserinfo',params: { id:i }})
        },
        startsearch(){
            if(!localStorage.getItem('adminToken'))
            {
              this.notoken=true;
              return;
            }
             /// const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzMyOTUyMTksImV4cCI6MTYzMzcwNTYxOSwibmJmIjoxNjMzMjk1MjE5LCJqdGkiOiJVOFVFNWFmRUxJYTdNams5Iiwic3ViIjoxMSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.L_xQAe8y2eyhVKGjjTWAdbAAb9hOMgGrPynI6BaI2Bs");/// 
             const token = 'Bearer '.concat(localStorage.getItem('adminToken'));
             if (this.free==true && this.vip==true) this.all=true;
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
                  this.title="";
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
              else if (this.vip ==true && this.free == false && this.all == false && this.name==false&& 
                       this.cert==false&&this.male==false&&this.female==false)
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
                  this.title="";     
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
              else if (this.vip ==false && this.free == true && this.all == false && this.name==false&& 
                       this.cert==false&&this.male==false&&this.female==false){
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{VIP:0}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;   
                  this.title="";  
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
              else if (this.vip ==false && this.free == false && this.all == false && this.name==false&& 
                       this.cert==true&&this.male==false&&this.female==false){
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{cert:1}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;
                  this.title="";      
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
              else if (this.vip ==false && this.free == false && this.all == false && this.name==false&& 
                       this.cert==false&&this.male==false&&this.female==true)
             {
                axios({
                  method: 'get',
                  url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                  headers: {Authorization: token},
                  params:{gender:"Female"}
                  }).then(response => {
                  console.log("ehhh?");
                  console.log(response.data);
                  this.users=response.data.Users_info;
                  this.title="";     
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
              else if (this.vip ==false && this.free == false && this.all == false && this.name==false&& 
                       this.cert==false&&this.male==true&&this.female==false)
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
                  this.title="";
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
              else if (this.vip ==false && this.free == false && this.all == false && this.name==true && 
                       this.cert==false&&this.male==false&&this.female==false){        
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
                    this.title="";   
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
              else{
                  if(this.name == false | this.searchname=="") this.searchname ="";
                  if(this.female === false && this.male===false) this.gender ="";
                  else if(this.female === true && this.male===true) this.gender ="";
                  else if(this.female === true && this.male===false) this.gender = "Female";
                  else if(this.male === true && this.female===false) this.gender ="Male";
                  if(this.vip===false) this.v=0;
                  else this.v=1;
                  if(this.cert===false) this.c=0;
                  else this.c=1;

           console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
           console.log(this.gender);
           console.log(this.v);
                    axios({
                    method: 'get',
                    url: "http://127.0.0.1:8000/api/admin/getAllUsersByMethod",
                    headers: {Authorization: token},
                    params:{name:this.searchname,gender:this.gender,VIP:this.v,cert:this.c}
                    }).then(response => {
                    console.log("ehhh?");
                    console.log(response.data);
                    this.users=response.data.Users_info;
                    this.title="";      
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
.listbtns{   
  margin-right:8%;
  align:center;
}
.btn2{
  margin-right:5px;
  padding-top:5px; 
  padding-bottom:5px;
  variant:outline-secondary;
  color:black;
  background-color: grey;
  box-shadow: 0px 6px 0px white;
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;
  width:30px; 
  height:25px;
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
.b{
  background-color: 	#f5f5f5;
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:1px;
  width:70px;
  height:30px;
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;



}
.b:hover {
  cursor:pointer;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: 	#f5f5f5;
  color:grey;
 border-radius: 12px;
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
.shift{
  text-align:right;
  margin-right:10px;
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
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    opacity: 1;
}
.in{
    height:30px;
    width:150px;
    
    border: solid 1px rgba(255,98,101,1);
    border-radius:30px;
    background-color:	white;
    text-align:right; 
    
  direction: rtl;
  padding: 10px 40px 10px 10px;
}
.in:focus{
   border: solid 1px rgba(255,98,101,1);
   outline: none !important;
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
.age{
    height:25px;
    width:60px;
    border: solid 1px rgba(255,98,101,1);
    border-radius:10px;
    background-color:	white;
}
</style>