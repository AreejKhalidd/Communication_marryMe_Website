<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              
               <v-img       src="@/assets/marry_me.jpeg" alt="Marry Me Logo" width="90" height="90"></v-img>
              
              <v-card-text class="text-center">
                <p
                  style="
                    font-weight: bold;
                    font-size: 25px;
                    color: tomato;
                    margin-bottom: 38px;
                    text-align: center;
  
        margin: -1rem 16rem 9rem -6rem;
                  "
                >
                  تسجيل دخول
                </p>


               <v-row justify="center" no-gutters>
                    <v-col cols="12" sm="6" md="5">
                      <v-alert
                         v-show="this.show1"
                        style=""
                        
                       color="tomato"
                        
            
              dark
                      >
                        لا يوجد مثل هذا المستخدم ، البريد الإلكتروني أو كلمة المرور غير صالحة
                      </v-alert>
                    </v-col>
                  </v-row>


                <v-form
                  method="post"
                   style="width:600px;text-align:center;margin-right: 1rem; margin-top: -2rem;"
                  name="form"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="Login"
                >
                  <v-text-field
                    label="اسم المستخدم"
                    style="width:600px"
                  
                    name="username"
                    :rules="usernameRules"
                    v-model="username"
                    prepend-inner-icon="mdi-account"
                    type="username"
                    
                    outlined
                    color="red darken-0"
                  ></v-text-field>
                  <v-text-field
                    label="كلمه المرور"
                    name="password"
                      style="width:600px"
                    :rules="passwordRules"
                    v-model="password"
                    prepend-inner-icon="mdi-lock"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    class="rounded-2"
                    outlined
                    color="red darken-0"
                  ></v-text-field>

              

                  <v-btn
                    :disabled="!valid"
                    @click="validate"
                    type="submit"
                    style="
                      background-color:tomato !important;
                      color: white;
                      border-radius: 5px;
                    "
                    x-large
                    block
                    >دخول</v-btn
                  >
                <!--  <v-card-actions class="text--secondary"> -->

                
                 <!-- <v-card-actions style="margin-top:-27px;" class="text--secondary"> -->
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => ({
    show1:false,
    answer: [],
    valid: true,
    usernameRules: [
      (v) => !!v || "اسم المستخدم مطلوب",
      //(v) => /.+@.+\..+/.test(v) || "الايميل يجب ان يكون صالحا",
    ],
    passwordRules: [
      (v) => !!v || "كلمه المرور مطلوبه",
      (v) => (v && v.length >= 8) || "كلمه المرور يجب ان تكون على الاقل 8 أحرف",
    ],
   username: "",
    
    password: "",
  
    showPassword: false,
   
    error: null,
    success: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },

 
    Login() {
      console.log(this.username);
      console.log(this.password);
      axios({
        method:"post",
        url:"http://127.0.0.1:8000/api/login/Admin", 
          data:{
          username: this.username,
          password: this.password,
         
          }
        })
        .then((res) => {
          console.log(res.data.AccessToken);
          console.log(res.data.message);
         // this.$store.state.usertoken = res.data.AccessToken;
            localStorage.setItem('adminToken',res.data.AccessToken);
          // if(res.data.message =="logged in successfully"/*status== 200*/){
             this.$router.push({ name: "AdminHomePage" });
           // }
        })
        .catch((err) => {
              if (err.response.status == 404) {
            this.show1=true;
              }
          console.log(err.message);
        });

      //this.$router.push({ name: "HomePage" });
    },
  },
};
</script>

<style lang="css" scoped>
.v-text-field__slot input {
  text-align: right;
}

.v-input__slot{
  width: 50rem;
    height: 62px;
}
 .v-text-field{
      width: 400px;
}

rounded-0.v-btn.v-btn--block.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--x-large.tomato {
  background-color: tomato;
  border-radius: 10px;
}
input#input-64 {
  background-color: white;
}

.v-card__text.text-center{
  margin-right: -10rem;
}

.v-image__image--contain{
  background-position:  left center !important;;
}

div.v-image__image.v-image__image--cover{
  margin-top:-50rem ;
  margin-left: 2rem;
}
#text{
  font-size: 20px;
}

div.v-image.v-responsive.theme--light{
 
  height: 50px;
  width: 50px;

  margin-left: 13px;
  margin-top: -3rem;
  margin-right: -27rem;
      /*  height: 101px;
    width: 100px;
    margin-top: 3rem;
    margin-right: -25rem;*/

}

div.row.no-gutters.justify-center{
  width: 63rem;
    margin-right: -11rem;
}

div.v-alert.v-sheet.theme--dark.tomato{
  background-color: tomato;
    width: 27rem;
    margin-top: -7rem;
    margin-right: 0rem;
}

</style>
