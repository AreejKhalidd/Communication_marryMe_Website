<template>
  <v-app>
  <v-main id="certifyme">
    <Navbar/>
    <Sidebar/>
    <v-row>
      <v-col cols="12" id="Black">
        <br />
        <br />
        <h1 class="text-center">تصديق حسابي</h1>
        <br />
        <v-form ref="form" id="form" >
          <v-row>
            <h5 class="text-center">...قم برفع صور تتضمن معلومات تريد تصديقها</h5>
            <br>
                    <v-file-input 
                    v-model="files"
                    accept="image/*"
                    prepend-icon="mdi-camera-plus"
                    color="#FF6265"
                    multiple
                    ></v-file-input>
          </v-row>
          <v-divider id="Grey" dark></v-divider>
          <br />
          <v-row>
          <v-spacer></v-spacer>
          <v-btn @click="Validate" rounded outlined color="#FF6265">
            قم بارسال طلب لتصديق حسابي
          </v-btn>
          <br><br/>
          <v-alert
              v-show="this.boolean"
              color="#ff6265"
              dark
              type="success"
            >
            ...تم ارسال الطلب بنجاح 
          </v-alert>
          </v-row>
        </v-form>
        <br/>
        <br/>
      </v-col>
    </v-row>
        
  </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
    components: {
    Navbar,
    Sidebar,
   },
  data() {
   return {
       files:[],
       boolean: false
   }
  },
  methods: {                  
       Validate() {
          if (this.$refs.form.validate()) {
            const fd = new FormData();
            for (let file of this.files) {
                    fd.append("image[]", file);
            }
            const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjI1ODI5NCwiZXhwIjoxNjMyNDg4Njk0LCJuYmYiOjE2MzIyNTgyOTQsImp0aSI6Imc2VnR1TG42UFNVbGlFYVkiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.X2FBWU2iydp-agPiFxVKsTF30bCMmSuBP-e_T4sLDWo'}`,'Content-Type': 'multipart/form-data' } };//temp for testing the request
            axios.post('http://127.0.0.1:8000/api/certified', fd, option)
              .then((response) => {
                console.log(response.data.message);
                this.boolean = true;
              })
              .catch(() => {
                console.log("error occured");
              });
          }
      },
      
  },
};
</script>
<style lang="scss">
#certifyme {
  background-color: #ffffff;
}

#Black {
  color: #000000;
}
#Grey {
  color: #979797;
}
#form {
  color: #ff6265;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

</style>
