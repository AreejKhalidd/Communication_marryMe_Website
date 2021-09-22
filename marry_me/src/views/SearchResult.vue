<template>
 <div class="all">
     <Navbar/>
     <Sidebar/>
    <div class="page"> 
       <h4 class="hp" align="center">   {{this.msgtoshow}}  </h4>
          <v-card class="card" v-for="(user, index) in users" :key="index">
              <v-list class="list-style" three-line>
                <template>
                  <v-list-item style="max-width: 1300px">
                    <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%">
                      <v-img v-bind:src="user.image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="info">
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
   props: { users:[] ,searchname:null,VIP:null,
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
            let e=user.email;
            let n=user.name;
            let a=user.age;
            let im=user.image;
            let gen=user.gender;
            let i= user.id;
            let on =user.online;
            let v=user.VIP;
            let bd=user.birth_day;
          this.$router.push({name: 'Userinfoforsearch',params: { id:i,email:e,name:n,age:a,image:im,gender:gen,online:on ,v:v, birth_day:bd  }})
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
      const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjMyNTUzNSwiZXhwIjoxNjMyNTU1OTM1LCJuYmYiOjE2MzIzMjU1MzUsImp0aSI6IjFSYWFmVkg3VjFlaVhVeWQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.s0QUP4lb1lodpC12acuv_F2Pajm_qqi_21wDyjuGxTQ");                  
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
      const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjMyNTUzNSwiZXhwIjoxNjMyNTU1OTM1LCJuYmYiOjE2MzIzMjU1MzUsImp0aSI6IjFSYWFmVkg3VjFlaVhVeWQiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.s0QUP4lb1lodpC12acuv_F2Pajm_qqi_21wDyjuGxTQ");                  
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
    direction: rtl;
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
  font-size: 20px
}
.info{
  text-align: right;margin: 0 50px 0 20px
}
</style>