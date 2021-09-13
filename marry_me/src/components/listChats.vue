<template>
  <v-card max-width="700" class="mx-auto  overflow-hidden">
    
    <v-app-bar color="white" class="font-weight-bold">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-tab></v-tab>
      <v-badge color="red" :content=this.msgs>Recent Chat</v-badge>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary >
      <v-list nav dense >
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4" >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-list three-line>
      <template v-for="item in items">
        <v-divider :key="item.id" :inset="inset"></v-divider>

        <v-list-item :key="item.id">
          <v-list-item-avatar>
            <v-img :src="item[0].image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="font-weight-black">
            <v-list-item-title >
              <router-link  style="text-decoration: none; color: inherit;" :to="`/Chat2/${item[0].id}/${item[0].name}`">{{item[0].name}}</router-link>
            </v-list-item-title>
          </v-list-item-content>

          <v-tab class="mx-auto">
                  <v-badge color="red" :content=1></v-badge>
          </v-tab>
        <v-btn x-small class="ma-2" color="pink" dark>
           Block
          <v-icon dark right>
            mdi-cancel
          </v-icon>
        </v-btn>

        </v-list-item>
      </template>
    </v-list>
    <v-spacer></v-spacer>
    <br><br><br>
  </v-card>
  
</template>

<script>
 import axios from 'axios';
  export default {
    data(){
            return{
               divider: true, inset: true ,
                items:[],
                item:{
                    id:'',
                    name:  '',
                    image:   '',
                }, 
                msgs:''   ,
                 drawer: false,
      group: null,
            }
  },
  watch: {
      group () {
        this.drawer = false
      },
    },
  mounted(){
     this.getChats();
     this.numofmsgs();
  },
  methods:{
      getChats(){
           axios.get('http://localhost:8000/api/listallchats')
           .then((response) => {
          this.items = response.data;
         
        });
        console.log(this.item[0]);
      },
      numofmsgs()
      {
        axios.get('http://localhost:8000/api/numofmsgs')
           .then((response) => {
          this.msgs = response.data;
           });
      },
  }
  }
</script>