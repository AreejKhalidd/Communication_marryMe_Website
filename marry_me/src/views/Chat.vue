<template>
  <chat-window
    :current-user-id="currentUserId"
    :menu-actions="menuActions"
    @menu-action-handler="menuActionHandler"
    :rooms="rooms"
    :rooms-loaded="AllRoomsAreLoaded"
    :load-first-room="false"
    :room-info-enabled="true"
    @room-info="roomInfoHandler"
    :messages="messages"
    @fetch-messages="fetchMessages"
    :message-actions="messageActions"
    @message-action-handler="msgActionHandler"
    @send-message="sendMsg"
    :messages-loaded="AllmsgsAreLoaded"
    :show-footer="
      (CanChat && requestApproved && !Vip) ||
      (CanChat && Vip && canSendMoreThan4Msgs) ||
      (CanChat && msgRecievedFromVIP && !Vip)
    "
    :show-add-room="true"
    @add-room="addNewRoom"
    :show-audio="false"
    :show-emojis="false"
    :show-files="Vip"
    :accepted-files="type"
    :link-options="{ disabled: false, target: '_blank' }"
    :styles="OurTheme"
    :text-messages="{
      ROOMS_EMPTY: 'لا توجد غرف دردشة',
      ROOM_EMPTY: 'لا توجد غرفة مختارة',
      NEW_MESSAGES: 'الرسائل الجديدة',
      MESSAGE_DELETED: 'تم حذف هذه الرسالة',
      MESSAGES_EMPTY: 'لا توجد رسائل',
      CONVERSATION_STARTED: 'بدأت المحادثة في: ',
      TYPE_MESSAGE: 'اكتب رسالتك هنا',
      SEARCH: 'بحث',
      IS_ONLINE: 'متصل',
      LAST_SEEN: ' آخر اتصال',
      IS_TYPING: 'يكتب',
    }"
  >
    <template #eye-icon> <span></span> </template>
    <template #document-icon> <span></span> </template>
  </chat-window>
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
      users: [],
      currentUserId: "",
      currentUserName: "",
      currentUserAvatar: "",
      currentUserStatus: "",
      messageActions: [
        { name: "replyMessage", title: "الرد على هذه الرسالة" },
        { name: "ReportAmsg", title: "أبلغ عن هذه الرسالة" },
      ],
      Vip: false,
      requestApproved: false,
      CanChat: true,
      canSendMoreThan4Msgs: true,
      msgRecievedFromVIP: false,
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
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      }; //waiting for the login to be finished to store the access token
      /*const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
        },
      }; */
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
          if (this.Vip == true) {
            this.messageActions = [
              { name: "replyMessage", title: "الرد على هذه الرسالة" },
              { name: "deleteAMsg", title: "حذف الرسالة", onlyMe: true },
              { name: "ReportAmsg", title: "أبلغ عن هذه الرسالة" },
            ];
          }
        })
        .catch((error) => {
          if (
            error.response.data.message == "Not all the questions are answered"
          ) {
            this.$router.push("questions");
          } else {
            this.$router.push("Login");
          }
        });
    },
    roomInfoHandler(room) {
      this.$router.push({
        name: "Userinfo",
        params: { id: room.users[1]._id },
      });
    },
    addNewRoom() {
      this.$router.push("HomePage");
    },
    Chats() {
      if (localStorage.getItem("usertoken") === null) this.$router.push("/");
      const option = {
        headers: {
          Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
        },
      }; //waiting for the login to be finished to store the access token
      /*const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
        },
      }; */
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
            if (response.data[i].content === "") {
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
                response.data[i].isImg == 1 &&
                (!response.data[i].content ||
                  response.data[i].content.length < 0)
                  ? "Photo"
                  : response.data[i].content;

              temprooms.push({
                roomId: `${response.data[i].chat_id}`,
                roomName: `${response.data[i].name}`,
                avatar: `${userAvatar}`,
                unreadCount: `${unreadCount}`,
                index: `${response.data[i].created_at}`,
                lastMessage: {
                  _id: response.data[i].msg_id,
                  content: `${lastMsg}`,
                  senderId: `${response.data[i].sender_id}`,
                  username: `${response.data[i].sender_name}`,
                  timestamp: `${DateTime}`,
                  saved: sent,
                  distributed: delivered,
                  seen: seenmsg,
                  new: newmsg,
                  deleted: response.data[i].isDeleted,
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
          if (localStorage.getItem("usertoken") === null)
            this.$router.push("/");
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
            },
          }; //waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
          }; */
          axios.post(
            "http://127.0.0.1:8000/api/blockFriend",
            { reciever_id: secondUser_id },
            option
          );
          this.menuActions = [{ name: "removeBlock", title: "رفع الحظر" }];
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
          if (localStorage.getItem("usertoken") === null)
            this.$router.push("/");
          const option = {
            headers: {
              Authorization: `${"Bearer"} ${localStorage.getItem("usertoken")}`,
            },
            data: {
              blockId: block_id,
              blockerId: this.currentUserId,
              blockedId: blocked_id,
            },
          }; //waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
            data: {
              blockId: block_id,
              blockerId: this.currentUserId,
              blockedId: blocked_id,
            },
          }; //temp for testing the request*/
          axios.delete("http://127.0.0.1:8000/api/removeBlock", option);
          this.CanChat = true;
          this.menuActions = [{ name: "blockaction", title: "حظر" }];
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
      if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      /*const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
        },
      }; //temp for testing the request*/
      axios.delete(
        `${"http://127.0.0.1:8000/api/deletemsg/"}${message._id}`,
        option
      );
      let i = 0;
      this.messages.forEach((msg) => {
        if (msg._id == message._id) {
          this.messages[i].deleted = true;
          this.messages = [...this.messages];
          let j = 0;
          this.rooms.forEach((room) => {
            if (room.roomId == roomId) {
              if (this.messages[i]._id == room.lastMessage._id) {
                //if msg deleted is the last msg update the last msg
                this.rooms[j].lastMessage.deleted = true;
                this.rooms = [...this.rooms];
              }
            }

            j++;
          });
        }
        i++;
      });
    },
    reportAMsg(roomId, message) {
      console.log(roomId);
      console.log(message);
      if (localStorage.getItem('usertoken') === null) this.$router.push('/');
      const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
      /*const option = {
        headers: {
          Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
        },
      }; //temp for testing the request*/
      axios.post(
        "http://127.0.0.1:8000/api/report",
        { message_id: message._id },
        option
      );
    },
    msgActionHandler(data) {
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
      this.msgRecievedFromVIP = false;
      this.requestApproved = false;
      this.AllmsgsAreLoaded = false;
      this.canSendMoreThan4Msgs = true;
      this.CanChat = false;
      if (
        data.room.blockedRoom == true &&
        data.room.blocker_id == this.currentUserId
      ) {
        this.menuActions = [{ name: "removeBlock", title: "رفع الحظر" }];
        this.CanChat = false;
      } else if (data.room.blockedRoom == false) {
        this.CanChat = true;
        this.menuActions = [{ name: "blockaction", title: "حظر" }];
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
        let date, time;
        let sent = false;
        let delivered = false;
        let seenmsg = false;
        let newmsg = false;
        if (localStorage.getItem('usertoken') === null) this.$router.push('/');
        const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
        /*const option = {
          headers: {
            Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
          },
        }; //temp for testing the request*/
        /*axios
            .post(
              "http://127.0.0.1:8000/api/readmsg",
              { chat_id: data.room.roomId, time: },
              option
            ).then((response)=>{

            });*/
        axios
          .get(
            `http://127.0.0.1:8000/api/fetchmsgs/${data.room.roomId}`,
            option
          )
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].sender_id != this.currentUserId) {
                this.msgRecievedFromVIP = true;
                break;
              }
            }
            if (response.data.length == 4) {
              let i;
              for (i = 0; i < response.data.length; i++) {
                if (response.data[i].sender_id != this.currentUserId) {
                  console.log(response.data[i].sender_id, this.currentUserId);
                  break;
                }
                console.log(i);
              }
              if (i == 4) {
                this.canSendMoreThan4Msgs = false;
              }
            }
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

              if (response.data[i].replyMsg != null) {
                //with reply msg

                let temReplyMsg = {};

                if (response.data[i].reply_isImg != 1) {
                  //reply msg not an image
                  temReplyMsg = {
                    content: response.data[i].reply_content,
                    senderId: response.data[i].reply_sender_id,
                  };
                } else {
                  let replyContent =
                    response.data[i].reply_content != null
                      ? response.data[i].reply_content
                      : "";
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].reply_img_url.includes("http")
                    ? response.data[i].reply_img_url
                    : `http://127.0.0.1:8000${response.data[i].reply_img_url}`;
                  imgtype = msgImg.split(".").pop();

                  temReplyMsg = {
                    content: replyContent,
                    senderId: response.data[i].reply_sender_id,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                  };
                }
                if (response.data[i].isImg != 1) {
                  //msg with content with reply

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
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    replyMessage: temReplyMsg,
                  });
                } else if (
                  response.data[i].content != null &&
                  response.data[i].isImg == 1
                ) {
                  //msg with content and image with a reply
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].img_url.includes("http")
                    ? response.data[i].img_url
                    : `http://127.0.0.1:8000${response.data[i].img_url}`;
                  imgtype = msgImg.split(".").pop();

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
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                    replyMessage: temReplyMsg,
                  });
                } else {
                  //msg with image with a reply
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].img_url.includes("http")
                    ? response.data[i].img_url
                    : `http://127.0.0.1:8000${response.data[i].img_url}`;
                  imgtype = msgImg.split(".").pop();

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
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                    replyMessage: temReplyMsg,
                  });
                }
              } //with no reply msg
              else {
                if (response.data[i].isImg != 1) {
                  //msg with content without reply
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
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                  });
                } else if (
                  response.data[i].content != null &&
                  response.data[i].isImg == 1
                ) {
                  //msg with content and image without a reply
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].img_url.includes("http")
                    ? response.data[i].img_url
                    : `http://127.0.0.1:8000${response.data[i].img_url}`;
                  imgtype = msgImg.split(".").pop();

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
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                  });
                } else {
                  //msg with image without a reply
                  let msgImg = "";
                  let imgtype = "";

                  msgImg = response.data[i].img_url.includes("http")
                    ? response.data[i].img_url
                    : `http://127.0.0.1:8000${response.data[i].img_url}`;
                  imgtype = msgImg.split(".").pop();

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
                    deleted: response.data[i].isDeleted,
                    disableActions: false,
                    disableReactions: true,
                    files: [
                      {
                        type: `${imgtype}`,
                        url: `${msgImg}`,
                      },
                    ],
                  });
                }
              }
            }
          });
        this.messages = tempMsgs;
        this.AllmsgsAreLoaded = true;
      });
    },
    sendMsg(data) {
      let time, date;
      
      if (!data.replyMessage) {
        //no reply msg
        if (!data.files) {
          if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
          }; //temp for testing the request*/
          axios
            .post(
              "http://127.0.0.1:8000/api/sendmsg",
              { chat_id: data.roomId, content: data.content },
              option
            )
            .then((response) => {
              time = moment(response.data.created_at).utc().format("HH:mm");
              date = moment(response.data.created_at)
                .utc()
                .format("DD MMMM YYYY");
              let i = 0;
              this.rooms.forEach((room) => {
                if (room.roomId == data.roomId) {
                  window.Echo.channel(`chat.${data.roomId}`).listen(
                  "MessageSent",
                  () => {
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
                  this.rooms[i] = {
                    roomId: room.roomId,
                    roomName: room.roomName,
                    avatar: room.avatar,
                    unreadCount: "",
                    index: `${response.data.created_at}`,
                    users: room.users,
                    blockedRoom: room.blockedRoom,
                    blocker_id: room.blocker_id,
                    block_id: room.block_id,
                    requestStatus: room.requestStatus,
                    lastMessage: {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      timestamp: moment(response.data.created_at)
                        .utc()
                        .format("HH:mm D/M/YYYY"),
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                    },
                  };
                  this.rooms = [...this.rooms];

                  });
          
          
        
                  
                }
                i++;
                
              }
              
              );
              
            });
            
        } else {
          if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          const option = { headers: { "Content-Type": "multipart/form-data", Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
          }; //temp for testing the request*/
          const fd = new FormData();
          let lastMsgContent =
            data.content != null && data.content.length > 0
              ? data.content
              : "Photo";
          if (data.content != null && data.content.length > 0) {
            fd.append(
              "image",
              data.files[0].blob,
              data.files[0].name + "." + data.files[0].extension
            );
            fd.append("chat_id", data.roomId);
            fd.append("content", data.content);
          } else {
            fd.append(
              "image",
              data.files[0].blob,
              data.files[0].name + "." + data.files[0].extension
            );
            fd.append("chat_id", data.roomId);
          }
          axios
            .post("http://127.0.0.1:8000/api/sendpic", fd, option)
            .then((response) => {
              time = moment(response.data.created_at).utc().format("HH:mm");
              date = moment(response.data.created_at)
                .utc()
                .format("DD MMMM YYYY");
              let i = 0;
              this.rooms.forEach((room) => {
                if (room.roomId == data.roomId) {
                  let msgContent =
                    data.content != null && data.content.length > 0
                      ? data.content
                      : "";

                  this.messages[this.messages.length] = {
                    _id: response.data.msg_id,
                    content: msgContent,
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
                  this.rooms[i] = {
                    roomId: room.roomId,
                    roomName: room.roomName,
                    avatar: room.avatar,
                    unreadCount: "",
                    index: `${response.data.created_at}`,
                    users: room.users,
                    blockedRoom: room.blockedRoom,
                    blocker_id: room.blocker_id,
                    block_id: room.block_id,
                    requestStatus: room.requestStatus,
                    lastMessage: {
                      _id: response.data.msg_id,
                      content: lastMsgContent,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      timestamp: moment(response.data.created_at)
                        .utc()
                        .format("HH:mm D/M/YYYY"),
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                    },
                  };
                  this.rooms = [...this.rooms];
                }
                i++;
              });
            });
        }
      } else {
        if (!data.files && !data.replyMessage.files) {
          if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
          }; //temp for testing the request*/
          axios
            .post(
              "http://127.0.0.1:8000/api/sendmsg",
              {
                chat_id: data.roomId,
                content: data.content,
                replymsg: data.replyMessage._id,
              },
              option
            )
            .then((response) => {
              time = moment(response.data.created_at).utc().format("HH:mm");
              date = moment(response.data.created_at)
                .utc()
                .format("DD MMMM YYYY");
              let i = 0;
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
                  this.rooms[i] = {
                    roomId: room.roomId,
                    roomName: room.roomName,
                    avatar: room.avatar,
                    unreadCount: "",
                    index: `${response.data.created_at}`,
                    users: room.users,
                    blockedRoom: room.blockedRoom,
                    blocker_id: room.blocker_id,
                    block_id: room.block_id,
                    requestStatus: room.requestStatus,
                    lastMessage: {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      timestamp: moment(response.data.created_at)
                        .utc()
                        .format("HH:mm D/M/YYYY"),
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                    },
                  };
                  this.rooms = [...this.rooms];
                }
                i++;
              });
            });
        } else if (!data.files && data.replyMessage.files) {
          if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          const option = { headers: { Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
          }; //temp for testing the request*/
          axios
            .post(
              "http://127.0.0.1:8000/api/sendmsg",
              {
                chat_id: data.roomId,
                content: data.content,
                replymsg: data.replyMessage._id,
              },
              option
            )
            .then((response) => {
              time = moment(response.data.created_at).utc().format("HH:mm");
              date = moment(response.data.created_at)
                .utc()
                .format("DD MMMM YYYY");
              let i = 0;
              this.rooms.forEach((room) => {
                if (room.roomId == data.roomId) {
                  let tempReplyMsg = {};
                  let replyMsgContent =
                    data.replyMessage.content.length > 0
                      ? data.replyMessage.content
                      : "";

                  tempReplyMsg = {
                    content: replyMsgContent,
                    senderId: data.replyMessage.senderId,
                    files: [
                      {
                        type: `${data.replyMessage.files[0].type}`,
                        url: `${data.replyMessage.files[0].url}`,
                      },
                    ],
                  };

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
                    replyMessage: tempReplyMsg,
                  };
                  this.messages = [...this.messages];
                  //data.replyMessage.files = [];
                  //data.replyMessage.files.length = 0;
                  this.rooms[i] = {
                    roomId: room.roomId,
                    roomName: room.roomName,
                    avatar: room.avatar,
                    unreadCount: "",
                    index: `${response.data.created_at}`,
                    users: room.users,
                    blockedRoom: room.blockedRoom,
                    blocker_id: room.blocker_id,
                    block_id: room.block_id,
                    requestStatus: room.requestStatus,
                    lastMessage: {
                      _id: response.data.msg_id,
                      content: data.content,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      timestamp: moment(response.data.created_at)
                        .utc()
                        .format("HH:mm D/M/YYYY"),
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                    },
                  };
                  this.rooms = [...this.rooms];
                }
                i++;
              });
            });
        } else if (data.files && !data.replyMessage.files) {
          if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          const option = { headers: { "Content-Type": "multipart/form-data", Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
          }; //temp for testing the request*/
          const fd = new FormData();
          fd.append(
            "image",
            data.files[0].blob,
            data.files[0].name + "." + data.files[0].extension
          );
          fd.append("chat_id", data.roomId);
          fd.append("replymsg", data.replyMessage._id);

          if (data.content != null && data.content.length > 0) {
            fd.append("content", data.content);
          }
          axios
            .post("http://127.0.0.1:8000/api/sendpic", fd, option)
            .then((response) => {
              time = moment(response.data.created_at).utc().format("HH:mm");
              date = moment(response.data.created_at)
                .utc()
                .format("DD MMMM YYYY");
              let i = 0;
              this.rooms.forEach((room) => {
                if (room.roomId == data.roomId) {
                  let msgContent =
                    data.content != null && data.content.length > 0
                      ? data.content
                      : "";
                  this.messages[this.messages.length] = {
                    _id: response.data.msg_id,
                    content: msgContent,
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
                  let lastMsgContent =
                    data.content != null && data.content.length > 0
                      ? data.content
                      : "Photo";
                  this.rooms[i] = {
                    roomId: room.roomId,
                    roomName: room.roomName,
                    avatar: room.avatar,
                    unreadCount: "",
                    index: `${response.data.created_at}`,
                    users: room.users,
                    blockedRoom: room.blockedRoom,
                    blocker_id: room.blocker_id,
                    block_id: room.block_id,
                    requestStatus: room.requestStatus,
                    lastMessage: {
                      _id: response.data.msg_id,
                      content: lastMsgContent,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      timestamp: moment(response.data.created_at)
                        .utc()
                        .format("HH:mm D/M/YYYY"),
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                    },
                  };
                  this.rooms = [...this.rooms];
                }
                i++;
              });
            });
        } else {
          if (localStorage.getItem('usertoken') === null) this.$router.push('/');
          const option = { headers: { "Content-Type": "multipart/form-data", Authorization: `${'Bearer'} ${localStorage.getItem('usertoken')}` } };//waiting for the login to be finished to store the access token
          /*const option = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${"Bearer"} ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzA5MTI1MCwiZXhwIjoxNjMzNTAxNjUwLCJuYmYiOjE2MzMwOTEyNTAsImp0aSI6ImtCbVoyQTI3d2dUYUVHZTUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.y5eoB01Bibcm1a4MbRWYcMG2wqrO4g1eoFORRcKHDEg"}`,
            },
          }; //temp for testing the request*/
          const fd = new FormData();
          let tempReplyMsg = {};
          let replyMsgContent =
            data.replyMessage.content.length > 0
              ? data.replyMessage.content
              : "";
          tempReplyMsg = {
            content: replyMsgContent,
            senderId: data.replyMessage.senderId,
            files: [
              {
                type: `${data.replyMessage.files[0].type}`,
                url: `${data.replyMessage.files[0].url}`,
              },
            ],
          };

          fd.append(
            "image",
            data.files[0].blob,
            data.files[0].name + "." + data.files[0].extension
          );
          fd.append("chat_id", data.roomId);
          fd.append("replymsg", data.replyMessage._id);

          if (data.content != null && data.content.length > 0) {
            fd.append("content", data.content);
          }
          axios
            .post("http://127.0.0.1:8000/api/sendpic", fd, option)
            .then((response) => {
              time = moment(response.data.created_at).utc().format("HH:mm");
              date = moment(response.data.created_at)
                .utc()
                .format("DD MMMM YYYY");
              let i = 0;
              this.rooms.forEach((room) => {
                if (room.roomId == data.roomId) {
                  let msgContent =
                    data.content != null && data.content.length > 0
                      ? data.content
                      : "";
                  this.messages[this.messages.length] = {
                    _id: response.data.msg_id,
                    content: msgContent,
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
                    replyMessage: tempReplyMsg,
                  };

                  this.messages = [...this.messages];
                  let lastMsgContent =
                    data.content != null && data.content.length > 0
                      ? data.content
                      : "Photo";
                  this.rooms[i] = {
                    roomId: room.roomId,
                    roomName: room.roomName,
                    avatar: room.avatar,
                    unreadCount: "",
                    index: `${response.data.created_at}`,
                    users: room.users,
                    blockedRoom: room.blockedRoom,
                    blocker_id: room.blocker_id,
                    block_id: room.block_id,
                    requestStatus: room.requestStatus,
                    lastMessage: {
                      _id: response.data.msg_id,
                      content: lastMsgContent,
                      senderId: this.currentUserId,
                      username: this.currentUserName,
                      timestamp: moment(response.data.created_at)
                        .utc()
                        .format("HH:mm D/M/YYYY"),
                      saved: true,
                      distributed: false,
                      seen: false,
                      new: true,
                      deleted: false,
                    },
                  };
                  this.rooms = [...this.rooms];
                }
                i++;
              });
            });
        }
      }
    },
  },
  created() {
    moment.locale("ar");
    this.getUserInfo();
    this.Chats();
    
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
.vac-textarea {
  direction: rtl;
}
.vac-box-search .vac-icon-search {
  left: auto;
  right: 70px;
}
.vac-box-search .vac-input {
  direction: rtl;
  padding: 10px 40px 10px 10px;
}
.vac-box-search .vac-add-icon {
  margin-left: auto;
  padding-left: 10px;
}
.vac-room-container .vac-text-date {
  margin-left: auto;
  direction: ltr;
  margin-right: 5px;
  font-size: 13px;
  text-align: left;
}
.vac-message-wrapper .vac-icon-deleted {
  margin: 2px 0 -2px 2px;
  float: right;
}
.vac-format-message-wrapper .vac-icon-deleted {
  margin: 2px 0 -2px 2px;
  float: right;
}
.vac-format-message-wrapper .vac-format-container {
  display: inline-grid;
}
</style>