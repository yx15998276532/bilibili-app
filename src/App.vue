<template>
  <div id="app" @scroll="handleScroll">
    <Header />
    <Nav />
    <Banner  />
    <MyVideo :oldVideoList="oldVideoList" />
    <Footer />
  </div>
  
</template>

<script>
import Header from './components/Header.vue'
import Nav from "./components/Nav"
import Banner from './components/banner'
import MyVideo from './components/Video'
import Footer from './components/Footer'
import api from './api'
export default {
  components: {
    Header,
    Nav,
    Banner,
    MyVideo,
    Footer
  },
  data() {
     return {
       oldVideoList: [],
       videoGettingData: false,
       videoCount: 0,
       }
   },
   methods: {
    handleScroll (e) {
      const {scrollHeight, offsetHeight, scrollTop} = e.target;
        // console.log("整个元素的高度",scrollHeight,"可视区高度", offsetHeight, "滚动距顶部距离",scrollTop)
        const surHeight = scrollHeight - offsetHeight - scrollTop;
        const videoLength = this.oldVideoList.length;
        if(this.videoCount === videoLength){ 
            return
        }
        if(surHeight < 200 && !this.videoGettingData) {
            this.videoGettingData = true;//正在获取
            api.getVideo({ 
            start: this.oldVideoList.length,
            offset: 12,
      }).then(r => {
        //   console.log(r.data.data)    
        if(r.status === 200) {
        this.oldVideoList.push(...r.data.data);
        this.videoGettingData = false;//获取完毕
          }
      });
        }
    }
   },
     created() {  
       api.getVideo({ 
           start: 0,
           offset: 12,
     }).then(r => {
        //   console.log(r.data.data)    
        if(r.status === 200) {
            console.log(r.data)
        this.oldVideoList = r.data.data;
        this.videoCount = r.data.count;
          }
      });
  },
}
</script>

<style>
@import "./assets/css/reset.css";
html,body{
    height: 100%;
}
#app{
   height: 100%;
   /* flex-direction: column; */
   overflow-y: scroll;
}
/* .myvideo {
    padding-top: 100px;
} */
</style>
