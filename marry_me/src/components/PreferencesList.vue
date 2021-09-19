<template>
   <div  align="center" >
     <div class="preflist" align="center">
        <h4 class="headerpref" align="center">   
قائمة التفضيلات الخاصة بك   </h4>
       <v-card outlined shaped style="max-width: 20rem; max-height: 60rem;" class="cardd" v-for="(user, index) in users" :key="index">
            <v-list-item three-line align="center">
                <v-list-item-content align="center">
                    <v-row align="center">                      
                           <div v-if="user.user[0].image != NULL " >
                              <v-img v-bind:src="user.user[0].image" align="center" style="max-width: 20rem; max-height: 60rem;"  alt="User's image" >
                              </v-img>
                            </div>  
                            <div v-if="user.user[0].image != '' "  >
                                <v-img src="user.user[0].image" align="center" style="max-width: 20rem; max-height: 60rem;" alt="User's image" >
                                </v-img>
                           </div> 
                            <div v-if="user.user[0].image == '' "  >
                                <v-img src="../assets/UserDefaultAvatar.png" align="center" style="max-width: 20rem; max-height: 60rem;"   alt="User's image" >
                                </v-img>
                           </div> 
                           <div v-if="user.user[0].image == NULL "  >
                                <img v-bind:src="img" class="lazy" align="center" style="max-width: 20rem; max-height: 60rem;"   alt="User's image" >
                                
                           </div>    
                    </v-row  >
                    <div class="ms-auto">
                       {{ user.user[0].name}} : الاسم
                    </div>
                    <div>
                      {{ user.user[0].age}} : العمر
                    </div>
                 </v-list-item-content>
            </v-list-item>
                <v-card-actions>
                  <v-row align="center" justify="center">
                    <v-col>
                        <b-button variant="primary" small
                        style="width: 200px" rounded class="btns-prf" @click="gotouserinfo(user)">المزيد</b-button>
                    </v-col>
                  </v-row>
                </v-card-actions>
    </v-card>
   </div>
</div>
</template>


<script>
import axios from "axios";
import img from "../assets/UserDefaultAvatar.png";
export default{
       props:{
        
      },
      data(){
            return{
                users:  [
                    
                ],
                img:img,  
            }
      },


     mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjAwNjEyNSwiZXhwIjoxNjMyMDA5NzI1LCJuYmYiOjE2MzIwMDYxMjUsImp0aSI6IllBZkR4OFk2MjBzcGtMQnciLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.0Aok8zuObQqSdtZgALjnJgnnl5-QqCR1xy_iWnZfzs4");
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
          console.log("hiiiiiiii");
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
    background-color: rgb(211,211,211);
    bg-variant:dark;
     text-variant:grey;
     width:30%;
    padding-radius:9px;
        border-radius:15px;
        height:400px;
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
.preflist{
  margin-top:42px;
  background-color:white;
}
</style>