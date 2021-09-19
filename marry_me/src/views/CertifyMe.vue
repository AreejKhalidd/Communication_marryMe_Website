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
                    v-model="file"
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
          <v-btn @click="Validate" rounded outlined color="#FF6265">
            قم بارسال طلب لتصديق حسابي
          </v-btn>
          <br><br/>
          <h6 v-if="boolean"> ...تم ارسال الطلب بنجاح </h6>
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
        file:'',
        files:null,
       certifyMsg:'',
       boolean: false
   }
  },
  methods: {
      certifyme(){
          const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjA3OTU5MywiZXhwIjoxNjMyMTA4MzkzLCJuYmYiOjE2MzIwNzk1OTMsImp0aSI6InRPc3NTUjZzU0RVWjU4SkUiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.TpjIO5us9-5-lcKgJ2hefFcniCHRYEGnk0hDoeSSOes");
                axios({
                method: 'post',
                url: "http://127.0.0.1:8000/api/certified",
                headers: {Authorization: token},
                data: {image :this.file}
                }).then(response => {
                this.certifyMsg=response.data.message;
                this.boolean=!this.boolean;
                console.log(this.file);
                    })
                            .catch((error) => {
                            console.log('There is error:'+error);
                            alert(error)
                            return "error occoured"
                    });

      },
      submitFiles() {
         const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjA3OTU5MywiZXhwIjoxNjMyMTA4MzkzLCJuYmYiOjE2MzIwNzk1OTMsImp0aSI6InRPc3NTUjZzU0RVWjU4SkUiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.TpjIO5us9-5-lcKgJ2hefFcniCHRYEGnk0hDoeSSOes");
          if (this.files) {
              let formData = new FormData();
              for (let file of this.files) {
                  formData.append("files", file, file.name);
                  console.log(file);
              }
              axios
                  .post("http://127.0.0.1:8000/api/certified", formData,{headers: {
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data`,
                  'Authorization': token
                   }
                })
                  .then(response => {
                      console.log("Success!");
                      console.log({ response });
                      console.log(...formData );
                  })
                  .catch(error => {
                      console.log({ error });
                  });
          } else {
              console.log("there are no files.");
          }
      },
       Validate() {
      if (this.$refs.form) {
        const fd = new FormData();
        fd.append('image', this.file);
        const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjA3OTU5MywiZXhwIjoxNjMyMTA4MzkzLCJuYmYiOjE2MzIwNzk1OTMsImp0aSI6InRPc3NTUjZzU0RVWjU4SkUiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.TpjIO5us9-5-lcKgJ2hefFcniCHRYEGnk0hDoeSSOes'}`,'Content-Type': 'multipart/form-data' } };//temp for testing the request
        axios.post('http://127.0.0.1:8000/api/certified', fd, option)
          .then((response) => {
            console.log(response.data.message);
          })
          .catch(() => {
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
