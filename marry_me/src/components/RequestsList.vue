<template>
  <v-card :id="id" style="background-color: white;margin:15px;direction: rtl" class="mx-auto">
    <v-list   class="list-style" three-line>
      <template>

        <v-list-item style="max-width: 1300px">
          <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%">
            <v-img :src="img"></v-img>
          </v-list-item-avatar>

          <v-list-item-content style="text-align: right;margin: 0 50px 0 20px">
            <v-list-item-title style="font-weight: bolder;font-size: 25px">الأسم : {{ name }}</v-list-item-title>
            <v-list-item-subtitle style="font-weight: bolder;font-size: 17px">العمر : {{ age }}</v-list-item-subtitle>
          </v-list-item-content>

          <div  class="text-center">
            <v-dialog
                v-model="dialog"
                width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    style="background-color: #FE6265" depressed color="error">
                  إزالة
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  إزالة الطلب الذي ارسلته
                </v-card-title>

                <v-card-text>
                  هل انت متأكد من إزالة هذا الطلب ؟
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      @click="remove(id)" style="background-color: #FE6265"
                  >
                    نعم انا متأكد
                  </v-btn>
                  <v-btn
                      @click="dialog = false"
                      color="primary"
                      text
                      style="margin-left: 7px"
                  >
                    إلغاء
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
    }
  },
  name: "RequestList",
  props:{
    name:String,
    age:Number,
    id:Number,
    img:String,
    count:Function
  },
  methods: {
    remove(id) {
      const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjA1NjIxMCwiZXhwIjoxNjMyMTAzMDEwLCJuYmYiOjE2MzIwNTYyMTAsImp0aSI6IkRoNDJwUk5McVM4b3Y5anoiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.QrsKt8UGJWQT2bx2tWBT1VxU6obV2SdaYhpMcVC3kSk");
      axios({
        method: 'delete',
        url: "http://127.0.0.1:8000/api/deleteRequest",
        headers: {Authorization: AuthStr},
        data: {
          id: id, // This is the body part
        }
      });
      this.dialog = false;
      document.getElementById(id).style.display = 'none';
      this.count();
    }
  }
}
</script>

<style scoped>
.list-style {
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  box-shadow: 0 0 20px gray;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}

.list-style:hover {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
  transition: 0.8s;
}

</style>
