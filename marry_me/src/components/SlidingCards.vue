<template>
  <div class="sc" align="center"> 
               <h4 class="headerpref" align="center"  style="color: rgba(255,98,101,1);">   
                                     VIP   الفرق بين المستخدمين المجانيين والمستخدمين ال  </h4>
    <b-carousel 
      id='mainCarousel'
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ccc"
      img-width="1024"
      img-height="300"
      style="text-shadow: 1px 1px 2px #000;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      align="center"
    >
                 <b-carousel-slide
                align="center"
                caption="مميزات في المحادثات"
                text=" يمكنه بدء المحادثة فورا مع الطرف الاخر بدون ارسال طلب VIPمستخدم  "
                color="black"
                :img-src="chat"
                style="max-width: 1024px; max-height: 300px;background: rgba(255,98,101,1); font-color:black; color:black;border-radius: 3px 3px 3px 3px;box-shadow: 0px 6px 0px white; border: solid 3px rgba(255,98,101,1);"
                
                ></b-carousel-slide>

                <b-carousel-slide
                align="center"
                caption="المميزات خاصة"
                text=" يمكنه ان يخفي بعد البيانات الخاصة به VIPمستخدم  "
                color="black"
                :img-src="hide"
                style="max-width: 1024px; max-height: 300px;background: rgba(255,98,101,1); font-color:black; color:black;border-radius: 3px 3px 3px 3px;box-shadow: 0px 6px 0px white; border: solid 3px rgba(255,98,101,1);"
                ></b-carousel-slide>
                 <b-carousel-slide
                align="center"
                caption="المميزات اخري"
                text=" يمكنه ان يري من قام بالاعجاب به VIPمستخدم  "
                color="black"
                :img-src="like"
                style="max-width: 1024px; max-height: 300px;background: rgba(255,98,101,1); font-color:black; color:black;border-radius: 3px 3px 3px 3px;box-shadow: 0px 6px 0px white; border: solid 3px rgba(255,98,101,1);"
                ></b-carousel-slide>

    </b-carousel>
  </div>
</template>


<script>
import chat from "../assets/chat.png";
import hide from "../assets/hide.jpg";
import like from "../assets/likee.jpg";
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
        chat:chat,
        hide:hide,
        like:like,
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>

<style>
.sc{
    height:300px;
    width:1024px;
    align:center;
    margin-left:150px;
    margin-top:8px;
    margin-bottom:60px;
    margin-border:15px;
    padding-radius:15px;
    border:15px;
    border-radius:15px;
    color:black;
   
}
</style>
<style lang="sass">
#mainCarousel
  .carousel-control-prev-icon,
  .carousel-control-next-icon
    background-image: none
    background-size: 100%, 100%
    border: 2px solid  rgba(255,98,101,1)
    border-radius: 50%
    height: 50px
    outline:  rgba(255,98,101,1)
    width: 50px
  .carousel-control-next-icon::after
    color:  rgba(255,98,101,1)
    content: '>>'
    font-size: 30px
  .carousel-control-prev-icon::after
    color:  rgba(255,98,101,1)
    content: '<<'
    font-size: 30px
  .carousel-indicators li
    background-color: transparent
    border-radius: 50%
    height: 6px
    margin: 0 20px
    opacity: 1
    padding: 3px
    position: relative
    width: 6px
  .carousel-indicators li::after
    border: 3px solid #fff
    border-radius: 50%
    bottom: -7px
    content: ""
    left: -7px
    padding: 10px
    position: absolute
    right: -7px
    top: -7px
  .carousel-indicators li.active
    background-color:  rgba(255,98,101,1)
</style>