<template>
<div>
	<Chat 
        :participants="participants"
        :myself="myself"
        :messages="messages"
        :chat-title="chatTitle"
        :placeholder="placeholder"
        :colors="colors"
        :border-style="borderStyle"
        :hide-close-button="hideCloseButton"
        :close-button-icon-size="closeButtonIconSize"
        :submit-icon-size="submitIconSize"
        :link-options="linkOptions"
        :async-mode="asyncMode"
        :scroll-bottom="scrollBottom"
        :display-header="true"
        :send-images="true"
        :profile-picture-config="profilePictureConfig"
        :timestamp-config="timestampConfig"
        @onImageClicked="onImageClicked"
        @onImageSelected="onImageSelected"
        @onMessageSubmit="onMessageSubmit"
    
        @onClose="onClose">
        <template v-slot:header>
          <div>
            <p class="custom-title">{{userName}}</p>
          </div>
        </template>
        </Chat>
</div>
</template>
<script>
import axios from 'axios';
import  {Chat}  from "vue-quick-chat";
import 'vue-quick-chat/dist/vue-quick-chat.css';
export default {
    components: {
        Chat
    },
    data() {
        return {
            visible: true,
            userID: this.$route.params.id,
            userName:this.$route.params.name,
            userImg:this.$route.params.image,
            participants: [
                {
                    name: this.userName,
                    id: this.userID,
                    profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
                }
            ],
            myself: {
                
            },
            messages: [],
            chatTitle: 'My chat title',
            placeholder: 'Write Message...',
            colors: {
                header: {
                    bg: 'grey',
                    text: '#fff'
                },
                message: {
                    myself: {
                        bg: 'white',
                        text: 'black'
                    },
                    others: {
                         bg: 'white',
                        text: 'black'
                    },
                    messagesDisplay: {
                        bg: '#f7f3f3'
                    }
                },
                submitIcon: '#b91010',
                submitImageIcon: '#b91010',
            },
            borderStyle: {
                topLeft: "10px",
                topRight: "10px",
                bottomLeft: "10px",
                bottomRight: "10px",
            },
            hideCloseButton: false,
            submitIconSize: 25,
            closeButtonIconSize: "20px",
            asyncMode: false,
            scrollBottom: {
                messageSent: true,
                messageReceived: false
            },
            displayHeader:true,
            profilePictureConfig: {
                others: true,
                myself: true,
                styles: {
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%'
                }
            },
            timestampConfig: {   
                format: 'HH:mm',
                relative: false
            },
            // there are other options, you can check them here
            // https://soapbox.github.io/linkifyjs/docs/options.html
            linkOptions: {
                myself: {
                    className: 'myLinkClass',
                    events: {
                        // click: function (e) {
                        //     alert('Link clicked!');
                        // },
                        // mouseover: function (e) {
                        //     alert('Link hovered!');
                        // }
                    },
                    format: function (value, type) {
                        if (type === 'url' && value.length > 50) {
                            value = value.slice(0, 50) + '…';
                        }
                        return value;
                    }
                },
                others: {
                    className: 'othersLinkClass',
                    // events: {
                    //     click: function (e) {
                    //         alert('Link clicked!');
                    //     },
                    //     mouseover: function (e) {
                    //         alert('Link hovered!');
                    //     }
                    // },
                    format: function (value, type) {
                        if (type === 'url' && value.length > 50) {
                            value = value.slice(0, 50) + '…';
                        }
                        return value;
                    }
                }
            }
        }
    },
  mounted(){
     this.fetctMsgs();
     this.getMyself();
  },
    methods: {
        fetctMsgs(){
            axios.get('http://localhost:8000/api/fetchmsgs/1')
           .then((response) => {
          this.messages = response.data;
          });
        },
        getMyself(){
            axios.get('http://localhost:8000/api/profile')
           .then((response) => {
          this.myself = response.data;
          });
           
        },
        // onType: function (event) {
        //     //here you can set any behavior
        // },
        loadMoreMessages(resolve) {
            setTimeout(() => {
                resolve(this.toLoad); //We end the loading state and add the messages
                //Make sure the loaded messages are also added to our local messages copy or they will be lost
                this.messages.unshift(...this.toLoad);
                this.toLoad = [];
            }, 1000);
        },
        onMessageSubmit: function (message) {
            /*
            * example simulating an upload callback. 
            * It's important to notice that even when your message wasn't send 
            * yet to the server you have to add the message into the array
            */
            this.messages.push(message);

            /*
            * you can update message state after the server response
            */
            // timeout simulating the request
            setTimeout(() => {
                message.uploaded = true
            }, 2000)
        },
        onClose() {
            this.visible = false;
        },
        onImageSelected(files, message){
            let src = 'https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg'
            this.messages.push(message);
            /**
             * This timeout simulates a requisition that uploads the image file to the server.
             * It's up to you implement the request and deal with the response in order to
             * update the message status and the message URL
             */
            setTimeout((res) => {
                message.uploaded = true
                message.src = res.src
            }, 3000, {src});
        },
        onImageClicked(message){
            /**
             * This is the callback function that is going to be executed when some image is clicked.
             * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
             */
            console.log('Image clicked', message.src)
        }
    }

}
</script>