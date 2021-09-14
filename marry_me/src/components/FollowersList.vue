<template>
  <v-card :id="id" style="background-color: white;margin:15px;direction: rtl" class="mx-auto">

    <v-list   class="list-style" three-line>
      <template>

        <v-list-item style="max-width: 1300px">
          <v-list-item-avatar style="width: 80px;height: 70px;border-radius: 50%">
            <v-img :src="img"></v-img>
          </v-list-item-avatar>

          <v-list-item-content style="text-align: right;margin: 0 50px 0 20px">
            <v-list-item-title style="font-weight: bolder;font-size: 25px">الأسم : {{ name }}</v-list-item-title>
            <v-list-item-subtitle style="font-weight: bolder;font-size: 17px">العمر : {{ age }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>

export default {
  data() {
    return {
      dialog: false,
    }
  },
  name: "FollowersList",
  props: ["name", "age", "id", "img"]
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
<style>
body {
  background-color: #EEE !important;
}
</style>