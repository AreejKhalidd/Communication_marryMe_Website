<template>
  <div id="lg">
        <Navbar/>
        <Sidebar/>
      <div>
            <h5 class="headerpref"> A user from your preference list </h5>
        <b-card
        tag="article"       
        class="cardd" 
        >
                    <div v-if="user.image != 'NULL' " >
                        <b-card-img v-bind:src="user.image" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.gender ==  'Female' " >
                        <b-card-img src="female-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.gender ==  'female' " >
                        <b-card-img src="female-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.gender ==  'Male' " >
                        <b-card-img src="male-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.gender ==  'male' " >
                        <b-card-img src="male-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>

            <b-card-text>                 
                 {{ user.name}} : الاسم
            </b-card-text>
            <b-card-text>
               {{ user.age}} : العمر
            </b-card-text>
            <b-card-text>
               {{ user.birth_day}} : تاريخ الميلاد
            </b-card-text>
            <b-card-text>
               {{ user.email}} : البريد الإلكتروني
            </b-card-text>
            <b-card-text v-if="user.online === 1">
                 المستخدم نشط الان
            </b-card-text>
            <b-card-text 
                v-if="user.VIP === 1">
                  VIP المستخدم 
            </b-card-text>
                  <button  rounded="circle" class="btns-logo" title="بدء المحادثة"  @click="startchat(this.user.id)"><img title="بدء المحادثة" class="btns-logo" src="chat.jpg" /></button>
                 <button  rounded="circle" class="btns-logo" title="اضافة الي المفضلين" @click="addtofavs(this.user.id)"><img title="اضافة الي المفضلين" class="btns-logo" src="fav.png" /></button>
                 <button  rounded="circle" class="btns-logo" title="حظر" @click="addtoblocks(this.user.id)"><img title="حظر" class="btns-logo" src="block.png" /></button>
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
            
        }
    },   
    methods:{
        addtofavs(){
                      const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTU4NzMxMCwiZXhwIjoxNjMxNTkwOTEwLCJuYmYiOjE2MzE1ODczMTAsImp0aSI6ImFXTjIyT1VEeXdVcmVuN0oiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ULudIxmbQ77G2W886OQBosk6AfRRKK0U8jlzXPkbiqM");
                axios({
                method: 'post',
                url: "http://127.0.0.1:8000/api/addFriend",
                headers: {Authorization: token}
                }).then(response => {
                console.log(response.data)
                alert("تم اضافة الي قائمة المفضلين");
                    })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                    });
            },
        addtoblocks(){
                const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTU4NzMxMCwiZXhwIjoxNjMxNTkwOTEwLCJuYmYiOjE2MzE1ODczMTAsImp0aSI6ImFXTjIyT1VEeXdVcmVuN0oiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ULudIxmbQ77G2W886OQBosk6AfRRKK0U8jlzXPkbiqM");
                axios({
                method: 'post',
                url: "http://127.0.0.1:8000/api/blockFriend",
                headers: {Authorization: token}
                }).then(response => {
                console.log(response.data)
                alert("  تم حظر هذا المستخدم");
                    })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                    });
        },
        startchat(){
            this.$router.push('/');
        }          
    }
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
background-color: rgba(255,98,101,1);
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
  background-color:rgba(255,98,101,1);
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