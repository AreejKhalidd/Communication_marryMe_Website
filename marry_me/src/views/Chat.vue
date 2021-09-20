<template>
  <chat-window
      :current-user-id="currentUserId"
      :menu-actions="menuActions"
      @menu-action-handler="menuActionHandler"
      :rooms="rooms"
      :rooms-loaded="AllRoomsAreLoaded"
      :load-first-room="false"
      :messages="messages"
      @fetch-messages="fetchMessages"
      :message-actions="[
      { name: 'replyMessage', title: 'Reply' },
      { name: 'deleteAMsg', title: 'Delete Message', onlyMe: true },
      { name: 'ReportAmsg', title: 'Report this message' },
    ]"
      @message-action-handler="msgActionHandler"
      @send-message="sendMsg"
      :messages-loaded="AllmsgsAreLoaded"
      :show-footer="(CanChat && requestApproved && !Vip) || (CanChat && Vip)"
      :show-add-room="false"
      :show-audio="false"
      :show-emojis="false"
      :show-files="Vip"
      :accepted-files="type"
      :link-options="{ disabled: false, target: '_blank' }"
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
      requestApproved: false,
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
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
        },
      }; //temp for testing the request
      axios
          .get("http://127.0.0.1:8000/api/profile", option)
          .then((response) => {
            this.currentUserId = response.data.id;
            this.currentUserName = response.data.name;
            this.currentUserAvatar = "";
            if (response.data.image) {
              this.currentUserAvatar = response.data.image.includes("http")
                  ? response.data.image
                  : `http://127.0.0.1:8000${response.data.image}`;
            }
            this.Vip = response.data.VIP == 1 ? true : false;
          });
    },
    Chats() {
      //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
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
              unreadCount =
                  response.data[i].unreadcount < 1
                      ? ""
                      : response.data[i].unreadcount;
              userAvatar = "";
              if (response.data[i].image) {
                userAvatar = response.data[i].image.includes("http")
                    ? response.data[i].image
                    : `http://127.0.0.1:8000${response.data[i].image}`;
              }
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
                  requestStatus: response.data[i].RequestStatus,
                });
                tempusers = [];
              } else {
                lastMsg =
                    response.data[i].isImg == 1
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
                  requestStatus: response.data[i].RequestStatus,
                });
                tempusers = [];
              }
            }
            this.rooms = temprooms;
            this.AllRoomsAreLoaded = true;
          });
    },
    blockUser(roomId) {
      let secondUser_id;
      this.rooms.forEach((room) => {
        if (room.roomId == roomId) {
          secondUser_id = room.users[1]._id;
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
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
    },
    UnblockUser(roomId) {
      let block_id, blocked_id;
      this.rooms.forEach((room) => {
        if (room.roomId == roomId) {
          block_id = room.block_id;
          blocked_id = room.users[1]._id;
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
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
    deleteMsg(roomId, message) {
      console.log(roomId);
      console.log(message);
    },
    reportAMsg(roomId, message) {
      console.log(roomId);
      console.log(message);
    },
    msgActionHandler(data) {
      console.log(data);
      switch (data.action.name) {
        case "deleteAMsg":
          this.deleteMsg(data.roomId, data.message);
          break;
        case "ReportAmsg":
          this.reportAMsg(data.roomId, data.message);
          break;
      }
    },
    fetchMessages(data) {
      this.requestApproved = false;
      this.AllmsgsAreLoaded = false;
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
      if (data.room.requestStatus == 1) {
        this.requestApproved = true;
      }
      // use timeout to imitate async server fetched data
      setTimeout(() => {
        const tempMsgs = [];
        let date, time, msgImg;
        let sent = false;
        let delivered = false;
        let seenmsg = false;
        let newmsg = false;
        let imgtype;
        //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
        //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
        const option = {
          headers: {
            Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
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
                if (
                    response.data[i].isImg != 1 &&
                    (response.data[i].reply_id != "" ||
                        response.data[i].reply_id != null) &&
                    response.data[i].reply_isImg != 1
                ) {
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
                    replyMessage: {
                      content: response.data[i].reply_content,
                      senderId: response.data[i].reply_sender_id,
                    },
                  });
                } else if (
                    response.data[i].isImg != 1 &&
                    (response.data[i].reply_id != "" ||
                        response.data[i].reply_id != null) &&
                    response.data[i].reply_isImg == 1
                ) {
                  msgImg = "";
                  imgtype = "";
                  if (response.data[i].reply_content) {
                    msgImg = response.data[i].reply_content.includes("http")
                        ? response.data[i].reply_content
                        : `http://127.0.0.1:8000${response.data[i].reply_content}`;
                    imgtype = msgImg.split(".").pop();
                  }
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
                    replyMessage: {
                      content: "",
                      senderId: response.data[i].reply_sender_id,
                      files: [
                        {
                          type: `${imgtype}`,
                          url: `${msgImg}`,
                        },
                      ],
                    },
                  });
                } else if (
                    response.data[i].isImg == 1 &&
                    (response.data[i].reply_id != "" ||
                        response.data[i].reply_id != null) &&
                    response.data[i].reply_isImg != 1
                ) {
                  msgImg = "";
                  imgtype = "";
                  if (response.data[i].content) {
                    msgImg = response.data[i].content.includes("http")
                        ? response.data[i].content
                        : `http://127.0.0.1:8000${response.data[i].content}`;
                    imgtype = msgImg.split(".").pop();
                  }
                  tempMsgs.push({
                    _id: response.data[i].id,
                    content: "",
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
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                    replyMessage: {
                      content: response.data[i].reply_content,
                      senderId: response.data[i].reply_sender_id,
                    },
                  });
                } else {
                  msgImg = "";
                  imgtype = "";
                  let replymsgImg = "";
                  let replyImgtype = "";
                  if (response.data[i].content) {
                    msgImg = response.data[i].content.includes("http")
                        ? response.data[i].content
                        : `http://127.0.0.1:8000${response.data[i].content}`;
                    imgtype = msgImg.split(".").pop();
                  }
                  if (response.data[i].reply_content) {
                    console.log(response.data[i].reply_content);
                    replymsgImg = response.data[i].reply_content.includes("http")
                        ? response.data[i].reply_content
                        : `http://127.0.0.1:8000${response.data[i].reply_content}`;
                    replyImgtype = replymsgImg.split(".").pop();
                  }
                  tempMsgs.push({
                    _id: response.data[i].id,
                    content: "",
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
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                    replyMessage: {
                      content: "",
                      senderId: response.data[i].reply_sender_id,
                      files: [
                        {
                          type: `${replyImgtype}`,
                          url: `${replymsgImg}`,
                        },
                      ],
                    },
                  });
                }
              }
            });
        this.messages = tempMsgs;
        this.AllmsgsAreLoaded = true;
      });
    },
    sendMsg(data) {
      console.log(data);
      if (!data.replyMessage) {
        if (!data.files) {
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
            },
          }; //temp for testing the request
          axios
              .post(
                  "http://127.0.0.1:8000/api/sendmsg",
                  { chat_id: data.roomId, content: data.content },
                  option
              )
              .then((response) => {
                let time = moment(response.data.created_at).utc().format("HH:mm");
                let date = moment(response.data.created_at)
                    .utc()
                    .format("DD MMMM YYYY");
                this.rooms.forEach((room) => {
                  if (room.roomId == data.roomId) {
                    this.messages[this.messages.length] = {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      avatar: this.currentUserAvatar,
                      date: date,
                      timestamp: time,
                      system: false,
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                      disableActions: false,
                      disableReactions: true,
                    };
                    this.messages = [...this.messages];
                  }
                });
              });
        } else {
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
            },
          }; //temp for testing the request
          const fd = new FormData();
          fd.append(
              "image",
              data.files[0].blob,
              data.files[0].name + "." + data.files[0].extension
          );
          fd.append("chat_id", data.roomId);
          axios
              .post("http://127.0.0.1:8000/api/sendpic", fd, option)
              .then((response) => {
                let time = moment(response.data.created_at).utc().format("HH:mm");
                let date = moment(response.data.created_at)
                    .utc()
                    .format("DD MMMM YYYY");
                this.rooms.forEach((room) => {
                  if (room.roomId == data.roomId) {
                    this.messages[this.messages.length] = {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      avatar: this.currentUserAvatar,
                      date: date,
                      timestamp: time,
                      system: false,
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                      disableActions: false,
                      disableReactions: true,
                      files: [
                        {
                          type: `${data.files[0].extension}`,
                          url: `http://127.0.0.1:8000${response.data.imgUrl}`,
                        },
                      ],
                    };
                    this.messages = [...this.messages];
                    console.log(data.files);
                    console.log(data.files);
                  }
                });
              });
        }
      } else {
        if (!data.files && !data.replyMessage.files) {
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
            },
          }; //temp for testing the request
          axios
              .post(
                  "http://127.0.0.1:8000/api/sendmsg",
                  { chat_id: data.roomId, content: data.content ,replymsg:data.replyMessage._id},
                  option
              )
              .then((response) => {
                let time = moment(response.data.created_at).utc().format("HH:mm");
                let date = moment(response.data.created_at)
                    .utc()
                    .format("DD MMMM YYYY");
                this.rooms.forEach((room) => {
                  if (room.roomId == data.roomId) {
                    this.messages[this.messages.length] = {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      avatar: this.currentUserAvatar,
                      date: date,
                      timestamp: time,
                      system: false,
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                      disableActions: false,
                      disableReactions: true,
                      replyMessage: {
                        content: data.replyMessage.content,
                        senderId: data.replyMessage.senderId,
                      },
                    };
                    this.messages = [...this.messages];
                  }
                });
              });
        }
        else if(!data.files && data.replyMessage.files){
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
            },
          }; //temp for testing the request
          axios
              .post(
                  "http://127.0.0.1:8000/api/sendmsg",
                  { chat_id: data.roomId, content: data.content ,replymsg:data.replyMessage._id},
                  option
              )
              .then((response) => {
                let time = moment(response.data.created_at).utc().format("HH:mm");
                let date = moment(response.data.created_at)
                    .utc()
                    .format("DD MMMM YYYY");
                this.rooms.forEach((room) => {
                  if (room.roomId == data.roomId) {
                    this.messages[this.messages.length] = {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      avatar: this.currentUserAvatar,
                      date: date,
                      timestamp: time,
                      system: false,
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                      disableActions: false,
                      disableReactions: true,
                      replyMessage: {
                        content: "",
                        senderId: data.replyMessage.senderId,
                        files: [
                          {
                            type: `${data.replyMessage.files[0].type}`,
                            url: `${data.replyMessage.files[0].url}`,
                          },
                        ],
                      },
                    };
                    this.messages = [...this.messages];
                    data.replyMessage.files = [];
                    data.replyMessage.files.length = 0;
                  }
                });
              });
        } else if(data.files && !data.replyMessage.files){
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
            },
          }; //temp for testing the request
          const fd = new FormData();
          fd.append(
              "image",
              data.files[0].blob,
              data.files[0].name + "." + data.files[0].extension
          );
          fd.append("chat_id", data.roomId);
          fd.append("replymsg", data.replyMessage._id);
          axios
              .post("http://127.0.0.1:8000/api/sendpic", fd, option)
              .then((response) => {
                let time = moment(response.data.created_at).utc().format("HH:mm");
                let date = moment(response.data.created_at)
                    .utc()
                    .format("DD MMMM YYYY");
                this.rooms.forEach((room) => {
                  if (room.roomId == data.roomId) {
                    this.messages[this.messages.length] = {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      avatar: this.currentUserAvatar,
                      date: date,
                      timestamp: time,
                      system: false,
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                      disableActions: false,
                      disableReactions: true,
                      files: [
                        {
                          type: `${data.files[0].extension}`,
                          url: `http://127.0.0.1:8000${response.data.imgUrl}`,
                        },
                      ],
                      replyMessage: {
                        content: data.replyMessage.content,
                        senderId: data.replyMessage.senderId,
                      },
                    };
                    this.messages = [...this.messages];
                    console.log(data.files);
                    console.log(data.files);
                  }
                });
              });
        }
        else {
          //if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          //const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          const option = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjE1MjgyMywiZXhwIjoxNjMyMTgxNjIzLCJuYmYiOjE2MzIxNTI4MjMsImp0aSI6IlZWM01ZUjl6WVhoOG45N2oiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nzq-kFZ0AjIVpx5OfLqv11ldWHK28ywEiCW2ZRIdciE"}`,
            },
          }; //temp for testing the request
          const fd = new FormData();
          fd.append(
              "image",
              data.files[0].blob,
              data.files[0].name + "." + data.files[0].extension
          );
          fd.append("chat_id", data.roomId);
          fd.append("replymsg", data.replyMessage._id);
          axios
              .post("http://127.0.0.1:8000/api/sendpic", fd, option)
              .then((response) => {
                let time = moment(response.data.created_at).utc().format("HH:mm");
                let date = moment(response.data.created_at)
                    .utc()
                    .format("DD MMMM YYYY");
                this.rooms.forEach((room) => {
                  if (room.roomId == data.roomId) {
                    this.messages[this.messages.length] = {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      avatar: this.currentUserAvatar,
                      date: date,
                      timestamp: time,
                      system: false,
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                      disableActions: false,
                      disableReactions: true,
                      files: [
                        {
                          type: `${data.files[0].extension}`,
                          url: `http://127.0.0.1:8000${response.data.imgUrl}`,
                        },
                      ],
                      replyMessage: {
                        content: "",
                        senderId: data.replyMessage.senderId,
                        files: [
                          {
                            type: `${data.replyMessage.files[0].type}`,
                            url: `${data.replyMessage.files[0].url}`,
                          },
                        ],
                      },
                    };
                    this.messages = [...this.messages];
                    console.log(data.files);
                    console.log(data.files);
                  }
                });
              });
        }
      }
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
  background: #ffaaab !important;
  color: #000000;
}
.vac-message-wrapper .vac-message-card {
  text-align: end;
}
.vac-message-wrapper .vac-text-timestamp {
  text-align: left;
  color: #000000;
}
.vac-message-wrapper .vac-icon-check {
  height: 18px;
  width: 18px;
}
.vac-message-wrapper .vac-card-date {
  background: #d8d8d8;
}
.vac-message-actions-wrapper .vac-options-me {
  background: #ffaaab;
}
.vac-message-actions-wrapper .vac-message-options svg {
  height: 25px;
  width: 25px;
}
.vac-message-actions-wrapper .vac-blur-container {
  left: 60px;
}
.vac-message-wrapper .vac-message-image {
  background-color: #ffffff !important;
}
.vac-card-window .vac-chat-container {
  text-align: left;
}
</style>