<template>
  <div text-variant="dark" >
      <b-button v-b-toggle.sidebar-right class="btn-s" right>افتح الشريط الجانبي</b-button>
            <div class="sidee">
                <b-sidebar id="sidebar-right" title="الاختيارات" right shadow>
                    <div class="px-6 py-2">
                            <nav class="mb-5">
                            <b-nav vertical type="dark" variant="light" text-variant="dark">
                                    <button class="btns" @click="goTofavs()">
                                        قائمة المفضلين
                                    </button>
                                    <button class="btns" @click="goToblocks()" >
                                      قائمة المحظورين
                                    </button>
                                    <button v-if="VIP === 1 " class="btns" @click="goTolikedme()">
                                         قائمة المعجبين بي
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
export default{
  data() {
    return {
      VIP: "",
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
         this.$router.push('/'); 
      },
      goTocertify(){
         this.$router.push('/certifyme'); 
      }, 
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
.linkk{
    color: black;
   cursor: pointer;
   text-decoration: none;
}
</style>