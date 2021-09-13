<template>
   <bubble-chat
     :position="chatPosition"
     :messages="messagesList"
     :text-field="'message'"
     :sender-name-field="'username'"
     :avatar-link-field="'iconUrl'"
   >
   </bubble-chat>
</template>

<script>

 export default{
 data() {
   return {
     chatPosition: 'right',
     messagesList: [
      {
          username: 'John Doe',
          message: 'Hey guys! How are you?',
          iconUrl: 'https://www.link-to-john-doe-pic.jpg'
      }
     ]
    }
 }
 }
</script>