<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <div class="text-center">
                <v-icon style="font-size: 8rem" large color="red darken-0">
                  mdi-email
                </v-icon>
                <p>
                  من فضلك أدخل عنوان بريدك الإلكتروني وسوف نرسل لك تعليمات حول
                  كيفية إعادة كلمة المرور
                </p>
              </div>

              <v-row justify="center" no-gutters>
                <v-col cols="12" sm="6" md="5">
                  <v-alert v-if="this.alert" style="" color="green" dark>
                    تم إرسال رابط إعادة تعيين كلمة المرور بنجاح
                  </v-alert>
                </v-col>
              </v-row>

              <v-row justify="center" no-gutters>
                <v-col cols="12" sm="6" md="5">
                  <v-alert v-if="this.alert1" style="" color="tomato" dark>
                    لا يوجد مثل هذا البريد الالكترونى
                  </v-alert>
                </v-col>
              </v-row>

              <!--  <a href="#">
                <v-img src="@/assets/logo.png" alt="vuetify components logo" contain height="200" />
              </a> -->
              <v-form
                style="
                  margin-top: 3rem;
                  margin-right: -8rem;
                  width: 600px;
                  text-align: center;
                "
                method="post"
                @submit.prevent="forgotPassword"
              >
                <v-text-field
                  label="أدخل عنوان بريدك الالكترونى"
                  name="email"
                  prepend-inner-icon="mdi-email"
                  :rules="emailRules"
                  v-model="email"
                  color="red darken-0"
                  type="email"
                  class="rounded-2"
                  outlined
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
                  >إرسال</v-btn
                >
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
  name: "forgotPassword",
  data: () => ({
    alert: false,
    alert1: false,
    email: "",
    message: "",
    error: "",
    emailRules: [
      (v) => !!v || "الايميل مطلوب",
      (v) => /.+@.+\..+/.test(v) || "الايميل يجب ان يكون صالحا",
    ],
  }),

  methods: {
    forgotPassword() {
      console.log(this.email);
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/forgot-password",
        data: {
          email: this.email,
        },
      })
        .then((res) => {
          console.log(res.data.message);
          //this.$store.state.usertoken = res.data.access_token;
          localStorage.setItem("usertoken", res.data.AccessToken);
          if (res.data.message == "Reset password link sent successfully") {
            this.alert = true;
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            this.alert1 = true;
          }
          //  if(err.message =="Reset password link sent successfully"){
          // this.alert = true;
          // }
        });
      //this.$router.push({name: 'ResetPassword',params:{email:this.email}});

      // this.$router.push({ name: "HomePage" });
    },
  },
};
</script>

<style lang="css" scoped>
div.row.no-gutters.justify-center {
  width: 63rem;
  margin-right: -21rem;
}

div.v-alert.v-sheet.theme--dark.tomato {
  background-color: tomato;
  width: 25rem;
}
</style>