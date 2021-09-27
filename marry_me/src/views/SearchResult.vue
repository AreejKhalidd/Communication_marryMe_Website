<template>
  <div id="app">
    <v-app>
      <div class="all">
          <Navbar/>
          <Sidebar/>
        <div class="page"> 
            <h4 class="hp" align="center">   {{this.msgtoshow}}  </h4>
              <v-card class="card" v-for="(user, index) in users" :key="index">
                  <v-list class="list-style" three-line>
                    <template class="back">
                      <v-list-item style="max-width: 1300px">
                        <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%" v-if="!user.image">
                          <v-img v-bind:src="user.image"></v-img>
                      </v-list-item-avatar>
                        <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%" v-if="user.imageNULL ">
                          <v-img v-bind:src="img"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content class="shift">
                          <v-list-item-title class="textt">الأسم : {{ user.name }}</v-list-item-title>
                          <v-list-item-title  class="textt">العمر : {{ user.age }}</v-list-item-title >
                      </v-list-item-content>
                      <v-btn class="btn" @click="gotouserinfo(user,index)"> المزيد </v-btn>
                    </v-list-item>
                  </template>
                </v-list>
          </v-card>
        </div>
      </div>
    </v-app>
  </div>
</template>    
<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import img from "../assets/UserDefaultAvatar.png";
import axios from "axios";
 export default {
    name: "SearchResult",
    components: {
    Navbar,
    Sidebar,
   },
   props: { searchname:null,VIP:null,
            banusers:null,
            vipusers:null,
            freeusers:null,
            certusers:null,
            ageusers:null,
            age:null,
            bancount:null,
          },
   data() {
    return {   
                users:[] ,
                msgtoshow:"",
                img:img,                
        }
    },
  watch: {
        '$route.params.searchname'() {
            this.gotosearch();
        }
    },

    methods:
    {
        gotouserinfo(user,index){
          console.log(user);
          console.log(index);
            let i= user.id;
          this.$router.push({name: 'Userinfo',params: { id:i }})
        },
      gotosearch(){    
      console.log(this.users);
      console.log("hena fl search");
      if(this.searchname== ""){
        this.msgtoshow="المستخدمين المرجحين لك";
      }
      else{
        this.msgtoshow="الناتج عن بحثك"
      }
      const token = 'Bearer '.concat(localStorage.getItem('usertoken'));
          if(this.VIP==1)
          {             
              if(this.banusers == null && this.vipusers==null && this.freeusers==null && this.certusers ==null && this.ageusers==null)
              {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
              }
              else{
                if(this.banusers != null)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,ban_count:this.bancount}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });

                }
                else if (this.freeusers==true)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,vip:0}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
                }
                else if (this.vipusers==true)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,vip:1}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
                }             
                else if (this.certusers==true) 
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,certified:1}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
                }
                else if(this.ageusers!=null){
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,age:this.age}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
                }
              }
        }
        else{
                axios({
                  method: 'post',
                  url: "http://127.0.0.1:8000/api/filter",
                  headers: {Authorization: token},
                  data: {name :this.searchname}
                }).then(response => {
                console.log(response.data)
                this.users=response.data

                console.log("kkkkkkkkk")
                console.log(response.data)
                console.log(this.users)
                console.log("searchh 3laa");console.log(this.searchname); 
             
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured"
                      });
        }
      
    }
    },
    mounted(){
      
      console.log(this.users);
      console.log("hena fl search");
      if(this.searchname== ""){
        this.msgtoshow="المستخدمين المرجحين لك";
      }
      else{
        this.msgtoshow="الناتج عن بحثك"
      }
      const token = 'Bearer '.concat(localStorage.getItem('usertoken'));
          if(this.VIP==1)
          {             
              if(this.banusers == null && this.vipusers==null && this.freeusers==null && this.certusers ==null && this.ageusers==null)
              {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
              }
              else{
                if(this.banusers != null)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,ban_count:this.bancount}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });

                }
                else if (this.freeusers==true)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,vip:0}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
                }
                else if (this.vipusers==true)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,vip:1}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
                }             
                else if (this.certusers==true) 
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,certified:1}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
                }
                else if(this.ageusers!=null){
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.searchname,age:this.age}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data
                    console.log("kkkkkkkkk")
                    console.log(response.data)
                    console.log(this.users)
                    console.log("searchh 3laa");console.log(this.searchname);
                          })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                          });
                }
              }
        }
        else{
                axios({
                  method: 'post',
                  url: "http://127.0.0.1:8000/api/filter",
                  headers: {Authorization: token},
                  data: {name :this.searchname}
                }).then(response => {
                console.log(response.data)
                this.users=response.data

                console.log("kkkkkkkkk")
                console.log(response.data)
                console.log(this.users)
                console.log("searchh 3laa");console.log(this.searchname); 
             
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              return "error occoured"
                      });
        }
      
    }
    

}
</script>


<style scoped>
.all{
  background-color:white;
}
.page{

  margin-top:8px;
  background-color:white;
  
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
   direction: rtl;
  }
.back{
  background-color:white;
}
.info{
  text-align: right;margin: 0 50px 0 20px;
  background:white;
}
</style>