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
                id="password"
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
               id="passwordconfirmation"
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
                    <div style="margin-bottom: 1rem; margin-top: -1rem">
                    <span
                    auto-draw-duration="100"
                      style="color: tomato"
                      id="message"
                      ></span
                    >
                  </div>

                <v-btn
                 @click="check"
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

                <v-alert  style=" margin-top: 2rem;" v-model="alert" dismissible type="success"
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
    ],
    password: "",
    confirmPassword: "",
    showPassword: false,
    errrConfirm: "",
    //email:this.$route.params.email,

  }),

  methods: {
     check() {
      if (
        document.getElementById("password").value !=
        document.getElementById("passwordconfirmation").value
      ) {
        document.getElementById("message").innerHTML = "تأكيد كلمة المرور غير متطابق";
        document.getElementById("passwordconfirmation").focus();
      }
     },

    resetPassword() {
      console.log(this.password);
      console.log(this.email);
     // const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };
     
      //const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
      axios({
        method:"post",
        url:"http://127.0.0.1:8000/api/reset-password", 
       // headers:{Authorization: AuthStr},
          data:{
          password: this.password,
          password_confirmation: this.confirmPassword,
token:this.$route.params.token,
          email: this.$route.params.email,
          
          }
        })
        .then((res) => {
          console.log(res.data);
          if(res.data.message=="Your password has been reset!"){
           this.alert=true;
          }
          this.$store.state.usertoken = res.data.access_token;
            localStorage.setItem('usertoken',res.data.AccessToken);
        })
        .catch((err) => {
          console.log(err.message);
            if (err.response.status === 404) {
            alert("لا يوجد مثل هذا المستخدم");
           
          }
        });
    },
  },
};
</script>

<style lang="css" scoped>
</style>