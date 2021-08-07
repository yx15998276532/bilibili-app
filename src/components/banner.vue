<template  >
  <div  class="banner-box">                                             
     <ul class="banner-list" :style="bannerStyle" @transitionend="handleTransitionend" >
         <li v-for="item in bannerList" :key="item.id" class="banner" >
             <img :src="item.poster" :alt="item.title" >
         </li>
     </ul>
     <ul class="listIndex">
         <li v-for=" index in newList" :key="index" class="index"
           :class="{active: index-1 === bannerActiveIndex % 3}">
         </li>
         
     </ul>
  </div>
</template>

<script>
import api from '../api'
export default {
  data() {
      return {
          bannerList: [],
          newList: [],
          bannerActiveIndex: 0,
          bannerWidth: 350,
          bannerStyle: {
              left: 0,
              transition: 'left .3s'
          }
      }
  },
  created() {
    api.getBan().then(r => {
        if(r.status === 200) {
            let oneList = {...r.data.data[0]};
            oneList.id = Math.floor(Math.random() * 10000000);
            this.bannerList = [...r.data.data, oneList];
            this.newList = this.bannerList.length -1;
        }
    })
  },
  methods: {
    autoMove () {
      setTimeout(() => {
          if (this.bannerActiveIndex === 0) {
             this.bannerStyle.transition = 'left .3s'
          }
        this.bannerActiveIndex ++;
        this.bannerStyle.left = -this.bannerActiveIndex * this.bannerWidth + 'px';  
      }, 2000);
    },
    handleTransitionend () {
      if(this.bannerActiveIndex === 3) {
        this.bannerActiveIndex = 0;
        this.bannerStyle.left = 0;
        this.bannerStyle.transition = 'none'
      }
       this.autoMove();
  }
  },
  mounted() {
    this.autoMove();
  }
}
</script>

<style scoped>
@import "../assets/css/banner.css";
</style>