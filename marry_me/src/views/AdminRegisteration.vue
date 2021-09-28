  
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

                  <b-dropdown
                    variant="white"
                    text-align="right"
                    class="super"
                    style="
                      margin-right: 0rem;
                      margin-bottom: 2rem;
                      height: 57px;
                      background-color: white;
                      color: black;
                      border: solid 1px rgba(255, 98, 101, 255);
                      padding-left: 29rem;
                      text-align: right;
                      align-text: right;
                    "
                    :text="type"
                  >
                    <b-dropdown-item-button @click="superAdmin()"
                      >super admin</b-dropdown-item-button
                    >
                    <b-dropdown-item-button @click="normal()"
                      >normal</b-dropdown-item-button
                    >
                  </b-dropdown>

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
export default {
  name: "Register",
  data: () => ({
    type: "type of admin",

       super_admin:null,
    ExistingUseralert: false,
    show1: false,
    show2: false,
    showVerify: false,

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
  }),
 
  mounted(){
    console.log(this.name);
    console.log(this.password);
    console.log(this.items);
    console("dataaa");
  },


  methods: {

         signIn() {
      console.log("signin");
      this.$router.push({ name: "Login" });
    },
  
  
    validate() {
      this.$refs.form.validate();
    },


superAdmin()
{
this.type="Super Admin";
this.super_admin=1;
},
normal()
{
this.type="Normal Admin";
this.super_admin=0;
},


  
    Register(){
                    console.log(this.password);      
              console.log(this.name);
              console.log(this.super_admin);
              
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpblwvQWRtaW4iLCJpYXQiOjE2MzI3NjY2MTQsImV4cCI6MTYzMjc3MDIxNCwibmJmIjoxNjMyNzY2NjE0LCJqdGkiOiJienpaRUw2WXlrRGwxeFA4Iiwic3ViIjoxLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.4ZmYKqfoUizSQKHRqZE5SQFehUaCGquCVIasPUWm0dE");
          axios({
            method: 'post',
            url: "http://127.0.0.1:8000/api/register/Admin",
            headers: {Authorization: token /*`${'Bearer'} ${localStorage.getItem('usertoken')}`*/  },

            data:{    username: this.name,
          password: this.password,
           super_admin: this.super_admin, }
          }).then(response => {
  

          console.log(response.data)
             
                })
                        .catch((error) => {
                        console.log('There is error:'+error);
                        this.error = true;
                        return "error occoured"
                });
  },
   
  },
};
</script>

<style lang="css" scoped>
.super {
  width: 600px;
  text-align: center;
  margin-right: -10rem;
  background-color: blue;
}
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