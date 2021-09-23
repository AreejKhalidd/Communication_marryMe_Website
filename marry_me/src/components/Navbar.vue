<template>
<div class="nb" >
    <b-navbar class="bar">
      <span></span>

          <b-navbar-nav class="mr-auto ml-5 me-3"> 
           <b-button size="sm" class="btnss" variant="outline-secondary" type="submit" @click="logout()">تسجيل خروج</b-button>  
         </b-navbar-nav>



      <b-collapse id="nav-collapse" is-nav class="inform" >
          <b-navbar-nav align="center"> 
               <b-button  size="sm"  class="b" variant="outline-light"   @click="gotosearch()">البحث   </b-button>
                <span></span>  
                <input type="number" 
                  class="age"
                 v-model.number="age"  min=20 max=80  v-if="ageusers==true"/>
                <input type="number" 
                  class="age"
                 v-model.number="bancount"  min=1 max=49  v-if="banusers==true"/>
                <span v-if="ageusers==true"></span>             
                <b-dropdown  :text="catg" class="dp" variant="white" v-if="VIP === 1">
                    <b-dropdown-item-button @click="vipcatg()">VIP المستخدمين</b-dropdown-item-button>
                    <b-dropdown-item-button @click="freecatg()">المستخدمين المجانين</b-dropdown-item-button>
                    <b-dropdown-item-button @click="bancatg()" > المستخدمين المحظورين بعدد</b-dropdown-item-button>
                    <b-dropdown-item-button @click="certcatg()">المستخدمين المعتمدين</b-dropdown-item-button>
                    <b-dropdown-item-button @click="agecatg()"> عمر المستخدمين </b-dropdown-item-button>
                </b-dropdown>
                <span></span> 
              <input align="center" type="text"  v-model="search"  placeholder="   ...البحث  " size="sm" class="in" />
          </b-navbar-nav > 
      </b-collapse>
      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">    
            <b-nav-item href="/chat">المحادثات</b-nav-item>
            <b-nav-item href="/my_profile">الصفحة الشخصية</b-nav-item>
            <b-nav-item href="/homepage">الصفحة الرئيسية</b-nav-item>            
            </b-navbar-nav>
      </b-collapse>
        
         
    <b-navbar-brand >
      <button v-b-toggle.sidebar-right size="sm" title="فتح الشريط الجانبي" >
        <font-awesome-icon title="فتح الشريط الجانبي" rounded="circle" style="color: #FE6265;background-color:#f5f5f5;font-size: 30px;" :icon="list" class="icon"/>
      </button>
     </b-navbar-brand>

    </b-navbar>

  


</div>
</template>

<script>
import axios from "axios";
import {faFolder,faList} from '@fortawesome/free-solid-svg-icons'
export default{
  data() {
    return {
      VIP: "",
      dosearch:false,
      search:"",
      users:[],
      catg:"بحث من خلال..",
      banusers:null,
      vipusers:null,
      freeusers:null,
      certusers:null,
      ageusers:null,
      age:20,
      bancount:1,
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


      vipcatg(){
         this.catg="VIPالمستخدمين";
         this.vipusers=true;
      },
      freecatg(){
             this.catg="المستخدمين المجانين";
             this.freeusers=true;
      },
      bancatg(){
         this.catg="المستخدمين المحظورين";
         this.banusers=true;
      },
      certcatg(){
         this.catg="المستخدمين المعتمدين";
         this.certusers=true;
      },
      agecatg(){
         this.catg="عمر المستخدمين";
         this.ageusers=true;
      },
      logout(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI2MTk2NCwiZXhwIjoxNjMyMjY1NTY0LCJuYmYiOjE2MzIyNjE5NjQsImp0aSI6ImluZHFuTmNXSkJZc1FPTlUiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.wgI5qATfQHZbAw-pmuqVAxylssPHVIdBG8AKFurNzbA");
          axios({
            method: 'post',
            url: "http://127.0.0.1:8000/api/logout",
            headers: {Authorization: token}
          }).then(response => {
          console.log(response.data)
          alert("You are logged out..");
               
                console.log("logged out");
           localStorage.clear();
          this.$router.push('/login');
                })
                        .catch((error) => {
                        console.log('There is error:'+error);
                        return "error occoured"
                        //return to login page
                });
      },


      gotosearch()
      {
              this.dosearch=true;
              console.log(this.dosearch)
              console.log(this.search);
              this.$router.push({name: 'SearchResult',params:{VIP:this.VIP,searchname:this.search,banusers:this.banusers,freeusers:this.freeusers,vipusers:this.vipusers,certusers:this.certusers,age:this.age,bancount:this.bancount }});
      }
   },

  mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjMxNTQzMywiZXhwIjoxNjMyNTQ1ODMzLCJuYmYiOjE2MzIzMTU0MzMsImp0aSI6IkpVUE5RZnNoT2o0UlpnUWIiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.fsDGY9hDNTSO0XdJyEvUmDMMvUYJzaINBWZw7ugyd_U");
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

.alert {
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}
.bar{
  background-color: 	#f5f5f5;
  color:rgba(255,98,101,1);
  height:100 px;
  width:100%;
   box-shadow:1px 2px 5px rgba(255,98,101,1); 
  
}
.in{
    height:30px;
    width:150px;
    border-radius:15px;
    padding-radius:15px;
    margin-bottom:4px;
    margin-top:1px;
    border: solid 1px rgba(255,98,101,1);
    border-radius:30px;
    background-color:	#f5f5f5;
}
.age{
    height:30px;
    width:60px;
    padding-radius:15px;
    margin-bottom:4px;
    margin-top:1px;
    border: solid 1px rgba(255,98,101,1);
    border-radius:10px;
    background-color:	white;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    opacity: 1;
}
.dp{
    height:30px;
    width:140x;
    border-radius:15px;
    padding-radius:15px;
    margin-bottom:4px;
    margin-top:1px;
    marigin-right:5px;
    marigin-left:5px;
    background-color: 	#f5f5f5;
    border: solid 1px rgba(255,98,101,1);
    border-radius:30px;
}
.b{
  background-color: 	#f5f5f5;
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:1px;
  width:70px;
  height:30px;
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;



}
.b:hover {
  cursor:pointer;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: 	#f5f5f5;
  color:grey;
 border-radius: 12px;
}
.inform{
  text-align: center;
  align: center;
  display: flex;
  display: grid;
  justify:center;
  margin-left: 25%;
 
}
.btnss{
  background-color: 	#f5f5f5;
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:1px;
  width:100px;
  height:30px;
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;
}
.btnss:hover {
  cursor:pointer;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: 	#f5f5f5;
  color:grey;
  border-radius: 12px;
}
span:not(:last-child) {
    margin-right: 5px;
}
.search-wrapper {
    position: relative;
    label {
      position: absolute;
      font-size: 12px;
      color: rgba(0,0,0,.50);
      top: 8px;
      left: 12px;
      z-index: -1;
      transition: .15s all ease-in-out;
    }
    input {
      padding: 4px 12px;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      transition: .15s all ease-in-out;
      background: white;
      &:focus {
        outline: none;
        transform: scale(1.05);
        & + label  {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
    }
    .nb{
      background-color: #f5f5f5; 
    }
  }



</style>
 