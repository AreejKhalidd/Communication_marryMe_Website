<template>
  <div>
    <v-list-item  to="/">
      <v-icon
          large
          color="#FE6265FF"
      >
        mdi-home
      </v-icon>
      <span class="link" >القائمة الرئيسية</span>
    </v-list-item>

    <v-list-item to="my_profile">
      <v-icon
          large
          color="#FE6265FF"
      >
        mdi-account
      </v-icon>
      <span class="link" >الصفحة الشخصية</span>
    </v-list-item>
    <v-list-item to="my_profile">
      <v-icon
          large
          color="#FE6265FF"
      >
        mdi-lock
      </v-icon>
      <span class="link" >قائمة المعجبين بي</span>
    </v-list-item>
    <v-list-item to="my_profile">
      <v-icon
          large
          color="#FE6265FF"
      >
        mdi-lock
      </v-icon>
      <span class="link" > قائمة المعجب بهم</span>

    </v-list-item>
    <v-list-item to="my_profile">
      <v-icon
          large
          color="#FE6265FF"
      >

        mdi-lock
      </v-icon>
      <span class="link" >قائمة المحظورين</span>

    </v-list-item>
  </div>

</template>

<script>
export default {
  name: "SlideBar"
}
</script>

<style scoped>
.link{
  font-size:16px;
  font-weight:bolder;
  text-align:center;
  position:relative;
  height:40px;
  line-height:40px;
  margin-top:7px;
  overflow:hidden;
  margin-left: 30px;
  cursor:pointer;
  color: #EEEEEE;
}
.link:after{
  content: '';
  position:absolute;
  border-bottom:1px solid rgba(255, 255, 255, 0.5);
  bottom:50%;
  transition-delay:  0.5s;
  transition: all 0.5s;
}

</style>