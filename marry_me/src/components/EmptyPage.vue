<template>
  <div  class="text-center">
    <v-alert
        text
        prominent
        type="error"
        icon="mdi-cloud-alert"
        style="direction: rtl"
    >
      لا يوجد اي طلبات أرسلتها أو طلبات أرسلت إليك حتي الأن.
    </v-alert>
    <v-btn
        depressed
        color="primary"
        @click="redirect()"
    >
      إرسال طلبات
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "EmptyPage",
  methods:{
    redirect(){
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>

</style>