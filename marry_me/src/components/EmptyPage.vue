<template>
  <div  class="text-center">
    <v-alert
        text
        prominent
        type="error"
        icon="mdi-cloud-alert"
        style="direction: rtl;padding-left: 50px"

    >
     {{msg}}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "EmptyPage",
  props:["msg"],
  methods:{
    redirect(){
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>

</style>
