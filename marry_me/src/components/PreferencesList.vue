<template>
   <div id="pref" >
        <div>
        <h4 class="headerpref"> Your Preferences List </h4>
        <b-card
        tag="article"
        style="max-width: 20rem;"  
        class="cardd" 
           v-for="(user, index) in users" 
           :key="index"
        @click="gotouserinfo(user)"
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
                <b-button href="#" variant="primary" class="btns-prf" @click="gotouserinfo(user)">المزيد</b-button>
        </b-card>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default{
       props:{
        
      },
      data(){
            return{
                users:  [
                    {
                                "id": 2,
                                "name": "mahmoud ahmed",
                                "email": "schowalter.jannie@example.net",
                                "email_verified_at": "2021-09-01T17:05:53.000000Z",
                                "phone": "814-367-6631",
                                "birth_day": "1979-06-02",
                                "age": 50,
                                "gender": "male",
                                "image": "https://via.placeholder.com/640x480.png/007744?text=rerum",
                                "reports": 62294,
                                "answered": null,
                                "ban": 0,
                                "ban_count": 94,
                                "certified": 0,
                                "VIP": 0,
                                "created_at": "2021-09-01T06:55:48.000000Z",
                                "updated_at": "1992-12-08T17:01:40.000000Z",
                                "mac_address": "grIi2lS4eQ",
                                "id_number": "d49cf2e9-8577-3ca6-963b-4611ccfe7790",
                                "online": 1
                                },
                                {
                                "id": 4,
                                "name": "mohamed",
                                "email": "schowalter.jannie@example.net",
                                "email_verified_at": "2021-09-01T17:05:53.000000Z",
                                "phone": "814-367-6631",
                                "birth_day": "1979-06-02",
                                "age": 40,
                                "gender": "Male",
                                "image": "NULL",
                                "reports": 62294,
                                "answered": null,
                                "ban": 0,
                                "ban_count": 94,
                                "certified": 0,
                                "VIP": 1,
                                "created_at": "2021-09-01T06:55:48.000000Z",
                                "updated_at": "1992-12-08T17:01:40.000000Z",
                                "mac_address": "grIi2lS4eQ",
                                "id_number": "d49cf2e9-8577-3ca6-963b-4611ccfe7790",
                                "online": 0
                                },
                ]  
            }
      },
    
      
     mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTU4NzMxMCwiZXhwIjoxNjMxNTkwOTEwLCJuYmYiOjE2MzE1ODczMTAsImp0aSI6ImFXTjIyT1VEeXdVcmVuN0oiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ULudIxmbQ77G2W886OQBosk6AfRRKK0U8jlzXPkbiqM");
          axios({
                    method: 'get',
                    url: "http://127.0.0.1:8000/api/preference",
                    headers: {Authorization: token}
                    }).then(response => {
                    console.log(response.data)
                    this.users=response.data;
                })
                    .catch((error) => {
                    console.log('There is error:'+error);
                    return "error occoured"
                });
       } ,
  
    methods:
    {
        addtofav(user){
          console.log(user.id);
          this.$router.push('/userinfo');
        },
        gotouserinfo(user){
          console.log(user.id);
          this.$router
          .push({
                    name: 'Userinfo',
                    params: { user:user }
                    })
        }
    }
}
</script> 


<style scoped>
.cardd{
    display:inline-block;
    margin-right:5px;
    margin-left:5px;
    margin-top:5px;
    margin-bottom:5px;
    background-color: white;
    bg-variant:dark;
     text-variant:grey;
     width:30%;
    padding-radius:9px;
}
.btns-prf{
width:80px;
height:30px;
  background-color: rgba(255,98,101,1);
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:1px;
    margin-right:2px;
    margin-left:1px;
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
.btns-logo:hover{
      box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
  background-color:rgba(255,98,101,1);
  color:grey;
  border-radius: 12px;
  variant:outline-secondary;
  cursor:pointer;
font-size:12px;
}
.headerpref{
    margin-top:6px;
    margin-bottom:5px;
}
</style>