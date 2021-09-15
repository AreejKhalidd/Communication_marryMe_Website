<template>
  <div id="lg">
        <Navbar/>
        <Sidebar/>
      <div>
            <h5 class="headerpref"> A user from your preference list  </h5>
        <b-card
        tag="article"       
        class="cardd" 
        >
           <div v-if="user.user[0].gender != 'NULL' " >
                        <b-card-img v-bind:src="user.user[0].image" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.user[0].gender ==  'Female' " >
                        <b-card-img src="../assets/female-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.user[0].gender ==  'female' " >
                        <b-card-img src="../assets/female-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.user[0].gender ==  'Male' " >
                        <b-card-img src="../assets/male-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.user[0].gender ==  'male' " >
                        <b-card-img src="../assets/male-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
              </div>

            <b-card-text>                 
                 {{ user.user[0].name }} : الاسم
            </b-card-text>
            <b-card-text>
               {{ user.user[0].age}} : العمر
            </b-card-text>
            <b-card-text>
               {{ user.user[0].birth_day}} : تاريخ الميلاد
            </b-card-text>
            <b-card-text>
               {{ user.user[0].email}} : البريد الإلكتروني
            </b-card-text>
            <b-card-text v-if="user.user[0].online === 1">
                 المستخدم نشط الان
            </b-card-text>
            <b-card-text 
                v-if="user.user[0].VIP === 1">
                  VIP المستخدم 
            </b-card-text>
                  <button  v-if="VIP === 1 " rounded="circle" class="btns-logo" title="بدء المحادثة"  @click="startchat(user.user[0].id)"><img title="بدء المحادثة" class="btns-logo" src="../assets/chat.jpg" /></button>
                  <button  v-if="VIP === 0" rounded="circle" class="btns-logo" title="ارسال طلب المحادثة"  @click="requestchat(user.user[0].id)"><img title="ارسال طلب المحادثة" class="btns-logo" src="../assets/chat2.png" /></button>
                 <button  rounded="circle" class="btns-logo" title="اضافة الي المفضلين" @click="addtofavs(user.user[0].id)"><img title="اضافة الي المفضلين" class="btns-logo" src="../assets/fav.png" /></button>
                 <button  rounded="circle" class="btns-logo" title="حظر" @click="addtoblocks(user.user[0].id)"><img title="حظر" class="btns-logo" src="../assets/block.png" /></button>
        </b-card>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: "Userinfo",
    components: {
    Navbar,
    Sidebar,
   },
    props: { user:Object,},
  data() {
    return {
      VIP: "",
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
    margin-top:9px;
    margin-bottom:2px;
    text-align:center;
} 
</style>