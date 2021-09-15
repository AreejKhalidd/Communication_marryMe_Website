<template>
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
                    ref="myfile"
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
          <v-btn @click="submitFiles" rounded outlined color="#FF6265">
            تصديق حسابي
          </v-btn>
          <h6> {{this.certifyMsg}} </h6>
          </v-row>
        </v-form>
        <br/>
        <br/>
      </v-col>
    </v-row>
        
  </v-main>
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
        file:[],
        files:null,
       certifyMsg:'',
   }
  },
  methods: {
      certifyme(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTcxNTY4OCwiZXhwIjoxNjMxNzE5Mjg4LCJuYmYiOjE2MzE3MTU2ODgsImp0aSI6IlhFODI3R09sVE00RUpMOFAiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.HhMionzoAqE-kKrGB3pKCw0wN97cP7oxbabGVwSkFlQ");
                axios({
                method: 'post',
                url: "http://127.0.0.1:8000/api/certified",
                headers: {Authorization: token},
                data: {imagee :this.file}
                }).then(response => {
                this.certifyMsg=response.data.message;
                console.log(this.file);
                    })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            alert(error)
                            return "error occoured"
                    });

      },
      submitFiles() {
          if (this.files) {
              let formData = new FormData();
              for (let file of this.files) {
                  formData.append("files", file, file.name);
              }
              formData.append("test", "foo bar");
              axios
                  .post("http://127.0.0.1:8000/api/certified", formData)
                  .then(response => {
                      console.log("Success!");
                      console.log({ response });
                  })
                  .catch(error => {
                      console.log({ error });
                  });
          } else {
              console.log("there are no files.");
          }
      }
      
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
