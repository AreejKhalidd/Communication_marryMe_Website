<template>
  <chat-window
    :current-user-id="currentUserId"
    :menu-actions="menuActions"
    @menu-action-handler="menuActionHandler"
    :rooms="rooms"
    :messages="messages"
    @fetch-messages="fetchMessages"
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
      users: [],
      currentUserId: "",
      currentUserName: "",
      currentUserAvatar: "",
      currentUserStatus: "",

      Vip: false,
      CanChat: true,
      type: "image/*",
      AllRoomsAreLoaded: false,
      AllmsgsAreLoaded: false,
      menuActions: [],
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
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk1MDkzNywiZXhwIjoxNjMxOTc5NzM3LCJuYmYiOjE2MzE5NTA5MzcsImp0aSI6InB3VHNzMTE2dE1lYjduQzIiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.r-8KGEbTJ7abT1D0ASEoB_Afslneld13fQlAOyBHRGU"}`,
        },
      }; //temp for testing the request
      axios
        .get("http://127.0.0.1:8000/api/profile", option)
        .then((response) => {
          this.currentUserId = response.data.id;
          this.currentUserName = response.data.name;
          this.currentUserAvatar = response.data.image.includes("http")
            ? response.data.image
            : `http://127.0.0.1:8000${response.data.image}`;
          this.Vip = response.data.VIP == 1 ? true : false;
        });
    },
    Chats() {
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk1MDkzNywiZXhwIjoxNjMxOTc5NzM3LCJuYmYiOjE2MzE5NTA5MzcsImp0aSI6InB3VHNzMTE2dE1lYjduQzIiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.r-8KGEbTJ7abT1D0ASEoB_Afslneld13fQlAOyBHRGU"}`,
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
          let lastMsg = "";
          let userAvatar = "";

          for (let i = 0; i < response.data.length; i++) {
            //console.log(response.data[i].blocker_id);
            userAvatar = response.data[i].image.includes("http")
              ? response.data[i].image
              : `http://127.0.0.1:8000${response.data[i].image}`;
            tempusers.push(
              {
                _id: `${this.currentUserId}`,
                username: `${this.currentUserName}`,
                avatar: `${this.currentUserAvatar}`,
              },
              {
                _id: `${response.data[i].user_id}`,
                username: `${response.data[i].name}`,
                avatar: `${userAvatar}`,
              }
            );

            if (response.data[i].status == 0) {
              sent = true;
              newmsg = true;
            } else if (response.data[i].status == 1) {
              seenmsg = true;
            }
            DateTime = moment(response.data[i].created_at)
              .utc()
              .format("HH:mm D/M/YYYY");
            if (response.data[i].content == "") {
              temprooms.push({
                roomId: `${response.data[i].chat_id}`,
                roomName: `${response.data[i].name}`,
                avatar: `${userAvatar}`,
                unreadCount: "0",
                index: `${response.data[i].created_at}`,
                users: tempusers,
                blockedRoom: response.data[i].block,
                blocker_id: response.data[i].blocker_id,
                block_id: response.data[i].block_id,
              });
              tempusers = [];
            } else {
              lastMsg =
                response.data[i].isImg == 0
                  ? "Photo"
                  : response.data[i].content;

              temprooms.push({
                roomId: `${response.data[i].chat_id}`,
                roomName: `${response.data[i].name}`,
                avatar: `${userAvatar}`,
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
                blockedRoom: response.data[i].block,
                blocker_id: response.data[i].blocker_id,
                block_id: response.data[i].block_id,
              });
              tempusers = [];
            }
          }
          //console.log(temprooms);
          this.rooms = temprooms;
          this.AllRoomsAreLoaded = true;
        });
    },
    blockUser(roomId) {
      let secondUser_id;
      this.rooms.forEach((room) => {
        if (room.roomId == roomId) {
          secondUser_id = room.users[1]._id;
          //console.log(secondUser_id);
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk1MDkzNywiZXhwIjoxNjMxOTc5NzM3LCJuYmYiOjE2MzE5NTA5MzcsImp0aSI6InB3VHNzMTE2dE1lYjduQzIiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.r-8KGEbTJ7abT1D0ASEoB_Afslneld13fQlAOyBHRGU"}`,
            },
          }; //temp for testing the request
          axios.post(
            "http://127.0.0.1:8000/api/blockFriend",
            { reciever_id: secondUser_id },
            option
          );
        }
      });
      //console.log(secondUser_id);
    },
    UnblockUser(roomId){
      let block_id;
      this.rooms.forEach((room) => {
        if (room.roomId == roomId) {
          block_id = room.block_id;
          //console.log(secondUser_id);
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk1MDkzNywiZXhwIjoxNjMxOTc5NzM3LCJuYmYiOjE2MzE5NTA5MzcsImp0aSI6InB3VHNzMTE2dE1lYjduQzIiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.r-8KGEbTJ7abT1D0ASEoB_Afslneld13fQlAOyBHRGU"}`,
            },
            data:{blockId: block_id}
          }; //temp for testing the request
          axios.delete(
            "http://127.0.0.1:8000/api/removeBlock",
            option
            
            
          );
        }
      });
      //console.log(secondUser_id);
    },
    menuActionHandler(data) {
      switch (data.action.name) {
        case "blockaction":
          this.blockUser(data.roomId);
          break;
        case "removeBlock":
          this.UnblockUser(data.roomId);  
          break;
      }
    },
    fetchMessages(data) {
      this.AllmsgsAreLoaded = false;
      console.log(data);
      if (
        data.room.blockedRoom == true &&
        data.room.blocker_id == this.currentUserId
      ) {
        this.menuActions = [{ name: "removeBlock", title: "UnBlock" }];
        this.CanChat = false;
      } else if (data.room.blockedRoom == false) {
        this.CanChat = true;
        this.menuActions = [{ name: "blockaction", title: "Block" }];
      }
      else{
        this.menuActions = [];
        this.CanChat = false;
      }
      // use timeout to imitate async server fetched data
      setTimeout(() => {
        this.messages = [];
        this.AllmsgsAreLoaded = true;
      });
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