<template>
  <div  class="text-center">
    <v-alert
        text
        prominent

        type="error"
        icon="mdi-cloud-alert"
        style="direction: rtl;padding-left: 50px;background-color: rgba(254,116,119,0.98) !important;color: #EEEEEE!important;"
    >
     {{msg}}
    </v-alert>
    <v-btn v-if="flag" depressed style="background-color: #0062cc;color: #EEEEEE" @click="redirect()">
      {{buttMess}}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "EmptyPage",
  props:["msg","flag","buttMess","red"],
  methods:{
    redirect(){
      this.$router.push({ name:  this.red})
    }
  }
}
</script>

<style scoped>

</style>
