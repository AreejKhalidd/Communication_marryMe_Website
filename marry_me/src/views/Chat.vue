<template>
  <chat-window
    :current-user-id="currentUserId"
    :rooms="rooms"
    :messages="messages"
    :rooms-loaded="AllRoomsAreLoaded"
    :messages-loaded="AllmsgsAreLoaded"
    :show-add-room="false"
    :show-search="false"
    :show-audio="false"
    :show-files="Vip"
    :accepted-files="type"
    :link-options="{ disabled: true, target: '_self' }"
    :styles="OurTheme"
  />
</template>

<script>
import axios from "axios";
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import moment from "moment";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [],

      messages: [],

      currentUserId: "",
      currentUserName: "",
      currentUserAvatar: "",
      currentUserStatus: "",

      Vip: false,
      type: "image/*",
      AllRoomsAreLoaded: false,
      AllmsgsAreLoaded: false,
      OurTheme: {
        general: {
          color: "#FF6265",
        },
      },
    };
  },
  methods: {
    getUserInfo() {
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTg2ODg2MCwiZXhwIjoxNjMxODk3NjYwLCJuYmYiOjE2MzE4Njg4NjAsImp0aSI6IktpMkh2ZmVtc3BYYWN3TEEiLCJzdWIiOjQsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.u9HB6NZeQY8q1eLyC7EMpAG783c4gZxScUH9x0aNwUI"}`,
        },
      }; //temp for testing the request
      axios
        .get("http://127.0.0.1:8000/api/profile", option)
        .then((response) => {
          this.currentUserId = response.data.id;
          this.currentUserName = response.data.name;
          this.currentUserAvatar = response.data.image;
          if (response.data.VIP == 1) {
            this.Vip = true;
          }
          if (response.data.online == 1) {
            this.currentUserStatus = "online";
          } else {
            this.currentUserStatus = "offline";
          }
        });
      this.AllRoomsAreLoaded = true;
    },
    Chats() {
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTg2ODg2MCwiZXhwIjoxNjMxODk3NjYwLCJuYmYiOjE2MzE4Njg4NjAsImp0aSI6IktpMkh2ZmVtc3BYYWN3TEEiLCJzdWIiOjQsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.u9HB6NZeQY8q1eLyC7EMpAG783c4gZxScUH9x0aNwUI"}`,
        },
      }; //temp for testing the request
      axios
        .get("http://127.0.0.1:8000/api/listallchats", option)
        .then((response) => {
          const temprooms = [];
          let tempusers = [];
          let DateTime = "";
          let sent = false;
          let delivered = false;
          let seenmsg = false;
          let newmsg = false;

          for (let i = 0; i < response.data.length; i++) {
            tempusers.push(
              {
                _id: `${this.currentUserId}`,
                username: `${this.currentUserName}`,
                avatar: `http://127.0.0.1:8000${this.currentUserAvatar}`,
              },
              {
                _id: `${response.data[i].user_id}`,
                username: `${response.data[i].name}`,
                avatar: `http://127.0.0.1:8000${response.data[i].image}`,
              }
            );
            DateTime = moment(response.data[i].created_at).format("D/M/YYYY H:mm A");
            if (response.data[i].status == 0) {
              sent=true;
              delivered=true;//temp to be handle in backend
              newmsg=true;
            }
            else if(response.data[i].status == 1){
              seenmsg=true;
            }
            //to be updated with the last msg timestamp to put it as index for the chats to be sorted
            temprooms.push({
              roomId: `${response.data[i].chat_id}`,
              roomName: `${response.data[i].name}`,
              avatar: `http://127.0.0.1:8000${response.data[i].image}`,
              unreadCount: `${response.data[i].unreadcount}`,
              index: `${response.data[i].created_at}`,
              lastMessage: {
                content: `${response.data[i].content}`,
                senderId: `${response.data[i].sender_id}`,
                username: `${response.data[i].sender_name}`,
                timestamp: `${DateTime}`,
                saved:sent,
                distributed:delivered,
                seen:seenmsg,
                new:newmsg,
              },
              users: tempusers,
            });
            tempusers = [];
            //tempseen=false;
          }
          //console.log(users);
          this.rooms = temprooms;
        });
    },
  },
  created() {
    this.getUserInfo();
    this.Chats();
  },
};
</script>