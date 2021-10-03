<template v-for="(question, id) in questions">
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
          v-for="(question, id) in questions"
          :key="id"
          :complete="e1 > id"
          :step="id+1"
          color="red"
      >
      
        السؤال {{ id + 1 }}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
           v-for="(question, id) in questions"
          :key="id"
          :step="id+1"
      >

        <h2> {{question}} </h2>
        <v-btn @click="color=blue"> Ans1 </v-btn>
        <v-btn> Ans2 </v-btn>
        <v-btn> Ans3 </v-btn>
        <v-btn> Ans4 </v-btn>
        <br> <br> 

        <v-btn
          v-if="e1 < questions.length"
          color="green"
          @click="e1 += 1"
        >
          استكمال
        </v-btn>

        <v-btn
          @click="redirect('HomePage')"
          v-if="e1 == questions.length"
          color="blue"
        >
          انتهاء
        </v-btn>

        &nbsp;

        <v-btn
            v-if="e1 > 1"
            color="red"
            @click="e1 -= 1"
        >
            الرجوع
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
// import axios from "axios";

  export default {
    data () {
      return {
        e1: 1,
        questions: ["Q1", "Q2", "Q3", "Q4"],
        answers: ["Ans1", "Ans2", "Ans3", "Ans4"]
        // id: 1
      }
    },
    methods: {
      redirect(name) {
      this.$router.push({name:name});
      }
    }
  }
</script>

<style scoped>

.test{
    align-content: right;
}

</style>