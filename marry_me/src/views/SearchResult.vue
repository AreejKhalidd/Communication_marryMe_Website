<template>
 <div class="page">
   <div class="bars">
    <Navbar/>
    <Sidebar/>
      <div class="searchlist" align="center">
        <h4 class="headerpref"> {{this.msgtoshow}} </h4>
 <v-card outlined shaped style="max-width: 20rem;" class="cardd" v-for="(user, index) in userstoshow" :key="index">
            <v-list-item three-line align="center">
                <v-list-item-content align="center">
                    <v-row align="center">                      
                           <div v-if="user.image != NULL " >
                              <v-img v-bind:src="user.image" align="center" style="max-width: 20rem; max-height: 60rem;"  alt="User's image" >
                              </v-img>
                            </div>  
                            <div v-if="user.image != '' "  >
                                <v-img src="user.image" align="center" style="max-width: 20rem; max-height: 60rem;" alt="User's image" >
                                </v-img>
                           </div> 
                            <div v-if="user.image == '' "  >
                                <v-img src="../assets/UserDefaultAvatar.png" align="center" style="max-width: 20rem; max-height: 60rem;"   alt="User's image" >
                                </v-img>
                           </div> 
                           <div v-if="user.image == NULL "  >
                                <img v-bind:src="img" align="center" style="max-width: 20rem; max-height: 60rem;"   alt="User's image" >
                                
                           </div>    
                    </v-row  >
                    <div class="ms-auto">
                       {{ user.name}} : الاسم
                    </div>
                    <div>
                      {{ user.age}} : العمر
                    </div>
                 </v-list-item-content>
            </v-list-item>
                <v-card-actions>
                  <v-row align="center" justify="center">
                    <v-col>
                        <b-button variant="primary" small
                        style="width: 200px" rounded class="btns-prf" @click="gotouserinfo(user,index)">المزيد</b-button>
                    </v-col>
                  </v-row>
                </v-card-actions>
    </v-card> 
    </div> 
  </div>
 </div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import img from "../assets/UserDefaultAvatar.png";
 export default {
    name: "SearchResult",
    components: {
    Navbar,
    Sidebar,
   },
   props: { users:[] , msg:null },
   data() {
    return {   
                userstoshow:JSON.parse(this.users),
                msgtoshow:this.msg,
                img:img,
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
          this.$router.push({name: 'Userinfoforsearch',params: { id:i,email:e,name:n,age:a,image:im,gender:gen }})

        }
    },
    

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
  .bars{
  text-align:center;
   background-color:white;
}
.searchlist{
  margin-top:42px;
  background-color:white;
}
.page{
  background-color:white;
}
</style>