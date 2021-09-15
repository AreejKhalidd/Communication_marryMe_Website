<template>
  <v-main id="content">
    <Navbar/>
    <Sidebar/>
    <v-row>
      <v-col cols="12" id="Black">
        <br />
        <br />
        <h1 class="text-center">حسابي الشخصي</h1>

        <br />
        <v-form ref="form" id="form" >
          <v-row>
            <v-img
              id="avatar"
              class="preview"
              rounded
              :src="useravatar"
              max-height="200"
              max-width="200"
            >
            </v-img>
            <v-file-input
              @change="previewImage"
              hide-input
              v-model="file"
              accept="image/*"
              prepend-icon="mdi-camera-plus"
              color="#FF6265"
            ></v-file-input>
          </v-row>
          <br />
          <br />
          <v-btn @click="RemoveAvatar" rounded outlined style="width: 230px" color="#FF6265" small>
            ازالة صورة الملف الشخصي
          </v-btn>

          <br />
          <br />
          <v-divider id="Grey" dark></v-divider>
          <br />
          <v-row>
          <h3 id="Black">
            {{ Name }}
          </h3>
          <v-icon v-if="Certified" color="#FF6265">mdi-check-circle</v-icon>
          </v-row>
          <br />
          <h3 id="Grey">
            {{ Email }}
          </h3>
          <br />
          <br />
        <v-row>
        <v-text-field
          v-model="PhoneNumber"
          style="width:200px"
          label="رقم الموبايل"
              color="#FF6265"
              :rules="[rules.number, rules.required]"
        ></v-text-field>

            <v-text-field
              v-model="BirthDay"
              label="تاريخ الميلاد"
              style="width:200px"
              color="#FF6265"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="Gender"
              label="النوع"
              style="width:200px"
              color="#FF6265"
              disabled
            ></v-text-field>
            </v-row>
            <br />
            <v-row>
        <v-text-field
          v-model="NumberOfReports"
          style="width:200px"
          label="عدد مرات الابلاغ"
          color="#FF6265"
          disabled
        ></v-text-field>
            <v-text-field
              v-model="NumberOfBans"
              label="عدد مرات الحظر"
              style="width:200px"
              color="#FF6265"
              disabled
            ></v-text-field>
            </v-row>
            <br />
          <br />
          <v-divider id="Grey" dark></v-divider>
          <br />
          <v-row>
          <h3 id="Black">
            الاسئله  
          </h3>
          <h5  color="#ff6265">
            بامكانك اخفاء سؤال واحد فقط  
          </h5>
          <v-card width="700" class="mx-auto ">
            <v-list two-line>
              <template v-for="i in Info.length">
                <v-divider :key="i" ></v-divider>
                <v-list-item :key="i">
                    <v-list-item-content >
                      <v-list-item-title>{{Info[i-1][0][0].question}}</v-list-item-title>
                      <v-list-item-subtitle>{{Info[i-1][1][0].answer}}</v-list-item-subtitle>
                      <br><br/>
                      <div>
                      <v-btn v-if="vip" @click="HideData(Info[i-1][0][0].id)" rounded outlined color="#FF6265" style="width: 130px">
                        اخفاء السؤال 
                      </v-btn>
                      <v-btn @click="HideData" rounded outlined color="#FF6265" style="width: 130px">
                        تعديل الاجابه 
                      </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
              </template>  
            </v-list>
          </v-card>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <div>
            <br><br/>
            <v-btn  rounded outlined color="#FF6265" style="width: 230px">
              تحديث البروفايل
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <br/>
            <v-btn @click="DeleteAccount" rounded outlined color="#FF6265" style="width: 230px">
             حذف الاكونت
            </v-btn>
            <v-btn v-if="!vip" rounded outlined color="#FF6265" style="width: 230px">
               VIP التحديث الي 
            </v-btn>
          </div>
          </v-row>
        </v-form>
        <br />
          <br />
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from 'axios';
import SignupAvatar from "../assets/UserDefaultAvatar.png";
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
   components: {
    Navbar,
    Sidebar,
   },
  data() {
    return {
      avatarurl: null,
      url: SignupAvatar,
      file: '',
      ID:'',
      Name: "",
      Email: "",
      PhoneNumber: "",
      BirthDay: "",
      Gender: "",
      NumberOfReports:"",
      NumberOfBans:"",
      Certified:"",
      vip:"",
      CurrentlyBanned:"",
      DeleteMsg:"",
      rules: {
        required: (value) => !!value || "Required.",
        number: (value) => this.IsaNumber(value) || "Not a Valid Number",
      },
      Questions:[],
      Answers:[],
      Info:[]
    };
  },
  methods: {
    
    previewImage() {
      this.url = URL.createObjectURL(this.file);
    },
    RemoveAvatar() {
      this.file = SignupAvatar;
      this.url=SignupAvatar;
    },
    
    IsaNumber(value) {
      const phoneno = /^\d{11}$/;
      if (value.match(phoneno)) {
        return true;
      }
      return false;
    },
    getUserInfo() {
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTc0MzkxOSwiZXhwIjoxNjMxNzQ3NTE5LCJuYmYiOjE2MzE3NDM5MTksImp0aSI6InVZa3FpSXk2bFJYbkN0am0iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.rqfcunIBg1kRaIl8I-k8Tw9G9Uxe5QzkZ4RM1XS38nI'}` } };//temp for testing the request
      axios.get('http://127.0.0.1:8000/api/profile', option)
        .then((response) => {
          this.ID = response.data.id;
          this.Name = response.data.name;
          this.Email = response.data.email;
          this.PhoneNumber = response.data.phone;
          this.BirthDay = response.data.birth_day;
          this.Gender = response.data.gender;
          this.avatarurl = response.data.image;
          this.NumberOfReports = response.data.reports;
          this.NumberOfBans = response.data.ban_count;
          this.Certified=response.data.certified;
          this.vip=response.data.VIP;
          
        });
    },
    getUserQA() {
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
     const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTc0MzkxOSwiZXhwIjoxNjMxNzQ3NTE5LCJuYmYiOjE2MzE3NDM5MTksImp0aSI6InVZa3FpSXk2bFJYbkN0am0iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.rqfcunIBg1kRaIl8I-k8Tw9G9Uxe5QzkZ4RM1XS38nI'}` } };//temp for testing the request
      axios.get('http://127.0.0.1:8000/api/show-user', option)
        .then((response) => {
          this.Info = response.data;
          console.log(this.Info.length);
        });
    },
    DeleteAccount(){
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTczNzM0NywiZXhwIjoxNjMxNzQwOTQ3LCJuYmYiOjE2MzE3MzczNDcsImp0aSI6Ilo4eldhYVY1cXIwNW1NeEUiLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.9ahhIRn-zmCTgnTvyfsBfADxkENSvoWW24zpPq4Tt8M'}` } };//temp for testing the request
      axios.delete('http://127.0.0.1:8000/api/delete', option)
        .then((response) => {
          this.DeleteMsg=response.data.message;
          this.$router.push('/');//should redirect to login page
        });

    },
    HideData(id){
       const token = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTc0MzkxOSwiZXhwIjoxNjMxNzQ3NTE5LCJuYmYiOjE2MzE3NDM5MTksImp0aSI6InVZa3FpSXk2bFJYbkN0am0iLCJzdWIiOjExLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.rqfcunIBg1kRaIl8I-k8Tw9G9Uxe5QzkZ4RM1XS38nI");
       axios({
       method: 'get',
       url: "http://127.0.0.1:8000/api/hide",
       headers: {Authorization: token},
       params: {question_id :id}
       }).then(response => {
       this.Info = response.data;
       console.log(this.Info);
       })
       .catch((error) => {
       console.log('There is error:'+error);
       });
    }
  },
  created() {
    this.getUserInfo();
    this.getUserQA();
  },
  computed: {
    useravatar() {
      if (this.avatarurl) return `http://127.0.0.1:8000${this.avatarurl}`;
      return this.url;
    },
  },
};
</script>
<style lang="scss">
#content {
  background-color: #ffffff;
}

#Black {
  color: #000000;
}
#Grey {
  color: #979797;
}
#avatar {
  border-radius: 50%;
  border: solid 2px #ff6265;
  max-width: 200px;
  max-height: 200px;
}

#form {
  color: #ff6265;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}


.preview {
  background-color: #ffffff;
  max-width: 100%;
  max-height: 100%;
}
</style>
