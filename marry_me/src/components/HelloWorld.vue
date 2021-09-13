<template>

<v-bottom-navigation >
  <v-row justify="space-around">
    <v-btn  icon  to="/listChats">
    <span >
        <v-icon large >mdi-email</v-icon>
        </span>
    </v-btn>
  </v-row>
</v-bottom-navigation>  
</template>

<script>
  export default {
    name: 'HelloWorld',
  }
</script>
