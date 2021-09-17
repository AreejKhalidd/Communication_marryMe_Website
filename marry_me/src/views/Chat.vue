<template>
  <chat-window
    :current-user-id="currentUserId"
    :menu-actions="[{ name: 'blockaction', title: 'Block' }]"
    :rooms="rooms"
    :room-actions="[{ name: 'blockaction', title: 'Block' }]"
    :messages="messages"
    :message-actions="[{ name: 'ReportAmsg', title: 'Report this message' }]"
    :messageActions="[
      { name: 'replyMessage', title: 'Reply' },
      { name: 'deleteMessage', title: 'Delete Message', onlyMe: true },
    ]"
    :rooms-loaded="AllRoomsAreLoaded"
    :load-first-room="false"
    :messages-loaded="AllmsgsAreLoaded"
    :show-footer="CanChat"
    :show-add-room="false"
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
//import Echo from 'laravel-echo';

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [],

      messages: [],
      users:[],
      currentUserId: "",
      currentUserName: "",
      currentUserAvatar: "",
      currentUserStatus: "",

      Vip: false,
      CanChat: true,
      type: "image/*",
      AllRoomsAreLoaded: false,
      AllmsgsAreLoaded: false,
      OurTheme: {
        general: {
          borderStyle: "1px solid #ff6265",
        },
        icons: {
          search: "#ff6265",
          paperclip: "#ff6265",
          emoji: "#ff6265",
          send: "#ff6265",
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
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTkwOTgyMSwiZXhwIjoxNjMxOTM4NjIxLCJuYmYiOjE2MzE5MDk4MjEsImp0aSI6IldYN1l2U0I2ZXF3c2RQQU0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.A0UtKNA74ACNPslg0No-7li7b7ezjdTwoAIEktfn_G0"}`,
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
    },
    Chats() {
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTkwOTgyMSwiZXhwIjoxNjMxOTM4NjIxLCJuYmYiOjE2MzE5MDk4MjEsImp0aSI6IldYN1l2U0I2ZXF3c2RQQU0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.A0UtKNA74ACNPslg0No-7li7b7ezjdTwoAIEktfn_G0"}`,
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
          let lastMsg="";

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
            DateTime = moment(response.data[i].created_at).format(
              "D/M/YYYY H:mm A"
            );
            if (response.data[i].status == 0) {
              sent = true;
              newmsg = true;
            } else if (response.data[i].status == 1) {
              seenmsg = true;
            }
            if(response.data[i].isImg==0){
              lastMsg="Photo";
            }
            else{
              lastMsg=response.data[i].content;
            }
            
            temprooms.push({
              roomId: `${response.data[i].chat_id}`,
              roomName: `${response.data[i].name}`,
              avatar: `http://127.0.0.1:8000${response.data[i].image}`,
              unreadCount: `${response.data[i].unreadcount}`,
              index: `${response.data[i].created_at}`,
              lastMessage: {
                content: `${lastMsg}`,
                senderId: `${response.data[i].sender_id}`,
                username: `${response.data[i].sender_name}`,
                timestamp: `${DateTime}`,
                saved: sent,
                distributed: delivered,
                seen: seenmsg,
                new: newmsg,
              },
              users: tempusers,
            });
            tempusers = [];
          }
          //console.log(users);
          this.rooms = temprooms;
          this.AllRoomsAreLoaded = true;
        });
    },
    blockUser({roomId}){
      let index=this.rooms.indexOf(roomId, 0);
      let SecondUser=this.rooms[index].users[1];
      console.log(SecondUser);
    },
    menuActionHandler() {
      //switch (action.name) {
        //case "blockaction":
            console.log('hiiiii');
            //this.blockUser(roomId);
      //}
    },
  },
  created() {
    this.getUserInfo();
    this.Chats();
    //Echo.join('MessageSent').here(user=>{console.log(user);}).joining(user=>{console.log(user);}).leaving(user=>{console.log(user);});
  },
  /*mounted(){
    Echo.channel('chat').listen('.MessageSent',(user)=>{console.log(user);});
  }*/
};
</script>
<style lang="scss">
.vac-room-container .vac-room-badge {
  background-color: #ff6265;
}
</style>