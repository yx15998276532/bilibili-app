<template >
<div class="navigation" v-if="navList.length">
  <div  v-for="navIndex in 2" :key="navIndex" 
  :class="{'nav-container': navIndex === 1, 'hide-container': navIndex === 2, hide: navIndex ===2 && isActive }">
     <ul class="list">
         <li v-for="(item, index) in navList" :key="item.id" @click="handleDisplay(index)"
          :class="{ big:item.title.length === 3, active: index === navActiveIndex}" >
            {{ item.title }}
         </li>
       
     </ul>
     <div class="down"  @click="handleClick" v-if="navIndex === 1">
        <svg width="30" height="20" viewBox="0 0 1024 1024">
          <path d="M515.2 649.6L169.6 304c-12.8-12.8-32-12.8-44.8 0s-12.8 35.2 0 48l368 364.8c12.8 12.8 32 12.8 44.8 0l361.6-361.6c12.8-12.8 12.8-35.2 0-48s-32-12.8-44.8 0L515.2 649.6z" fill="#ccc">
        </path></svg>       
     </div>
     <div class="up" v-else @click="handleClick">
       <svg width="20" height="28" viewBox="0 0 1024 1024">
       <path d="M854.4 713.6c12.8 12.8 32 12.8 44.8 0s12.8-35.2 0-48L537.6 304c-12.8-12.8-32-12.8-44.8 0L124.8 672c-12.8 12.8-12.8 35.2 0 48s32 12.8 44.8 0l345.6-342.4 339.2 336z" fill="#ccc">
      </path></svg>
     </div>
       </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  data () {
      return {
          navList: [],
          isActive: true,
          navActiveIndex: 0,
      }
  },
  created() {
     api.getNav().then(r => {
         if(r.status === 200) {
             this.navList = r.data.data
         }
     })
  },
  methods: {
      handleClick() {
        this.isActive = !this.isActive
      },
      handleDisplay(index){
         this.navActiveIndex = index
      }
  }
}
</script>

<style scoped>
@import '../assets/css/nav.css';
</style>