<template>
    <v-card
    class="mx-auto"
    outlined
  >
  
    <h1> كل الاسئلة </h1>
    <p  
        style="font-family: verdana;
        font-size: 15px;"
        v-for="(q, index) in questions"
        :key="index">
        {{q.question.question}}
        <v-divider> </v-divider>
    </p>
    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          مسح
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          ما هو رقم السؤال الذي تريد مسحه؟
        </v-card-title>

        <v-divider></v-divider>
        <v-card-actions>
        <input v-model="messageID" name="messageID" placeholder="Enter the ID">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="remove(messageID)"
          >
            تأكيد
          </v-btn>
          
        </v-card-actions>
        </v-card>
     </v-dialog>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
    data () {
      return {
        questions: ["Q1", "Q2", "Q3", "Q4"],
        dialog: false,
        messageID: ""
      }
    },
    mounted() {
      const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
      axios.get("http://127.0.0.1:8000/api/get-all-questions-with-answers", {headers: {Authorization: AuthStr}})
          .then(response => {
            this.questions = response.data[0];
            console.log(this.questions[0].answers[0].answer)
          })
    },
    methods: {
        remove(messageID) {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('usertoken'));
        axios({
            method: 'delete',
            url: "http://127.0.0.1:8000/api/deleteQuestion",
            headers: {Authorization: AuthStr},
            data: {
            id: messageID, // This is the body part
            }
        });
        this.dialog = false;
        document.getElementById(messageID).style.display='none';
        },
    }
}
</script>