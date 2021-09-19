<template> 
  <chat-window
    :current-user-id="currentUserId"
    :menu-actions="menuActions"
    @menu-action-handler="menuActionHandler"
    :rooms="rooms"
    :messages="messages"
    @fetch-messages="fetchMessages"
    :messageActions="[
      { name: 'replyMessage', title: 'Reply' },
      { name: 'deleteMessage', title: 'Delete Message', onlyMe: true },
      { name: 'ReportAmsg', title: 'Report this message'},
    ]"
    :rooms-loaded="AllRoomsAreLoaded"
    :load-first-room="false"
    :messages-loaded="AllmsgsAreLoaded"
    :show-footer="CanChat"
    :show-add-room="false"
    :show-audio="false"
    :show-emojis="false"
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
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk5NDc4NywiZXhwIjoxNjMyMDIzNTg3LCJuYmYiOjE2MzE5OTQ3ODcsImp0aSI6Im1DUWdUR0FybENEWjA5U2UiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.xwDWSJj9seoWW2er1WInRZ7e8ZUQ5i4ofAHRcSwUVCE"}`,
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
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk5NDc4NywiZXhwIjoxNjMyMDIzNTg3LCJuYmYiOjE2MzE5OTQ3ODcsImp0aSI6Im1DUWdUR0FybENEWjA5U2UiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.xwDWSJj9seoWW2er1WInRZ7e8ZUQ5i4ofAHRcSwUVCE"}`,
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
          let unreadCount;

          for (let i = 0; i < response.data.length; i++) {
            //console.log(response.data[i].blocker_id);
            unreadCount=response.data[i].unreadcount<1?"":response.data[i].unreadcount;
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
              seenmsg = false;
              newmsg = true;
            } else if (response.data[i].status == 1) {
              sent = true;
              seenmsg = true;
              newmsg = false;
            }
            DateTime = moment(response.data[i].created_at)
              .utc()
              .format("HH:mm D/M/YYYY");
            if (response.data[i].content == "") {
              temprooms.push({
                roomId: `${response.data[i].chat_id}`,
                roomName: `${response.data[i].name}`,
                avatar: `${userAvatar}`,
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
                unreadCount: `${unreadCount}`,
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
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk5NDc4NywiZXhwIjoxNjMyMDIzNTg3LCJuYmYiOjE2MzE5OTQ3ODcsImp0aSI6Im1DUWdUR0FybENEWjA5U2UiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.xwDWSJj9seoWW2er1WInRZ7e8ZUQ5i4ofAHRcSwUVCE"}`,
            },
          }; //temp for testing the request
          axios.post(
            "http://127.0.0.1:8000/api/blockFriend",
            { reciever_id: secondUser_id },
            option
          );
          this.menuActions = [{ name: "removeBlock", title: "UnBlock" }];
          this.CanChat = false;
        }
      });
      //console.log(secondUser_id);
    },
    UnblockUser(roomId) {
      let block_id, blocked_id;
      this.rooms.forEach((room) => {
        if (room.roomId == roomId) {
          block_id = room.block_id;
          blocked_id = room.users[1]._id;
          //console.log(secondUser_id);
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk5NDc4NywiZXhwIjoxNjMyMDIzNTg3LCJuYmYiOjE2MzE5OTQ3ODcsImp0aSI6Im1DUWdUR0FybENEWjA5U2UiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.xwDWSJj9seoWW2er1WInRZ7e8ZUQ5i4ofAHRcSwUVCE"}`,
            },
            data: {
              blockId: block_id,
              blockerId: this.currentUserId,
              blockedId: blocked_id,
            },
          }; //temp for testing the request
          axios.delete("http://127.0.0.1:8000/api/removeBlock", option);
          this.CanChat = true;
          this.menuActions = [{ name: "blockaction", title: "Block" }];
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
      } else {
        this.menuActions = [];
        this.CanChat = false;
      }
      // use timeout to imitate async server fetched data
      setTimeout(() => {
        const tempMsgs = [];
        let date, time,msgImg;
        let sent = false;
        let delivered = false;
        let seenmsg = false;
        let newmsg = false;
        let imgtype;
        //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
        //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
        const option = {
          headers: {
            Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTk5NDc4NywiZXhwIjoxNjMyMDIzNTg3LCJuYmYiOjE2MzE5OTQ3ODcsImp0aSI6Im1DUWdUR0FybENEWjA5U2UiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.xwDWSJj9seoWW2er1WInRZ7e8ZUQ5i4ofAHRcSwUVCE"}`,
          },
        }; //temp for testing the request
        axios
          .get(
            `http://127.0.0.1:8000/api/fetchmsgs/${data.room.roomId}`,
            option
          )
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              time = moment(response.data[i].created_at).utc().format("HH:mm");
              date = moment(response.data[i].created_at)
                .utc()
                .format("DD MMMM YYYY");
              if (response.data[i].status == 0) {
                sent = true;
                seenmsg = false;
                newmsg = true;
              } else if (response.data[i].status == 1) {
                sent = true;
                seenmsg = true;
                newmsg = false;
              }
              if (response.data[i].isImg != 0) {
                tempMsgs.push({
                  _id: response.data[i].id,
                  content: response.data[i].content,
                  senderId: response.data[i].sender_id,
                  username: response.data[i].sender_name,
                  avatar: data.room.avatar,
                  date: date,
                  timestamp: time,
                  system: false,
                  saved: sent,
                  distributed: delivered,
                  seen: seenmsg,
                  new: newmsg,
                  deleted: false,
                  disableActions: false,
                  disableReactions: true,
                });
              }
              else{
                msgImg = response.data[i].content.includes("http")
              ? response.data[i].content
              : `http://127.0.0.1:8000${response.data[i].content}`;
                imgtype = msgImg.split('.').pop();
                //console.log(imgtype);
                tempMsgs.push({
                  _id: response.data[i].id,
                  content:"",
                  senderId: response.data[i].sender_id,
                  username: response.data[i].sender_name,
                  avatar: data.room.avatar,
                  date: date,
                  timestamp: time,
                  system: false,
                  saved: sent,
                  distributed: delivered,
                  seen: seenmsg,
                  new: newmsg,
                  deleted: false,
                  disableActions: false,
                  disableReactions: true,
                  files:[{
                    type: `${imgtype}`,
                    url:`${msgImg}`
                  }]

                });

              }
            }
          });
        this.messages = tempMsgs;
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
.vac-message-wrapper .vac-line-new {
  color: #ff6265;
}
.vac-message-wrapper .vac-line-new:before {
  border-top: 1px solid #ff6265;
}
.vac-message-wrapper .vac-line-new:after {
  border-top: 1px solid #ff6265;
}
.vac-message-wrapper .vac-message-current {
  box-shadow: 0 1px 1px -1px #ffffff, 0 1px 1px -1px #ffffff,
    0 1px 2px -1px #ffffff;
  background: #ff6265 !important;
  color:#ffffff;
  
}
.vac-message-wrapper .vac-message-card{
  text-align: end;
}
.vac-message-wrapper .vac-text-timestamp {
    text-align: left;
    color:#4a4a4a;
}
.vac-message-wrapper .vac-card-date {
  background: #d8d8d8;
}
.vac-message-actions-wrapper .vac-options-me {
  background: #ff6265;
}
.vac-message-actions-wrapper .vac-message-options svg {
    height: 25px;
    width: 25px;
}
.vac-message-actions-wrapper .vac-blur-container {
    left: 60px; 
}
.vac-message-wrapper .vac-message-image {
    background-color: #ffffff!important; 
    
}
.vac-card-window .vac-chat-container {
    text-align: left;
}

</style>