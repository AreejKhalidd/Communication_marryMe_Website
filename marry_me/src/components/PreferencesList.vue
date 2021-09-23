<template>
  <div  align="center" >
         <h4 class="hp" align="center" style="color: rgba(255,98,101,1);">   
                                       قائمة التفضيلات الخاصة بك   </h4>
        <v-card
          :loading="loading"         
          max-width="300"
          v-for="(user, index) in users" :key="index"
          class="card"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            v-if="user.user[0].image != NULL "
            height="250"
            v-bind:src="user.user[0].image"
          ></v-img>

          <v-img
            v-if="user.user[0].image == NULL "
            height="250"
            v-bind:src="img"
          ></v-img>

            <div>{{ user.user[0].name}} : الاسم</div>
            <div>{{ user.user[0].age}} : العمر</div>

          <v-divider class="mx-4"></v-divider>
                 
          <v-card-actions>
                      <v-btn  :icon="fav"  rounded="circle" class="btns-logo" title="اضافة الي المفضلين" @click="addtofavs(user.user[0].id)" ><font-awesome-icon style="color: #FE6265;font-size: 30px;margin-left: 1px" :icon="fav"/></v-btn>
                      <v-btn :icon="startChat"  v-if="VIP === 1" rounded="circle" class="btns-logo" title="بدء المحادثة"  @click="startchat(user.user[0].id)"><font-awesome-icon style="color: #FE6265;font-size: 30px;margin-left: 1px" :icon="startChat"/></v-btn>
                      <v-btn  :icon="startChat" v-if="VIP === 0" rounded="circle" class="btns-logo" title="ارسال طلب المحادثة"  @click="requestchat(user.user[0].id)"><font-awesome-icon style="color: #FE6265;font-size: 30px;margin-left: 1px" :icon="startChat"/></v-btn>
                      <v-btn  :icon="block" rounded="circle"  class="btns-logo" title="حظر" @click="addtoblocks(user.user[0].id)"><font-awesome-icon style="color: #FE6265;font-size: 30px;margin-left: 1px" :icon="block"/></v-btn>
                      <v-btn color="deep-purple lighten-2" class="btn" text @click="gotouserinfo(user)"> المزيد </v-btn>
          </v-card-actions>
        </v-card>
  </div>
</template>


<script>
import axios from "axios";
import img from "../assets/UserDefaultAvatar.png";
import {faHeart,faComment,faBan} from '@fortawesome/free-solid-svg-icons'
export default{
       props:{
        
      },
  data(){
            return{
                users:  [                   
                ],
                VIP: "",
                img:img,  
                      loading: false,
                     selection: 1,
              }
  },
  computed: {
    fav() {
      return faHeart
    },
    startChat(){
      return faComment
    },
    block(){
      return faBan
    },
    
  },

  mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjMxNTQzMywiZXhwIjoxNjMyNTQ1ODMzLCJuYmYiOjE2MzIzMTU0MzMsImp0aSI6IkpVUE5RZnNoT2o0UlpnUWIiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.fsDGY9hDNTSO0XdJyEvUmDMMvUYJzaINBWZw7ugyd_U");
          axios({
                    method: 'get',
                    url: "http://127.0.0.1:8000/api/preference",
                    headers: {Authorization: token}
                    }).then(response => {
                    this.users=response.data;
                    console.log(this.users)
                })
                    .catch((error) => {
                    console.log('There is error:'+error);
                    return "error occoured"
                });

          axios({
            method: 'get',
            url: "http://127.0.0.1:8000/api/profile",
            headers: {Authorization: token}
          }).then(response => {
          console.log(response.data)
          this.VIP=response.data.VIP;
                })
                        .catch((error) => {
                        console.log('There is error:'+error);
                        return "error occoured"
          });
    },
  
    methods:
    {
        gotouserinfo(user){
          console.log(user.id);
          console.log("hiiiiiiii");
          this.$router
          .push({
                    name: 'Userinfo',
                    params: { user:user }
                    })
        },
        reserve () {
         this.loading = true
         setTimeout(() => (this.loading = false), 2000)
        },
        addtofavs(id){
                  const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjA1NDI1NCwiZXhwIjoxNjMyMDU3ODU0LCJuYmYiOjE2MzIwNTQyNTQsImp0aSI6IkU3clprRDdEZUFTSlBySEkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.p1gTZzDW3i4VaVlJESMSF38O6yIEGaPOuPmVb5ZduCI");
                  axios({
                  method: 'post',
                  url: "http://127.0.0.1:8000/api/addFriend",
                  headers: {Authorization: token},
                  data: {recevier_id :id}
                  }).then(response => {
                  console.log(response.data)
                  alert(response.data.message);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              alert("error:You added this user before,"+ error.message);
                              return "error occoured"
                      });
        },
        addtoblocks(id){
                  const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYzOTA5MywiZXhwIjoxNjMxNjQyNjkzLCJuYmYiOjE2MzE2MzkwOTMsImp0aSI6InNMSG1PSzNIU0NaalRwZ28iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FcH-n38bSClAmgwTTA5kNL2W7Rbxm1LsWvY78TaYvQg");
                  axios({
                  method: 'post',
                  url: "http://127.0.0.1:8000/api/blockFriend",
                  headers: {Authorization: token},
                  data: {reciever_id :id}
                  }).then(response => {
                  console.log(response.data)
                  alert(response.data.message);
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              alert("you can not block this user"+error)
                              return "error occoured"
                      });
        },
        startchat(id){
                  const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjA1NDI1NCwiZXhwIjoxNjMyMDU3ODU0LCJuYmYiOjE2MzIwNTQyNTQsImp0aSI6IkU3clprRDdEZUFTSlBySEkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.p1gTZzDW3i4VaVlJESMSF38O6yIEGaPOuPmVb5ZduCI");
                  axios({
                  method: 'post',
                  url: "http://127.0.0.1:8000/api/startchat",
                  headers: {Authorization: token},
                  data: {userid2 :id}
                  }).then(response => {
                  console.log(response.data.user)
                  alert("Done start chatting");
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              alert(error)
                              return "error occoured"
                      });
        },
        requestchat(id){
                  const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYzOTA5MywiZXhwIjoxNjMxNjQyNjkzLCJuYmYiOjE2MzE2MzkwOTMsImp0aSI6InNMSG1PSzNIU0NaalRwZ28iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FcH-n38bSClAmgwTTA5kNL2W7Rbxm1LsWvY78TaYvQg");
                  axios({
                  method: 'post',
                  url: "http://127.0.0.1:8000/api/request",
                  headers: {Authorization: token},
                  data: {recevier :id}
                  }).then(response => {
                  console.log(response.data)
                  alert("Done sending request to chat");
                      })
                              .catch((error) => {
                              console.log('There is error:'+error);
                              alert("You Make this request before!"+error)
                              return "error occoured"
                      });
          }          
  },
}
</script> 


<style scoped>
.card{
  display:inline-block;
    background-color: white;
    
    box-shadow: 0px 6px 0px white;
    border: solid 2px rgba(255,98,101,1);
    border-radius:30px;

    margin-right:5px;
    margin-left:5px;
    margin-top:3px;
    margin-bottom:5px;
}
.card:hover{
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.01);
  transform: scale(1.1);
  border-radius:15px;
}
.btns-logo{
margin-right:1px;
background-color: white;
variant:outline-secondary;
color:black;
border-radius: 40%;
border: 0;
height: 40px;
width: 40px;
}
.btns-logo:hover{
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.05);
  transform: scale(1.02);
  background-color:white;
  color:grey;
  border-radius: 40%;
  variant:outline-secondary;
  cursor:pointer;
  font-size:12px;
}
.btn{
 margin-left:auto;
 variant:outline-secondary;
 color:black;
  background-color: white;
  box-shadow: 0px 6px 0px white;
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;
}
.hp{
  margin-top:10px;
}
</style>