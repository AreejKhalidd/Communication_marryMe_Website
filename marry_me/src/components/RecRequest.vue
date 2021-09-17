
<template>

  <v-card v-if="status !== 1 && status!==2" :id="id" style="background-color: white;margin:15px;direction: rtl" class="mx-auto">
    <v-list class="list-style" three-line>
      <template>

        <v-list-item style="max-width: 1300px">
          <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%">
            <v-img :src="img"></v-img>
          </v-list-item-avatar>

          <v-list-item-content style="text-align: right;margin: 0 50px 0 20px">
            <v-list-item-title style="font-weight: bolder;font-size: 25px">الأسم : {{ name }}</v-list-item-title>
            <v-list-item-subtitle style="font-weight: bolder;font-size: 17px">العمر : {{ age }}</v-list-item-subtitle>
          </v-list-item-content>

          <div class="text-center">
              <template>
                <v-btn
                    class="ml-3"
                    @click="accept(id,sender_id)"
                    depressed color="primary">
                  قبول
                </v-btn>
                <v-btn
                    @click="reject(id,sender_id)"
                    style="background-color: #FE6265" depressed color="error">
                  رفض
                </v-btn>
              </template>
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
  name: "RecRequests",
  props: ["name", "age", "id", "img","sender_id","status"],
  methods: {
    accept(id,s) {
      console.log(id,s)
      const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTYzMTcyNjgzMiwiZXhwIjoxNjMxNzMwNDMyLCJuYmYiOjE2MzE3MjY4MzIsImp0aSI6IjBrdEdySUxLUXdCdWZqdTAiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.pnOp4pH2Go7nlfkK8mc44Vug0lbs3QtYrYjY20oemO8");
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/api/decision",
        headers: {Authorization: AuthStr},
        data: {
          sender: s, // This is the body part
          replay:1
        }
      });
      this.dialog = false;
      document.getElementById(id).style.display = 'none';
    },
    reject(id,s) {
      const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTY4MDQzMywiZXhwIjoxNjMxNjg0MDMzLCJuYmYiOjE2MzE2ODA0MzMsImp0aSI6Ik5WOW1JNkpGakFXVUFYSGMiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.VS94Vgio9bOPMJziB8uxMUfqtHbp5X5AJsYIwPDWeeo");
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/api/decision",
        headers: {Authorization: AuthStr},
        data: {
          sender: s, // This is the body part
          replay:2
        }
      });
      this.dialog = false;
      document.getElementById(id).style.display = 'none';
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
