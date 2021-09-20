<template>
  <div text-variant="dark" class="sb" >         
            <div >
                <b-sidebar id="sidebar-right"  class="sidee" style="color: white; background-color:white; background:white;" title="الاختيارات" right shadow>
                    <div class="px-6 py-2">
                            <nav class="mb-5">
                            <b-nav vertical type="dark" variant="light" text-variant="dark">
    <v-list-item to="favUsers">
      <span class="link" style="text-align:center;margin-left:auto"> قائمة المعجب بهم</span>
      <font-awesome-icon style="color: #FE6265;font-size: 40px;margin-left:auto" :icon="fav"/>     
    </v-list-item>  
    <v-list-item to="blockedUsers">
      <span class="link" style="text-align:center;margin-left:auto">قائمة المحظورين</span>
      <font-awesome-icon style="color: #FE6265;font-size: 40px;margin-left:auto" :icon="block"/>     
    </v-list-item>  
    <v-list-item to="allRequests">
      <span class="link" style="text-align:center;margin-left:auto">قائمة طلبات الصداقة</span>
      <font-awesome-icon style="color: #FE6265;font-size: 40px;margin-left:auto" :icon="req"/>     
    </v-list-item>  
    <v-list-item to="followersList" v-if="VIP === 1 " >
      <span class="link" style="text-align:center;margin-left:auto">قائمة المعجبين بي</span>
      <font-awesome-icon style="color: #FE6265;font-size: 40px;margin-left:auto" :icon="favme"/>     
    </v-list-item> 
    <v-list-item to="certifyme" style="background-color:#f5f5f5;">
      <span class="link" style="text-align:center;margin-left:auto;background-color:#f5f5f5;">تصديق حسابي</span>
      <font-awesome-icon style="color: #FE6265;font-size:40px;margin-left:auto" :icon="certify"/>     
    </v-list-item>


                                  
                            </b-nav> 
                            </nav>
                    </div>
                </b-sidebar>
            </div>
  </div>
</template>


<script>
import axios from 'axios';
import {faHeart,faBan,faStar,faPlus,faCheck} from '@fortawesome/free-solid-svg-icons'
export default{
  data() {
    return {
      VIP: "",
    }
  },
  computed: {
     fav() {
      return faHeart
    },
     favme() {
      return faStar
    },
    block(){
      return faBan
    },
    req(){
       return faPlus
    },
    certify(){
       return faCheck
    }
  },
 methods:{
      goToblocks(){
         this.$router.push('/blockedUsers'); 
        }
      ,  
      goTofavs(){
         this.$router.push('/favUsers'); 
      },  
      goTolikedme(){
         this.$router.push('/followersList'); 
      },
      goTocertify(){
         this.$router.push('/certifyme'); 
      }, 
      goTorequests(){
           this.$router.push('/allRequests'); 
      },
  },
  mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1Mzc0MiwiZXhwIjoxNjMyMjAwNTQyLCJuYmYiOjE2MzIxNTM3NDIsImp0aSI6IjZBQjhESWtqYjl0WHc5a1kiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Z6wR2m7ekwSQvZUkMMnqkiUiujVyE_x_uzNilZvcbK4");
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


<style>
.sidee{
   box-shadow:0px 2px 5px #777;
}
.btns{
  background-color: 	#f5f5f5;
  
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;
  color:black;
  margin-bottom:4px;
  margin-top:1px;
  width: 100%;
  height: 7vh;
  variant:outline-secondary;
  text-align: center;
  text-align-v:center;
  text-align-h:center;
  align:center;
  align-self:center;
  align-items: center;
}
.btns:hover {
  
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
    background-color: 	#f5f5f5;
  
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;
  color:grey;
  variant:outline-secondary;
  cursor:pointer;
}
.btn-s{
  background-color: rgba(255,98,101,1);
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:2px;
  width:130px;
  height:40px;
  variant:outline-secondary;
    position: absolute;
  right: 0;

}
.btn-ss{
  background-color: 	#f5f5f5;
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:5px;
  margin-right:5px;
  width:60px;
  height:40px;
  variant:outline-secondary;
    position: absolute;
  right: 0;

}
.linkk{
    color: black;
   cursor: pointer;
   text-decoration: none;
}
.btns-logo{
margin-right:4px;
variant:outline-secondary;
color:black;
border-radius: 40%;
border: 0;
height: 60px;
width: 60px;
}
.btns-logo:hover{

  -webkit-transform: scale(1.05);
  transform: scale(1.05);
  background-color:white;
  color:grey;
  border-radius: 40%;
  variant:outline-secondary;
  cursor:pointer;
  font-size:12px;
}
.sb{
  background-color: 	#f5f5f5;
  color:white;
  
}
.sidee{
  background-color: 	#f5f5f5;
  color:white;
  box-shadow:1px 2px 5px rgba(255,98,101,1); 
}
.icon{
  background-color:#f5f5f5;
  margin-right:auto;
  margin-left:auto;
}
</style>