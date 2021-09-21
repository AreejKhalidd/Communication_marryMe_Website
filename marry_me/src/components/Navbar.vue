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
                <span></span>      <span></span>           <span></span>
                <b-dropdown  :text="catg" class="dp" variant="white">
                    <b-dropdown-item-button @click="vipcatg()">VIP المستخدمين</b-dropdown-item-button>
                    <b-dropdown-item-button @click="freecatg()">المستخدمين المجانين</b-dropdown-item-button>
                    <b-dropdown-item-button @click="certcatg()" >المستخدمين المحظورين</b-dropdown-item-button>
                    <b-dropdown-item-button @click="bancatg()">المستخدمين المعتمدين</b-dropdown-item-button>
                </b-dropdown>
                <span></span> <span></span>  <span></span> 
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
      q:"",
      users:[],
      msg:"",
      catg:"بحث من خلال..",
      banusers:null,
      vipusers:null,
      freeusers:null,
      certusers:null,
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
      logout(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1Mzc0MiwiZXhwIjoxNjMyMjAwNTQyLCJuYmYiOjE2MzIxNTM3NDIsImp0aSI6IjZBQjhESWtqYjl0WHc5a1kiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Z6wR2m7ekwSQvZUkMMnqkiUiujVyE_x_uzNilZvcbK4");
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
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1MjU1OSwiZXhwIjoxNjMyMjU2MTU5LCJuYmYiOjE2MzIyNTI1NTksImp0aSI6IkFocVFPZENWWjVxRzk2UjEiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ceDm8xcwoMuEQSldH_-sABlu4UkLsmgBCAKfe6VQbxE");
          if(this.VIP==1)
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
              if(this.banusers == null && this.vipusers==null && this.freeusers==null && this.certusers ==null)
              {
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
              else{
                if(this.banusers == true)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.search,ban:1}
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
                else if (this.freeusers==true)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.search,VIP:0}
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
                else if (this.vipusers==true)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.search,VIP:1}
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
                
                else if (this.certusers==true)
                {
                    axios({
                      method: 'post',
                      url: "http://127.0.0.1:8000/api/filter",
                      headers: {Authorization: token},
                      data: {name :this.search,certified:1}
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
              }
        }
        else{
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
      }
   },

  mounted(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1MjU1OSwiZXhwIjoxNjMyMjU2MTU5LCJuYmYiOjE2MzIyNTI1NTksImp0aSI6IkFocVFPZENWWjVxRzk2UjEiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ceDm8xcwoMuEQSldH_-sABlu4UkLsmgBCAKfe6VQbxE");
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
 