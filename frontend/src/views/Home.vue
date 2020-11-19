<template>
  <div class="home">
    <div class="home-nav">
      <div class="home-nav-title" ><a @click="name='zdzTable'">云南星云</a></div> 
    </div>
    <zdzTable style="min-height:810px;" />
    <div class="home-footer">© 2020 云南星云 隐私政策 深ICP证08026128号 深ICP备1000455211号</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import photo from './photoViews'
import zdzTable from './zdzTable'
export default {
  name: 'Home',
  data() {
    return{
      name:'photo'
    }
  },
  components: {
    // photo,
    zdzTable
  },
  methods:{
 
  }
}
</script>
<style>
body {
    background-color: white;
    color: black;
}
html, body {
    height: 100%;
    padding: 0;
    margin: 0;
}
.home-nav{
    background-color: #2D2D2D;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 16px;
    font-weight: normal;
    border-radius: 0px;
}
.home-nav-title{
  display: flex;
  color: #fff;
}
.home-nav-title a{
  margin-right: 50px;
  cursor: pointer;
}
.home-footer{
    display: inline-block;
    font-size: 12px;
    padding: 15px 0;
    margin-top: auto;
    margin-bottom: 0;
    width: 100%;
    color: #666;
    background-color: #f9f9f9;
}
.active{
      color: #1989fa;
}
</style>