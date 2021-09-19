<template>
  <div text-variant="dark" class="sb" > 
         
            <div class="sidee">
                <b-sidebar id="sidebar-right" title="الاختيارات" right shadow>
                    <div class="px-6 py-2">
                            <nav class="mb-5">
                            <b-nav vertical type="dark" variant="light" text-variant="dark">
                                    <button class="btns" @click="goTofavs()">
                                        قائمة المعجب بهم
                                    </button>
                                    <button class="btns" @click="goToblocks()" >
                                      قائمة المحظورين
                                    </button>
                                    <button v-if="VIP === 1 " class="btns" @click="goTolikedme()">
                                         قائمة المعجبين بي
                                    </button>
                                    <button class="btns" @click="goTorequests()">
                                        قائمة طلبات الصداقة
                                    </button>
                                    <button class="btns" @click="goTocertify()">
                                        تصديق حسابي
                                    </button>
                            </b-nav> 
                            </nav>
                    </div>
                </b-sidebar>
            </div>
  </div>
</template>


<script>
import axios from 'axios';
import {faFolder,faList} from '@fortawesome/free-solid-svg-icons'
export default{
  data() {
    return {
      VIP: "",
    }
  },
        computed: {
    folder() {
      return faFolder
    },
    list() {
      return faList
     },
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
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk5NzE0NiwiZXhwIjoxNjMyMDAwNzQ3LCJuYmYiOjE2MzE5OTcxNDcsImp0aSI6IjRLaEVKMWZTcW1rdFk2dGMiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JTOQW3PmzaOHMZ1W3nYbDjlvTpzrM1kj7Vwv8yXQogM");
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
  background-color: rgba(255,98,101,1);
  color:black;
  border-radius: 12px;
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
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color:rgba(255,98,101,1);
  color:grey;
  border-radius: 12px;
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
  background-color: white;
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
.sb{
  background-color:white;
}
.icon{
  background-color:white;
  margin-right:auto;
  margin-left:auto;
}
</style>