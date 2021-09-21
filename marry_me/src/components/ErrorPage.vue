<template>
  <div  class="text-center">
    <v-alert
             text
             prominent
             type="error"
             icon="mdi-cloud-alert"
             style="direction: rtl"
    >
      لقد انتهت مدة صلاحيتك للتصفح داخل الموقع يرجي تسجيل الدخول  مرة اخري.
    </v-alert>
    <v-btn
        depressed
        color="primary"
        @click="redirect()"
    >
      نسجيل الدخول
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  data() {
    return {
      dialog: false,
    }
  },
  methods:{
    redirect(){
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>

</style>