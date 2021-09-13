<template>
  <v-main id="content">
    <v-app-bar app color="#979797"></v-app-bar>
      <v-row justify="center" class="mb-5">
        <v-col
          cols="12"
          class="text-h1 text-center font-weight-bold"
          id="MarryMe"
        >
        <br />
        <br />
          My Profile
          <br />
          <v-form ref="form">
            <!--<v-img
              id="avatar"
              class="preview"
              rounded
              :src="useravatar"
              max-height="200"
              max-width="200"
            >
            </v-img>
            <br />
            <v-btn
              @click="RemoveAvatar"
              rounded
              color="#FF6265"
              small
              style="width: 300px"
            >
              Remove My Profile Picture
            </v-btn>-->
            <br />
            <br />
            <v-text-field
              v-model="Name"
              label="Name"
              prepend-inner-icon="mdi-account"
              color="#FF6265"
              :rules="[rules.required, rules.Namelength]"
              outlined
              disabled
            ></v-text-field>
            <v-text-field
                    v-model="Email"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                    color="#FF6265"
                    outlined
                    disabled
                ></v-text-field>
            <v-text-field
                    v-model="PhoneNumber"
                    label="Phone Number"
                    prepend-inner-icon="mdi-phone"
                    color="#FF6265"
                    :rules="[rules.number, rules.required]"
                    outlined
                ></v-text-field>  
            <v-text-field
                    v-model="BirthDay"
                    label="Birth Day"
                    prepend-inner-icon="mdi-cake"
                    color="#FF6265"
                    outlined
                    disabled
                ></v-text-field>
            <v-text-field
                    v-model="Gender"
                    label="Gender"
                    prepend-inner-icon="mdi-gender-male-female"
                    color="#FF6265"
                    outlined
                    disabled
                ></v-text-field> 
            <v-btn
              @click="SaveChanges"
              rounded
              color="#FF6265"
              small
              style="width: 300px"
            >
              Save Changes
            </v-btn>           
          </v-form>
        </v-col>
      </v-row>
  </v-main>
</template>

<script>
//import axios from 'axios';
import SignupAvatar from "../assets/logo.png";
export default {
  data() {
    return {
      avatarurl: null,
      url: SignupAvatar,
      Name: '',
      Email: '',
      PhoneNumber: '',
      BirthDay:'',
      Gender:'',
      rules: {
        required: (value) => !!value || 'Required.',
        Namelength: (value) => (value.length >= 3 && value.length <= 64) || 'Min 3 characters and Max 64 characters',
        number: (value) => this.IsaNumber(value) || 'Not a Valid Number',
      },
    };
  },
  methods: {
    previewImage() {
      this.url = URL.createObjectURL(this.file);
    },
    RemoveAvatar() {
      this.avatarurl = SignupAvatar;
    },
  },
  computed: {
    useravatar() {
      return this.url;
    },
  },
};
</script>
<style lang="scss">
#content {
  background-color: #ffffffde;
}

#MarryMe {
  color: #FF6265;
}
#avatar {
  border-radius: 50%;
  border: solid 2px #FF6265;
  max-width: 200px;
  max-height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.preview {
  background-color: #ffffffde;
  max-width: 100%;
  max-height: 100%;
}
</style>
