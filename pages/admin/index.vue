<template>
    <section id="admin">
        <left-side-bar></left-side-bar>
        <div id="right" class="bg-color">
            <div class="img-box">
                <img class="bg-img" src="../../assets/img/svg/admin_nav_bg.svg">
            </div>
            <nuxt-child class="content-card"/>
        </div>
    </section>
</template>

<script>
  import LeftSideBar from '../../components/LeftSideBar.vue'
  export default {
    name: 'index',
    components: {LeftSideBar},
    data () {
      return {
        currentTag: 0,
        ws: ''
      }
    },
    methods: {
    },

    mounted () {
      console.log('mounted')
      this.ws = new WebSocket('ws://localhost:3000/ws/admin')
      let _this = this
      this.ws.onmessage = function (e) {
        console.log('onmessage')
        console.log(e.data)
      }
      this.ws.onerror = function (err) {
        console.log(err)
      }
      this.ws.onopen = function () {
        // console.log('onopen')
        _this.ws.send('hello')
      }
      this.ws.onclose = function () {
        console.log('close socket')
        // _this.ws.send('closed')
      }
    }
  }
</script>

<style scoped>
    #admin {
        background: #393857;
        width: 100%;
    }

    #admin #right {
        padding-left: 240px;
        display: block;
    }
    #admin #right .img-box {
        width: 100%;
        height: 350px;
        overflow: hidden;
    }
    #admin #right .img-box .bg-img{
        /*height: 100%;*/
        width: 100%;
    }

    #admin #right .content-card {
        background: #ffffff;
        color: #000;
        height: auto;
        min-height: 775px;
        max-width: 1140px;
        border-radius: 10px;
        position: relative;
        margin: 0 auto;
        top: -130px;
    }


</style>