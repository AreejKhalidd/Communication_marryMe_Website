<template>
  <v-main id="content">
    <v-app-bar app color="#979797"></v-app-bar>
    <v-row>
      <v-col cols="12" id="Black">
        <br />
        <br />
        <h1 class="text-center">My Profile</h1>

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
            Remove My Profile Picture
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
          label="Phone Number"
              color="#FF6265"
              :rules="[rules.number, rules.required]"
        ></v-text-field>

            <v-text-field
              v-model="BirthDay"
              label="Birth Day"
              style="width:200px"
              color="#FF6265"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="Gender"
              label="Gender"
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
          label="Number Of Reports on you"
          color="#FF6265"
          disabled
        ></v-text-field>
            <v-text-field
              v-model="NumberOfBans"
              label="Number Of Bans"
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
          <v-btn v-if="vip" @click="HideData" rounded outlined color="#FF6265">
            Hide My Data To Others
          </v-btn>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn @click="SaveChanges" rounded outlined color="#FF6265">
            Update Profile
          </v-btn>
          <v-btn @click="DeleteAccount" rounded outlined color="#FF6265">
            Delete My Account
          </v-btn>
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
export default {
  data() {
    return {
      avatarurl: null,
      url: SignupAvatar,
      file: '',
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
      const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYwNDkzMSwiZXhwIjoxNjMxNjMzNzMxLCJuYmYiOjE2MzE2MDQ5MzEsImp0aSI6InB1SmhmdFNBaFBvM29MemQiLCJzdWIiOjQsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.0A_iCOmx98Nx7F5wdzDLBoe3oV0vRQj8fANUrepJMIw'}` } };//temp for testing the request
      axios.get('http://127.0.0.1:8000/api/profile', option)
        .then((response) => {
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
    DeleteAccount(){
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      const option = { headers: { Authorization: `${'Bearer'} ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTYwNjA2OSwiZXhwIjoxNjMxNjM0ODY5LCJuYmYiOjE2MzE2MDYwNjksImp0aSI6ImV3aFVyUFZXRFozNkdnOUEiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.wMLHAZDqCQk8iJ-ByIVHMQlMfk8k5GU7S2u0Lx6qXVQ'}` } };//temp for testing the request
      axios.delete('http://127.0.0.1:8000/api/delete', option)
        .then((response) => {
          this.DeleteMsg=response.data.message;
          this.$router.push('/');//should redirect to login page
        });

    },
  },
  created() {
    this.getUserInfo();
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
