<template>
<div class="nb" >
    <b-navbar class="bar">
      <span></span>

          <b-navbar-nav class="mr-auto ml-5 me-3"> 
           <b-button size="sm" class="btnss" variant="outline-secondary" type="submit" @click="logout()">تسجيل خروج</b-button>  
         </b-navbar-nav>



      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">    
             <b-button  size="sm"  class="btns"  variant="outline-secondary"   @click="gotosearch()">البحث   </b-button>
                <span></span>
              <input type="text"  v-model="search"  placeholder="   ...البحث  " size="sm" class="in" />
            <b-nav-item href="/chat">المحادثات</b-nav-item>
            <b-nav-item href="/my_profile">الصفحة الشخصية</b-nav-item>
            <b-nav-item href="/homepage">الصفحة الرئيسية</b-nav-item> 
            
            </b-navbar-nav>
      </b-collapse>
        
         
    <b-navbar-brand >
      <button v-b-toggle.sidebar-right size="sm" title="فتح الشريط الجانبي" >
        <font-awesome-icon title="فتح الشريط الجانبي" rounded="circle" style="color: #FE6265;font-size: 30px;" :icon="list" class="icon"/>
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
      q:"",
      users:[],
      msg:"",
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
         watch: {
            '$route.query.q'() {
                this.gotosearch();
            }
        },
      logout(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYzOTA5MywiZXhwIjoxNjMxNjQyNjkzLCJuYmYiOjE2MzE2MzkwOTMsImp0aSI6InNMSG1PSzNIU0NaalRwZ28iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FcH-n38bSClAmgwTTA5kNL2W7Rbxm1LsWvY78TaYvQg");
          axios({
            method: 'post',
            url: "http://127.0.0.1:8000/api/logout",
            headers: {Authorization: token}
          }).then(response => {
          console.log(response.data)
          alert("You are logged out..");
                this.$store.state.usertoken = null;
           localStorage.clear();
          this.$router.push('/');
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
            if(this.search==="")
            {
                this.msg="المستخدمين المرجحين لك";
            }
            else{
              this.msg="الناتج عن بحثك"
            }
              const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjAyNzk4MiwiZXhwIjoxNjMyMDMxNTgyLCJuYmYiOjE2MzIwMjc5ODIsImp0aSI6ImRlZjBNeGJmRktJeUdHNHEiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.XeOzByPLFX7xxLF9ABLPaTqAMSttrp0fE06AaWSG6hs");
              axios({
                method: 'post',
                url: "http://127.0.0.1:8000/api/filter",
                headers: {Authorization: token},
                data: {name :this.search}
              }).then(response => {
              console.log(response.data)
              this.users=response.data

              console.log("kkkkkkkkk")
              console.log(response.data)
              console.log(this.users)
                let id=Math.floor(Math.random() * 10);
                console.log(id); console.log("searchh 3laa");console.log(this.search);
              this.$router.replace({name: 'SearchResult',query:{searchname:this.search},params:{msg:this.msg, users: JSON.stringify(this.users) }});
                    })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            return "error occoured"
                    });
            }
      },

  mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTkzNjYwOCwiZXhwIjoxNjMxOTQwMjA4LCJuYmYiOjE2MzE5MzY2MDgsImp0aSI6IkY0cDVDWFhTbmpuN0ZyMTgiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.aLn4tx1uAjhzUCKrEM82l4YQsc9I84El6tnT7TKgDcE");
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
  color:rgba(255,98,101,1);
  height:100 px;
  width:100%;
   box-shadow:1px 2px 5px #777; 
  
}
.in{
    height:30px;
    width:150px;
    border-radius:15px;
    padding-radius:15px;
      margin-bottom:4px;
    margin-top:1px;
    border: solid 1px #b1b8c9;
    background-color:white;
}
.btns{
  background-color: rgba(255,98,101,1);
  color:black;
  border-radius: 15px;
  margin-bottom:4px;
  margin-top:1px;
  width:70px;
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
.btnss{
  background-color: rgba(255,98,101,1);
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:1px;
  width:100px;
  height:30px;
}
.btnss:hover {
  cursor:pointer;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color:rgba(255,98,101,1);
  color:grey;
  border-radius: 12px;
}
.btn-ss{
  background-color: white;
  color:black;
  border-radius: 12px;
  margin-bottom:4px;
  margin-top:5px;
  margin-right:20px;
  margin-left:20px;
  width:20px;
  height:20px;
  variant:outline-secondary;
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
      background-color: white;
    }
  }

</style>
 