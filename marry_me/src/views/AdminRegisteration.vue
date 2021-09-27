  
<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <v-img
                style="margin-left: 0px"
                src="@/assets/marry_me.jpeg"
                alt="MarryMe Logo"
                position="left left"
                height="90"
                width="90"
              ></v-img>

              <v-card-text>
                <v-form
                  ref="form"
                  style="
                    width: 600px;
                    text-align: center;
                    margin-right: -10rem;
                    margin-top: -9rem;
                  "
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="Register"
                >
                  <h2
                    style="
                      text-align: center;
                      margin-bottom: 22px;
                      color: tomato;
                      margin-right: 1rem;
                      margin-top: 2rem;
                    "
                  >
                    إنشاء حساب جديد
                  </h2>
                <!--  <div class="col" style="">
                    <a
                      style="width: 25rem; margin-right: -1rem"
                      href="http://127.0.0.1:8000/api/auth/facebook"
                      class="fb btn"
                    >
                      <i class="fa fa-facebook fa-fw"></i> تسجيل دخول عبر
                      فيسبوك<v-icon style="color: white">mdi-facebook </v-icon>
                    </a>

                    <a
                      style="
                        width: 25rem;
                        margin-right: 1rem;
                        margin-left: -1rem;
                      "
                      href="http://127.0.0.1:8000/api/auth/google"
                      class="google btn"
                    >
                      <i class="fa fa-google fa-fw"></i>تسجيل دخول عبر جوجل
                      <v-icon
                        style="
                          color: tomato;
                          background-color: white;
                          border-radius: 13px;
                          font-size: 25px;
                        "
                      >
                        mdi-google
                      </v-icon>
                    </a>
                  </div>-->

                  <v-text-field
                    label="اسم المستخدم"
                    name="name"
                    style="width: 600px"
                    color="red darken-0"
                    v-model="name"
                    :error-messages="errorMessages"
                    :rules="nameRules"
                    prepend-inner-icon="mdi-account"
                    type="text"
                    class="rounded-2"
                    outlined
                  ></v-text-field>
           
                  <v-text-field
                    label="كلمه المرور"
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
      
         <v-select
         
                    style="width: 600px"
                    color="red darken-0"
          :items="items"
          label="المشرف"
          :rules="itemRules"
          outlined
          required
        ></v-select>

          
               
                  <v-btn
                    @click="validate"
                    :disabled="!valid"
                    type="submit"
                    style="
                      background-color: tomato;
                      color: white;
                      border-radius: 5px;
                      margin-bottom: 2rem;
                    "
                    x-large
                    block
                    dark
                    >إنشاء حساب</v-btn
                  >

                  <div
                    style="text-align: center; margin-right: -7px"
                    class="text-center"
                  >
                    <v-card-actions class="text--secondary">
                      <v-spacer></v-spacer>
                      هل لديك حساب؟
                      <button
                        style="
                          color: tomato;
                          margin-left: 11rem;
                          font-size: larger;
                        "
                        @click="signIn()"
                      >
                        تسجيل دخول
                      </button>
                    </v-card-actions>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions class="ml-6 mr-6 text-center">
                <p>
                  By continuing, you agree to MarryMe's
                  <a href="#" class="pl-2" style="color: #000000">Policy</a> and
                  <a href="#" class="pl-2" style="color: #000000"
                    >Terms of Use</a
                  >
                </p>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "Register",
  data: () => ({
       items: ['True', 'False'],
    ExistingUseralert: false,
    show1: false,
    show2:false,
    showVerify:false,

    valid: true,
    nameRules: [(v) => !!v || "الاسم مطلوب"],
     itemRules: [(v) => !!v || " مطلوب"],
    passwordRules: [
      (v) => !!v || "كلمه المرور مطلوبه",
      (v) => (v && v.length > 8) || "كلمه المرور يجب ان تكون على الاقل 8 أحرف",
    ],
    name: "",
    password: "",
    showPassword: false,
    checkbox: true,
    errorMessages: "",
    // formHasErrors: false,
  }),
  computed: {
    birthIcon() {
      return faBirthdayCake;
    },
  },
  methods: {
    signIn() {
      console.log("signin");
      this.$router.push({ name: "Login" });
    },
    validate() {
      this.$refs.form.validate();
    },
    Register() {
      console.log(this.name);
      console.log(this.password);
       console.log(this.items);
      
      
      const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };
      axios.post('http://127.0.0.1:8000/api/register/Admin',  {
         option,
          username: this.name,
          password: this.password,
           super_admin: this.items,
          
        
        })
        .then((res) => {
          console.log(res.data);
            this.$store.state.usertoken = res.data.access_token;
            localStorage.setItem('usertoken',res.data.access_token);
            /* if(res.response.status === 201){
           this.showVerify = true;
          }*/
            
        //  if (res.status === 403) {
           //  console.log(res.data);
           // this.show = true;
            // alert(res.response.data.message)
            // console.log(res.response.data.code, 'Invalid, you used this device before !!')
         // }
          // alert("You are logged in..");
          // const token = localStorage.setItem("token", res.data.access_token);
          // return token;
          // const user = localStorage.setItem("user", res.data.user);
          // return token, user;
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.status === 403) {
            this.show1=true;
         
          }
          if(err.response.status === 400){
            this.show2=true;
          }
         
        
 
        });
    },
  },
};
</script>

<style lang="css" scoped>
.alert {
  padding: 20px;
  background-color: #f44336;
  color: white;
  margin-bottom: 15px;
}

div.row.no-gutters.justify-center {
  width: 63rem;
  margin-right: -11rem;
}

div.v-alert.v-sheet.theme--dark.tomato {
  background-color: tomato;
  width: 25rem;
}

.col {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
}

v-img {
  background-position: left;
}

/* Facebook and Google buttons */
.fb {
  background-color: #3b5998;
  color: white;
  margin-right: 5px;
}
.google {
  background-color: tomato;
  color: white;
  margin-right: 27px;
}

a.google.btn {
  margin-left: 1px;
}
.btn {
  width: 70%;
  padding: 12px;
  border: none;
  border-radius: 4px;

  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
}
.btn:hover {
  opacity: 1;
}

div.v-card__actions.text--secondary {
  font-size: 13px;
  font-weight: bold;
  margin-left: 16rem;
}

div.text-center {
  margin-right: -14px;
  width: 37rem;
}
div.v-image.v-responsive.theme--light {
  height: 50px;
  width: 50px;

  margin-left: 13px;
  margin-top: 1rem;
  margin-right: -27rem;
}
</style>