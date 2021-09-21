<template>
 <div class="page" >
     <Navbar/>
     <Sidebar/>
    <div class="mt-5 mb-2">
       <h4 class="font-italic"> مستخدم عن طريق بحثك </h4>
                      <v-divider class="mx-4"></v-divider>
            <v-container>
                <v-row>
                  <v-col>
                      <v-img
                      v-bind:src="image"
                      id="img"           
                      rounded             
                      class="my-auto mx-5"
                      max-height="200"
                      max-width="200"
                      >
                    </v-img>
                  </v-col>
                  <v-col>
                    <v-list>
                      <v-list-item >      
                           {{ name}} : الاسم              
                      </v-list-item>
                      <v-list-item >      
                           {{ age}} : العمر              
                      </v-list-item>
                      <v-list-item >      
                           {{ birth_day}} : تاريخ الميلاد              
                      </v-list-item>
                      <v-list-item >      
                           {{ email}} : البريد الإلكتروني             
                      </v-list-item>
                      <v-list-item v-if="v === 1">      
                                 VIP المستخدم            
                      </v-list-item>
                      <v-list-item v-if="online === 1">      
                                المستخدم نشط الان          
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
                <v-row>
                    <v-col>
                      <button  :icon="fav" rounded="circle" class="btns-logo" title="اضافة الي المفضلين" @click="addtofavs(user.user[0].id)" ><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="fav"/></button>
                      <button  v-if="VIP === 1 " rounded="circle" class="btns-logo" title="بدء المحادثة"  @click="startchat(user.user[0].id)"><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="startChat"/></button>
                      <button  v-if="VIP === 0" rounded="circle" class="btns-logo" title="ارسال طلب المحادثة"  @click="requestchat(user.user[0].id)"><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="startChat"/></button>
                      <button  rounded="circle" class="btns-logo" title="حظر" @click="addtoblocks(user.user[0].id)"><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="block"/></button>
                    </v-col>
                </v-row>
            </v-container>
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
             birth_day:null,
             age:null,
             online:null,
             v:null,
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
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjA1NTk0MywiZXhwIjoxNjMyMDU5NTQzLCJuYmYiOjE2MzIwNTU5NDMsImp0aSI6IjdXOFlsMzh3dnlqY1hacnYiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.z30x7p5Cm-OC7zUtSk8xNsY3TSOgJVer6ut8ASAnAbA");
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
.btns-logo{
margin-right:4px;
background-color: rgb(211,211,211);
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
  background-color:rgb(211,211,211);
  color:grey;
  border-radius: 40%;
  variant:outline-secondary;
  cursor:pointer;
  font-size:12px;
}
.page{
  background-color:white;
}
#img{
  border-radius: 50%;
  border: solid 2px #ff6265;
  max-width: 200px;
  max-height: 200px;
  background-color:white;
  margin-right:2px;
  position: absolute;
  right: 0;
}
.btns-logo{
margin-right:1px;
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
  transform: scale(1.02);
  background-color:white;
  color:grey;
  border-radius: 40%;
  variant:outline-secondary;
  cursor:pointer;
  font-size:12px;
}
</style>