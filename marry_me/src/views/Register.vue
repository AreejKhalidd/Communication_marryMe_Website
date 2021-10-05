  
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
                  name="myform"
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
                  <div class="col" style="">
                    <v-btn
                      type="submit"
                      @click="signUpFacebook"
                      style="
                        color: white;
                        background-color: darkblue;
                        width: 18rem;
                        height: 3rem;
                        margin-left: -1rem;
                      "
                    >
                      <i class="fa fa-facebook fa-fw"></i> تسجيل دخول عبر
                      فيسبوك<v-icon style="color: white">mdi-facebook </v-icon>
                    </v-btn>
                    <v-btn
                      type="submit"
                      style="
                        color: white;
                        background-color: tomato;
                        width: 18rem;
                        height: 3rem;
                        margin-right: 2rem;
                      "
                      @click="signUpGoogle"
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
                    </v-btn>
                  </div>
                  <v-text-field
                  id="name"
                    label="الاسم"
                    name="name"
                    style="width: 600px"
                    color="red darken-0"
                    v-model="name"
                    :rules="nameRules"
                    prepend-inner-icon="mdi-account"
                    type="text"
                    class="rounded-2"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    id="Email"
                    label="الايميل"
                    name="email"
                    v-model="email"
                    color="red darken-0"
                    :rules="emailRules"
                    prepend-inner-icon="mdi-email"
                    type="email"
                    class="rounded-2"
                    outlined
                    required
                  ></v-text-field>
                  <div style="margin-bottom: 1rem; margin-top: -1rem">
                    <span
                      v-if="this.errorEmail.length > 0"
                      style="color: tomato"
                      >{{ this.errorEmail }}</span
                    >
                  </div>
                  <v-text-field
                    id="password"
                    onChange="check()"
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
                  <v-text-field
                    id="passwordconfirmation"
                    onChange="check()"
                    ref="confirmPassword"
                    label="تأكيد كلمه المرور"
                    name="confirmPassword"
                    v-model="confirmPassword"
                    color="red darken-0"
                    :rules="[confirmRules.required]"
                    prepend-inner-icon="mdi-lock"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    class="rounded-2"
                    outlined
                    required
                  ></v-text-field>
                  <div style="margin-bottom: 1rem; margin-top: -1rem">
                    <span style="color: tomato" id="message"
                      ><!--{{ this.errrConfirm }}--></span
                    >
                  </div>

                  <v-form
                    ref="myform"
                    style="
                      width: 600px;
                      text-align: center;
                      margin-right: 0rem;
                      margin-top: 2rem;
                    "
                    name="myform"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="signUpFacebook"
                  >
                    <v-text-field
                      ref="PhoneNumber"
                      id="phone"
                      label="رقم الموبايل"
                      name="phone"
                      v-model="phone"
                      color="red darken-0"
                      :rules="phoneRules"
                      prepend-inner-icon="mdi-phone"
                      type="phone"
                      class="rounded-2"
                      outlined
                      required
                    ></v-text-field>
                    <div style="margin-bottom: 1rem; margin-top: -1rem">
                      <span style="color: tomato" id="message"
                        ><!--{{ this.errrConfirm }}--></span
                      >
                    </div>
                    <v-text-field
                      id="gender"
                      ref="gender"
                      label="النوع"
                      name="gender"
                      v-model="gender"
                      color="red darken-0"
                      :rules="genderRules"
                      prepend-inner-icon="mdi-gender-male-female"
                      type="gender"
                      class="rounded-2"
                      outlined
                      required
                    ></v-text-field>
                    <div style="margin-bottom: 1rem; margin-top: -1rem">
                      <span style="color: tomato" id="message"
                        ><!--{{ this.errrConfirm }}--></span
                      >
                    </div>
                    <v-text-field
                      id="birthday"
                      ref="birthday"
                      label="تاريخ الميلاد"
                      name="birthday"
                      v-model="birthday"
                      color="red darken-0"
                      :rules="birthdayRules"
                      :icon="birthIcon"
                      type="date"
                      class="rounded-2"
                      outlined
                      required
                    ></v-text-field>
                    <div style="margin-bottom: 1rem; margin-top: -1rem">
                      <span
                        id="messageBirthday"
                        v-if="this.errorBirthday.length > 0"
                        style="color: tomato"
                        >{{ this.errorBirthday }}
                      </span>
                    </div>
                  </v-form>
                  <v-btn
                    @click="check"
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
              <!--  <v-card-actions class="ml-6 mr-6 text-center">
                <p>
                  By continuing, you agree to MarryMe's
                  <a href="#" class="pl-2" style="color: #000000">Policy</a> and
                  <a href="#" class="pl-2" style="color: #000000"
                    >Terms of Use</a
                  >
                </p>
              </v-card-actions>-->
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
    show1: false,
    show2: false,
    showVerify: false,
    valid: true,
    nameRules: [(v) => !!v || "الاسم مطلوب"],
    emailRules: [
      (v) => !!v || "الايميل مطلوب",
      (v) => /.+@.+\..+/.test(v) || "الايميل يجب ان يكون صالحا",
    ],
    passwordRules: [
      (v) => !!v || "كلمه المرور مطلوبه",
      (v) => (v && v.length > 8) || "كلمه المرور يجب ان تكون على الاقل 8 أحرف",
    ],
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    birthday: "",
    confirmRules: {
      required: (v) => !!v || "تأكيد كلمه المرور مطلوب",
    },
    phoneRules: [(v) => !!v || "رقم الموبايل مطلوب"],
    genderRules: [(v) => !!v || "النوع مطلوب"],
    birthdayRules: [(v) => !!v || "عيد الميلاد مطلوب"],
    showPassword: false,
    checkbox: true,
    errorEmail: "",
    errrConfirm: "",
    errorBirthday: "",
  }),
  methods: {
    signUpFacebook() {
      // console.log(this.$refs.form[0]);
      console.log(document.forms["myform"]["name"].value);
      if (
         this.$refs.myform.validate()
      ) {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/auth/facebook",
          data: {
            phone: this.phone,
            gender: this.gender,
            birth_day: this.birthday,
          },
        })
          .then((res) => {
            localStorage.setItem("usertoken", res.data.AccessToken);
          })
          .catch((err) => {
            // console.log(err.response.data.Errorsin.password);
            // console.log(err.response.data.Errorsin);
            if (err.response.status === 403) {
              alert("لقد استخدمت هذا الجهاز من قبل !!");
              // this.show1=true;
            }
            // this.errorEmail=err.response.data.Errorsin.email;
            // this.errorBirthday=err.response.data.Errorsin.birth_day;
            if (
              err.response.data.Errorsin.email ==
              "The email has already been taken."
            ) {
              this.errorEmail =
                "لقد تم تسجيل الدخول من قبل هذا البريد الالكترونى";
            }
            if (
              err.response.data.Errorsin.birth_day ==
              "The birth day must be a date before 17 years ago."
            ) {
              this.errorBirthday = "يجب أن يكون تاريخ الميلاد قبل 17 عامًا";
            }
          });
      }
    },

    signUpGoogle() {
      // console.log(this.$refs.form[0]);
      console.log(document.forms["myform"]["name"].value);
      if (this.$refs.myform.validate()) {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/auth/google/callback",
          //  headers:{Authorization: AuthStr},
          data: {
            phone: this.phone,
            gender: this.gender,
            birth_day: this.birthday,
          },
        })
          .then((res) => {
            //console.log(res.data);
            //this.$store.state.usertoken = res.data.access_token;
            localStorage.setItem("usertoken", res.data.AccessToken);
          })
          .catch((err) => {
            // console.log(err.response.data.Errorsin.password);
            // console.log(err.response.data.Errorsin);
            if (err.response.status === 403) {
              alert("لقد استخدمت هذا الجهاز من قبل !!");
              // this.show1=true;
            }
            // this.errorEmail=err.response.data.Errorsin.email;
            // this.errorBirthday=err.response.data.Errorsin.birth_day;
            if (
              err.response.data.Errorsin.email ==
              "The email has already been taken."
            ) {
              this.errorEmail =
                "لقد تم تسجيل الدخول من قبل هذا البريد الالكترونى";
            }
            if (
              err.response.data.Errorsin.birth_day ==
              "The birth day must be a date before 17 years ago."
            ) {
              this.errorBirthday = "يجب أن يكون تاريخ الميلاد قبل 17 عامًا";
            }
          });
      }
    },
    check() {
      if (
        document.getElementById("password").value !=
        document.getElementById("passwordconfirmation").value
      ) {
        document.getElementById("message").innerHTML =
          "تأكيد كلمة المرور غير متطابق";
        document.getElementById("passwordconfirmation").focus();
      }
      /* var cd = new Date(this.birthday).getFullYear();
      var yy = new Date().getFullYear();
      console.log(cd);
      console.log(yy - cd);
      if (yy - cd < 18) {
        window.alert("Age must be greater than 18");
        document.getElementById("birthday").focus();
        return false;
      }*/
    },
    signIn() {
      console.log("signin");
      this.$router.push({ name: "Login" });
    },
    validate() {
      this.$refs.myform.validate();
    },
    Register() {
      
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
      console.log(this.confirmPassword);
     // if (/*(this.$refs.form.validate()) &&*/ this.$refs.form.validate()) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/register",

          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword,
            phone: this.phone,
            gender: this.gender,
            birth_day: this.birthday,
          },
        })
          .then((res) => {
            //console.log(res.data);
            alert("من فضلك يرجى التحقق من بريدك الإلكتروني ");
            //this.$store.state.usertoken = res.data.access_token;
            localStorage.setItem("usertoken", res.data.AccessToken);
          })
          .catch((err) => {
            // console.log(err.response.data.Errorsin.password);
            // console.log(err.response.data.Errorsin);
             if (err.response.status === 400) {
              alert("من فضلك يرجى إدخال البيانات والتحقق منها أولا لإنشاء حسابك");
              // this.show1=true;
            }
            if (err.response.status === 403) {
              alert("لقد استخدمت هذا الجهاز من قبل !!");
              // this.show1=true;
            }
            // this.errorEmail=err.response.data.Errorsin.email;
            // this.errorBirthday=err.response.data.Errorsin.birth_day;
            if (
              err.response.data.Errorsin.email ==
              "The email has already been taken."
            ) {
              this.errorEmail =
                "لقد تم تسجيل الدخول من قبل هذا البريد الالكترونى";
            }
            if (
              err.response.data.Errorsin.birth_day ==
              "The birth day must be a date before 17 years ago."
            ) {
              this.errorBirthday = "يجب أن يكون تاريخ الميلاد قبل 17 عامًا";
            }
            /* if (
            err.response.data.Errorsin.password ==
            ["The password confirmation does not match."]
          ) {
            this.errorConfirm = "تأكيد كلمة المرور غير متطابق";
          }*/
          });
      //}
     /* else{
        console.log("nnnn");
        alert(" من فضلك أدخل جميع البيانات لكى يتم إنشاء حسابك");
      }*/
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