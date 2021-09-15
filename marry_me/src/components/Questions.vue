<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
        color = "red"
      >
        الخطوة الأولة
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
        color = "red"
      >
        الخطوة الثانية
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        step="3"
        color = "red">
        الخطوة الثالثة  
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="white"
          height="0px"
        ></v-card>

        
        <div class="steps">
            <v-text-field
                width="300px"
                label="السؤال الاول"
            ></v-text-field>
            <v-text-field 
               label="السؤال الثاني">
             </v-text-field>
             <v-text-field 
                label="السؤال الثالث">
            </v-text-field>
        </div>

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
        <v-card
          class="mb-12"
          color="white"
          height="0px"
        >
        </v-card>
        
        <div class="steps">
            <v-text-field
                width="300px"
                label="السؤال الرابع"
            ></v-text-field>
            <v-text-field 
               label="السؤال الخامس">
             </v-text-field>
             <v-text-field 
                label="السؤال السادس">
            </v-text-field>
        </div>

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
        <v-card
          class="mb-12"
          color="white"
          height="0px"
        ></v-card>

        <div class="steps">
            <v-text-field
                width="300px"
                label="السؤال السابع"
            ></v-text-field>
            <v-text-field 
               label="السؤال الثامن">
             </v-text-field>
             <v-text-field 
                label="السؤال التاسع">
            </v-text-field>
        </div>


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