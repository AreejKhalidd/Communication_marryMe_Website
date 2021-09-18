<template>
  <div id="lg">
        <Navbar/>
        <Sidebar/>
     <div class="usercard" align="center">      
         <v-card outlined shaped style="max-width: 50rem; max-height: 150rem;" class="cardd">
              <h5 class="headerpref">    مستخدم عن طريق بحثك </h5>
            <v-list-item three-line align="center">
                <v-list-item-content align="center">
                     <v-row align="center">                      
                            <div v-if="image != NULL " align="center" >
                              <v-img v-bind:src="image" align="center" style="max-width: 30rem; max-height: 40rem;"  alt="User's image" >
                              </v-img>
                            </div>  
                            <div v-if="image != '' "  >
                                <v-img src="image"  align="center" style="max-width: 30rem; max-height: 40rem;"  alt="User's image" >
                                </v-img>
                           </div> 
                            <div v-if="image == '' "  >
                                <v-img src="../assets/UserDefaultAvatar.png" align="center" style="max-width: 30rem; max-height: 40rem;" alt="User's image" >
                                </v-img>
                           </div> 
                           <div v-if="image == NULL "  >
                                <img :src="img" align="center" style="max-width: 30rem; max-height: 40rem;"   alt="User's image" >
                                
                           </div> 
  
                    </v-row>
                    <div class="ms-auto">
                       {{ name}} : الاسم
                    </div>
                    <div>
                      {{ age}} : العمر
                    </div>
                    <div>
                        {{ birth_day}} : تاريخ الميلاد
                    </div>
                    <div>
                        
                        {{ email}} : البريد الإلكتروني
                    </div>
                    <div v-if="online === 1">
                          المستخدم نشط الان
                    </div>
                    <div v-if="VIP === 1">
                          VIP المستخدم 
                    </div>
                 </v-list-item-content>
            </v-list-item>
                <v-card-actions>
                  <v-row align="center" justify="center">
                    <v-col>
                      <button  v-if="VIP === 1 " rounded="circle" class="btns-logo" title="بدء المحادثة"  @click="startchat(id)"><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="startChat"/></button>
                      <button  v-if="VIP === 0" rounded="circle" class="btns-logo" title="ارسال طلب المحادثة"  @click="requestchat(id)"><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="startChat"/></button>
                      <button  :icon="fav" rounded="circle" class="btns-logo" title="اضافة الي المفضلين" @click="addtofavs(id)" ><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="fav"/></button>
                      <button  rounded="circle" class="btns-logo" title="حظر" @click="addtoblocks(id)"><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="block"/></button>
                    </v-col>
                  </v-row>
            </v-card-actions>
         </v-card>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import {faHeart,faComment,faBan} from '@fortawesome/free-solid-svg-icons'
import img from "../assets/UserDefaultAvatar.png";
export default {
    name: "Userinfoforsearch",
    components: {
    Navbar,
    Sidebar,
   },
    props: {
             name:null,
             id:null,
             email:null,
             image:null, 
             gender:null,
             age:null,
           },
  data() {
    return {
      VIP: "",
      img:img,
    }
  },  
    methods:{
        addtofavs(id){
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYzOTA5MywiZXhwIjoxNjMxNjQyNjkzLCJuYmYiOjE2MzE2MzkwOTMsImp0aSI6InNMSG1PSzNIU0NaalRwZ28iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FcH-n38bSClAmgwTTA5kNL2W7Rbxm1LsWvY78TaYvQg");
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
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYzOTA5MywiZXhwIjoxNjMxNjQyNjkzLCJuYmYiOjE2MzE2MzkwOTMsImp0aSI6InNMSG1PSzNIU0NaalRwZ28iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FcH-n38bSClAmgwTTA5kNL2W7Rbxm1LsWvY78TaYvQg");
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
    mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYzOTA5MywiZXhwIjoxNjMxNjQyNjkzLCJuYmYiOjE2MzE2MzkwOTMsImp0aSI6InNMSG1PSzNIU0NaalRwZ28iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FcH-n38bSClAmgwTTA5kNL2W7Rbxm1LsWvY78TaYvQg");
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
  }
  , 
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
}
</script>
<style scoped>
.btns{
  background-color: rgba(255,98,101,1);
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:1px;
  width:90px;
  height:30px;
}
.btns:hover {
  cursor:pointer;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color:rgba(255,98,101,1);
  color:grey;
  border-radius: 12px;
}
.cardd{
    margin-right:50px;
    margin-left:400px;
    margin-top:7px;
    margin-bottom:5px;
    background-color: white;
    bg-variant:dark;
     text-variant:grey;
      width:40%;
    padding-radius:9px;
    border-radius:15px;
}
.btns-prf{
width:80px;
height:30px;
    margin-right:2px;
    margin-left:1px;
    margin-top:1px;
    margin-bottom:1px;
background-color: rgba(255,98,101,1);
color:black;
font-size:12px;
}
.btns-prf:hover {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color:rgba(255,98,101,1);
  color:grey;
  border-radius: 12px;
  variant:outline-secondary;
  cursor:pointer;
font-size:12px;
}
.btns-pref{
width:100px;
height:30px;
background-color: rgba(255,98,101,1);
color:black;
font-size:12px;
    margin-right:2px;
    margin-left:1px;
    margin-top:1px;
    margin-bottom:1px;
}
.btns-pref:hover {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color:rgba(255,98,101,1);
  color:grey;
  border-radius: 12px;
  variant:outline-secondary;
  cursor:pointer;
font-size:12px;
}
.btns-logo{
margin-right:4px;
background-color: white;
variant:outline-secondary;
color:black;
border-radius: 40%;
border: 0;
height: 60px;
width: 60px;
}
.btns-logo:hover{
box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
  background-color:white;
  color:grey;
  border-radius: 40%;
  variant:outline-secondary;
  cursor:pointer;
  font-size:12px;
}
.headerpref{
  margin-top:7px;
  margin-bottom:3px;
}
.usercard{
  margin-top:42px;
  text-align:center;
}
</style>