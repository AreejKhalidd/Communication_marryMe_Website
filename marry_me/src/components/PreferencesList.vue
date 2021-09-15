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
                    <div v-if="user.user[0].image != 'NULL' " >
                        <b-card-img v-bind:src="user.user[0].image" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.user[0].gender ==  'Female' " >
                        <b-card-img src="female-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.user[0].gender ==  'female' " >
                        <b-card-img src="female-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.user[0].gender ==  'Male' " >
                        <b-card-img src="male-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                    <div v-else-if="user.user[0].gender ==  'male' " >
                        <b-card-img src="male-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                        </b-card-img>
                    </div>
                
        
            <b-card-text>                 
                 {{ user.user[0].name}} : الاسم
            </b-card-text>
            <b-card-text>
               {{ user.user[0].age}} : العمر
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
                    
                ]  
            }
      },
    
      
     mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTY2ODIyNiwiZXhwIjoxNjMxNjcxODI2LCJuYmYiOjE2MzE2NjgyMjYsImp0aSI6IlBvZWp1OTBOVnRIcmlmdUUiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.g8vRJFmg9jrUbecJsL4Pe404CqnWQMC8dtAFwJT1DMs");
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
        border-radius:15px;
}
.cardd:hover{
       box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  border-radius:15px;
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