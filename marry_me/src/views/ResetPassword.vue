<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <div class="text-center">
                <p style="    font-size: 38px;
    margin-top: 4rem;
    margin-bottom: -4rem;
    color: tomato;
    margin-right: 5rem;">
               إعادة تعيين كلمة المرور
                </p>
              </div>
              <!--  <a href="#">
                <v-img src="@/assets/logo.png" alt="vuetify components logo" contain height="200" />
              </a> -->

              
                   <v-form
                  method="post"
                   style="width:600px;text-align:center;margin-right: -6rem;
    margin-top: 8rem;"
                  name="form"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="Login"
                >
                  <v-text-field
                    label="كلمه المرور"
                    style="height:97px;"
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
                  v-if="!alert"
                    type= "submit"
                     @click="alert = true"
                  x-large
                  block
                  >إعادة كلمة المرور </v-btn
                >

                 <v-alert
      v-model="alert"
      dismissible
      type="success"
    >تم إعادة كلمة المرور بنجاح
    </v-alert>
                </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import axios from "axios";
export default {
    name: "resetpassword",
  data: () => ({
    alert:true,
    message:"",
    error:"",
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
  }),

  methods:
  {
       
     verifyEmail(){
       console.log("verified");
         this.$router.push({ name: 'Login' })
},

/* resetPassword() {
      console.log(this.email);
     
      axios
        .post("http://127.0.0.1:8000/api/reset-password", {
          
          password: this.password,
          password_confirmation: this.confirmPassword,
          //this.DeleteMsg=response.data.message
        })
        //this.message = 'the mail was sent'
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },*/
      
  },

};
</script>

<style lang="css" scoped>

</style>