<template>
<div id="app" >
    <b-navbar type="light" varient="light" class="bar">
      <span></span>

          <b-navbar-nav class="mr-auto ml-5 me-3"> 
           <b-button size="sm" class="btnss" variant="outline-secondary" type="submit" @click="logout()">تسجيل خروج</b-button>  
         </b-navbar-nav>



      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">
             <b-button size="sm"  class="btns" variant="outline-secondary" type="submit">     البحث     </b-button> 
                <span></span>
              <b-form-input placeholder="البحث" size="sm" class="in"></b-form-input>
            <b-nav-item href="/">المحادثات</b-nav-item>
            <b-nav-item href="/my_profile">الصفحة الشخصية</b-nav-item>
            <b-nav-item href="/homepage">الصفحة الرئيسية</b-nav-item>    
            </b-navbar-nav>
      </b-collapse>

      <b-navbar-nav>
        <b-navbar-brand  href="#" disabled><b-img  src="marry_me.jpeg" height=30px width=30px v-bind="mainProps" rounded="circle" alt="Circle image"></b-img> </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      </b-navbar-nav>

    </b-navbar>
</div>
</template>

<script>
import axios from "axios";
export default{

 methods:{
       
      logout(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYzOTA5MywiZXhwIjoxNjMxNjQyNjkzLCJuYmYiOjE2MzE2MzkwOTMsImp0aSI6InNMSG1PSzNIU0NaalRwZ28iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FcH-n38bSClAmgwTTA5kNL2W7Rbxm1LsWvY78TaYvQg");
          axios({
            method: 'post',
            url: "http://127.0.0.1:8000/api/logout",
            headers: {Authorization: token}
          }).then(response => {
          console.log(response.data)
          alert("You are logged out..");
          this.$router.push('/');
                })
                        .catch((error) => {
                        console.log('There is error:'+error);
                        return "error occoured"
                        //return to login page
                });
      },
  }
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
}
.btns{
  background-color: rgba(255,98,101,1);
  color:black;
  border-radius: 12px;
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
span:not(:last-child) {
    margin-right: 5px;
}
</style>
 