<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
        color = "red"
      >
        السؤال الأولة
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
        color = "red"
      >
        السؤال الثانية
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        step="3"
        color = "red">
        السؤال الثالثة  
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">

        <p> Question 1 </p>
        <v-btn> Ans1 </v-btn>
        <v-btn> Ans2 </v-btn>
        <v-btn> Ans3 </v-btn>
        <v-btn> Ans4 </v-btn>
        <br> <br> 

        <v-btn
          color="green"
          @click="e1 = 2"
        >
          استكمال
        </v-btn>

        &nbsp;
        <v-btn
            color="red"
            @click="e1 = 1"
            disabled="true"
        >
            الرجوع
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <p> Question 2 </p>
        <v-btn> Ans1 </v-btn>
        <v-btn> Ans2 </v-btn>
        <v-btn> Ans3 </v-btn>
        <v-btn> Ans4 </v-btn>
        <br> <br> 
        <v-btn
          color="green"
          @click="e1 = 3"
        >
          استكمال
        </v-btn>

        &nbsp;
        <v-btn
            color="red"
            @click="e1 = 1"
        >
            الرجوع
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="3">

       <p> Question 3 </p>
        <v-btn> Ans1 </v-btn>
        <v-btn> Ans2 </v-btn>
        <v-btn> Ans3 </v-btn>
        <v-btn> Ans4 </v-btn>
        <br> <br> 

        <v-text-field
            label="Other Ans"
        ></v-text-field>

        <v-btn
          color="green"
        >
          إرسال
        </v-btn>
        &nbsp;
        <v-btn
            color="red"
            @click="e1 = 2"
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
      }
    },
  }
</script>

<style scoped>

.test{
    align-content: right;
}

</style>