<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <div class="text-center">
                <p
                  style="
                    font-size: 38px;
                    margin-top: 4rem;
                    margin-bottom: -4rem;
                    color: tomato;
                    margin-right: 5rem;
                  "
                >
                  إعادة تعيين كلمة المرور
                </p>
              </div>
              <!--  <a href="#">
                <v-img src="@/assets/logo.png" alt="vuetify components logo" contain height="200" />
              </a> -->

              <v-form
                method="post"
                style="
                  width: 600px;
                  text-align: center;
                  margin-right: -6rem;
                  margin-top: 8rem;
                "
                name="form"
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="resetPassword"
              >
                <v-text-field
                  label="كلمه المرور"
                  style="height: 97px"
                  name="password"
                  v-model="password"
                  color="red darken-0"
                  :rules="passwordRules"
                  prepend-inner-icon="mdi-lock"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  class="rounded-2"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  ref="confirmPassword"
                  label="تأكيد كلمه المرور"
                  name="confirmPassword"
                  v-model="confirmPassword"
                  color="red darken-0"
                  :rules="confirmRules"
                  prepend-inner-icon="mdi-lock"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  class="rounded-2"
                  outlined
                  required
                ></v-text-field>

                <v-btn
                  style="
                    margin-top: 3rem;
                    background-color: tomato;
                    color: white;
                    border-radius: 5px;
                  "
                  
                  type="submit"
               
                  x-large
                  block
                  >إعادة كلمة المرور
                </v-btn>

              <!--  <v-alert v-model="alert" dismissible type="success"
                  >تم إعادة كلمة المرور بنجاح
                </v-alert>-->
              </v-form>
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
  name: "resetpassword",

  props:{
    email:null
    
  },
  data: () => ({
    alert: false,
    message: "",
    error: "",
    passwordRules: [
      (v) => !!v || "كلمه المرور مطلوبه",
      (v) => (v && v.length > 8) || "كلمه المرور يجب ان تكون على الاقل 8 أحرف",
    ],
    confirmRules: [
      (v) => !!v || "تأكيد كلمه المرور مطلوب",
      // (this.password != this.confirmPassword) || 'Password must match'
      // const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //return pattern.test(value) || 'Invalid e-mail.'
    ],
    password: "",
    confirmPassword: "",
    showPassword: false,
    //email:this.$route.params.email,

  }),

  methods: {


 /*JavascriptgetURLParameterValues(parameterName, url) {
      if (!url) url = window.location.href;
      parameterName= parameterName.replace(/[\[\]]/g, "\\><");
      var regularExpression = 
          new RegExp("[?&]" + parameterName + "(=([^&#]*)|&|#|$)"),
      results = regularExpression.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
},
   var url=' http://127.0.0.1:8000/api/reset-password/0b953dc553fa3f6033e057699250d861b05a6c8bc77ac1f56b1bd755d82d273a?email=amiraFa%40gmail.com';
    console.log( JavascriptgetURLParameterValues(email, url));*/

       





    resetPassword() {
      
      console.log(this.password);
      console.log(this.email);
   /*   var url_string = "http://127.0.0.1:8000/api/reset-password"; //window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("e");
console.log(c);


const queryString = 'http://127.0.0.1:8000/api/reset-password/0b953dc553fa3f6033e057699250d861b05a6c8bc77ac1f56b1bd755d82d273a?email=amiraFa%40gmail.com';
console.log(queryString);


const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('email')
console.log(product);*/
      
     // const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };
     
      const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
      axios({
        method:"post",
        url:"http://127.0.0.1:8000/api/reset-password", 
        headers:{Authorization: AuthStr},
          data:{
          password: this.password,
          password_confirmation: this.confirmPassword,
          email: this.email,
          }
        })

      
      const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };
      axios
        .post("http://127.0.0.1:8000/api/reset-password", {
          option,
          password: this.password,
          password_confirmation: this.confirmPassword,
          email: this.email,

         
        })
      
        .then((res) => {
          console.log(res.data);
          
          this.$store.state.usertoken = res.data.access_token;
            localStorage.setItem('usertoken',res.data.access_token);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style lang="css" scoped>
</style>