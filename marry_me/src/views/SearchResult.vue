<template>
   <div class="search">
    <Navbar/>
      <div id="searchlist">
        <h4 class="headerpref"> {{this.msgtoshow}} </h4>
        <b-card
        tag="article"
        style="max-width: 20rem;"  
        class="cardd" 
        v-for="(user, index) in this.userstoshow" 
           :key="index" 
        >

                <div v-if="user.image != 'NULL' " >
                    <b-card-img v-bind:src="user.image" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                    </b-card-img>
                </div>
                <div v-else-if="user.gender ==  'Female' " >
                    <b-card-img src="female-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                    </b-card-img>
                </div>
                <div v-else-if="user.gender ==  'female' " >
                    <b-card-img src="female-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                    </b-card-img>
                </div>
                <div v-else-if="user.gender ==  'Male' " >
                    <b-card-img src="male-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                    </b-card-img>
                </div>
                <div v-else-if="user.gender ==  'male' " >
                    <b-card-img src="male-user.jpg" style="max-width: 20rem; max-height: 60rem;" height="280px"  alt="User's image" >
                    </b-card-img>
                </div>
        
            <b-card-text>                 
                 {{ user.name}} : الاسم
            </b-card-text>
            <b-card-text>
               {{ user.age}} : العمر
            </b-card-text>
                <b-button href="#" variant="primary" class="btns-prf" @click="gotouserinfo(user,index)" >المزيد</b-button>
        </b-card>  
    </div> 
  </div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
 export default {
    name: "SearchResult",
    components: {
    Navbar,
   },
   props: { users:[] , msg:null },
   data() {
    return {   
                userstoshow:JSON.parse(this.users),
                msgtoshow:this.msg
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
    background-color: white;
    bg-variant:dark;
     text-variant:grey;
     width:30%;
    padding-radius:9px;
        border-radius:15px;
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
</style>