<template>
 <div id="app">
   <v-app id="content">
        <Navbar/>
        <Sidebar/>   
      <div class=" mr-2 align-left">  
                          <h4 class="font-italic mt-3"> بيانات المستخدم</h4>
                          <v-divider  dark></v-divider>
          <div class="list" >
              <v-content fluid id="content">
                <v-container fluid  id="container">
                        <v-layout row left wrap justify-space-around>
                         
                    <v-row >
                      <v-col >                                                  
                          <v-img
                          :src="useravatar"
                          id="img"           
                          rounded             
                          class="my-auto mx-5"
                          max-height="200"
                          max-width="200"
                          >
                        </v-img>
                      </v-col>
                      <v-col wrap align="start">
                        <v-list >
                          <v-list-item >      
                                الاسم    : {{ Name}}           
                          </v-list-item >
                          <v-list-item   >      
                                رقم التليفون : {{ PhoneNumber }}              
                          </v-list-item >
                          <v-list-item   >      
                                تاريخ الميلاد  : {{ BirthDay }}             
                          </v-list-item  >
                          <v-list-item    >      
                                البريد:  {{ Email }}        
                          </v-list-item >
                          <v-list-item  >      
                                النوع  :    {{ Gender }}        
                          </v-list-item >
                          <v-list-item  >      
                                عدد مرات الابلاغ  :  {{ NumberOfReports }}          
                          </v-list-item >
                          <v-list-item  >      
                                عدد مرات الحظر     :  {{ NumberOfBans }}        
                          </v-list-item >
                          <v-list-item  v-if="vip === 1" >      
                                      المستخدم VIP         
                          </v-list-item >
                          <v-list-item  v-if="Certified === 1" >      
                                <v-icon v-if="Certified" color="#FF6265">mdi-check-circle </v-icon>   المستخدم مصرح حسابه           
                          </v-list-item >                                         
                        </v-list>                                         
                      </v-col> 
                      </v-row>

                      <v-row>                        
                        <v-col>
                        <div class="b">
                        <button  v-if="vip === 1 " rounded="circle" class="btns-logo" title="بدء المحادثة"  @click="startchat(user.user[0].id)"><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="startChat"/></button>
                        <button  v-if="vip === 0" rounded="circle" class="btns-logo" title="ارسال طلب المحادثة"  @click="requestchat(user.user[0].id)"><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="startChat"/></button>
                        <button  :icon="fav" rounded="circle" class="btns-logo" title="اضافة الي المفضلين" @click="addtofavs(user.user[0].id)" ><font-awesome-icon style="color: #FE6265;font-size: 50px;margin-left: 4px" :icon="fav"/></button>                                      
                        </div>
                      </v-col>
                      
                      </v-row>
                   </v-layout>  
                </v-container>
              </v-content>
            </div>
          </div>      
      </v-app> 
 </div>
</template>

<script>
import axios from "axios";
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import img from "../assets/UserDefaultAvatar.png";
import {faHeart,faComment,faBan} from '@fortawesome/free-solid-svg-icons'
export default {
    name: "Userinfo",
    components: {
    Navbar,
    Sidebar,
   },
  data() {
    return {
      avatarurl: null,
      userId:this.$route.params.id,
      url: img,
      file: '',
      ID: null,
      Name: "",
      Email: "",
      PhoneNumber: "",
      BirthDay: "",
      Gender: "",
      NumberOfReports: "",
      NumberOfBans: "",
      Certified: "",
      vip: "",
      CurrentlyBanned: "",
      currentID: '',
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
    useravatar() {
      if (this.avatarurl) return this.avatarurl;
      return this.url;
    },
    
    }, 
    methods:{
            
        previewImage() {
          this.url = URL.createObjectURL(this.file);
          this.useravatar();
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
    mounted(){
        const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjQzNjU3MiwiZXhwIjoxNjMyODQ2OTcyLCJuYmYiOjE2MzI0MzY1NzIsImp0aSI6IlB2WmhDeXVCMlhZRWVza3AiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.1Rhg6gS9mNSkKqVt-H4IzVknLRJaYpw0O5zgA0NMV7g");
        axios({
          method: 'post',
          url: "http://127.0.0.1:8000/api/getUser",
          headers: {Authorization: AuthStr},
          data: {id :this.userId}
        }).then((response) => {
              this.ID = response.data.id;
              this.Name = response.data.name;
              this.Email = response.data.email;
              this.PhoneNumber = response.data.phone;
              this.BirthDay = response.data.birth_day;
              this.Gender = response.data.gender;
              this.avatarurl = response.data.image;
              this.NumberOfReports = response.data.reports;
              this.NumberOfBans = response.data.ban_count;
              this.Certified = response.data.certified;
              this.vip = response.data.VIP;
            }).catch((error) => {
          console.log(error.response.statusText)
        });
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
  background-color: #ffffff;
  flex-direction: column;
}
.d{
  
  
  
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
.list{
 
  direction: rtl; 
 margin-left:45% ;
 
  

}
.page{
    
}
.b{
 margin-right:65% ;
  
}

</style>