<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <!--<span>{{ this.message }}</span>-->

              <!--  <a href="#">
                <v-img src="@/assets/logo.png" alt="vuetify components logo" contain height="200" />
              </a> -->
                  <h3 style="font-size: 20px;
    margin-top: 2rem;">للتحقق من بريدك الالكترونى اضغط هنا</h3>
              <v-btn
                @click="verify"
                style="
                  margin-top: 3rem;
                  background-color: tomato;
                  color: white;
                  border-radius: 5px;
                "
                type="submit"
                x-large
                block
                >تحقيق البريد الالكترونى</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
             <v-row justify="center" no-gutters>
                    <v-col cols="12" sm="6" md="5">
                      <v-alert
                      type="success"
                         v-show="this.alert"
                        style="    margin-top: 4rem;
    text-align: center;
    "
              dark
                      >
                        تم التحقق من بريدك الالكترونى بنجاح
                      </v-alert>
                    </v-col>
                  </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "verifyemail",
  data: () => ({
    alert: false,
    email: "",
    message: "",
    error: "",
  }),

  methods: {
    verify() {
      console.log(this.$route.params.id);
      console.log(this.$route.params.id);
      console.log(this.$route.params.hash);
      console.log(this.$route.query.expires);
      console.log(this.$route.query.signature);

      const AuthStr = "Bearer ".concat(localStorage.getItem("usertoken"));
      axios({
        method: "get",
        url:
          "http://127.0.0.1:8000/api/verify-email/" +
          this.$route.params.id +
          "/" +
          this.$route.params.hash +
          "?expires=" +
          this.$route.query.expires +
          "&signature=" +
          this.$route.query.signature,
        headers: { Authorization: AuthStr },
      })
        .then((response) => {
            this.alert=true;
          console.log(this.url);
          this.message = response.data.message;
          console.log(response.data.message);

          localStorage.setItem("usertoken", response.data.AccessToken);
        })
        .catch((error) => {
          console.log(this.urlverify);
          console.log(error.response.statusText);
        });
    },
  },
};
</script>

<style lang="css" scoped>
div.row.no-gutters.justify-center {
  width: 65rem;
  margin-right: -2rem;
}

div.v-alert.v-sheet.theme--dark.tomato {
  background-color: tomato;
  width: 25rem;
}
div.col-sm-6.col-md-5.col-12{
    margin-right: -3rem;
}
</style>