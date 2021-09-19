<template>
 <div class="all">
     <Navbar/>
     <Sidebar/>
    <div class="page"> 
       <h4 class="hp" align="center">   {{this.msgtoshow}}  </h4>
          <v-card class="card" v-for="(user, index) in userstoshow" :key="index">
              <v-list class="list-style" three-line>
                <template>
                  <v-list-item style="max-width: 1300px">
                    <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%">
                      <v-img v-bind:src="user.image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="info">
                      <v-list-item-title class="textt">الأسم : {{ user.name }}</v-list-item-title>
                      <v-list-item-title  class="textt">العمر : {{ user.age }}</v-list-item-title >
                  </v-list-item-content>
                  <v-btn class="btn" @click="gotouserinfo(user,index)"> المزيد </v-btn>
                </v-list-item>
              </template>
            </v-list>
      </v-card>
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
            let on =user.online;
            let v=user.VIP;
            let bd=user.birth_day;
          this.$router.push({name: 'Userinfoforsearch',params: { id:i,email:e,name:n,age:a,image:im,gender:gen,online:on ,v:v, birth_day:bd  }})

        }
    },
    

}
</script>


<style scoped>
.all{
  background-color:white;
}
.page{
  margin-top:8px;
  background-color:white;
}
.card{
    box-shadow:5px 5px 5px rgba(255,98,101,1);
    
    background-color: white;
    margin:15px;
    direction: rtl;
}
.btn{
 margin-left:auto;
 variant:outline-secondary;
 color:black;
  background-color: grey;
  box-shadow: 0px 6px 0px white;
  border: solid 1px rgba(255,98,101,1);
  border-radius:30px;
  width:90px;
}
.textt{
  font-weight: bolder;
  font-size: 20px
}
.info{
  text-align: right;margin: 0 50px 0 20px
}
</style>