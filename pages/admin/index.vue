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
        currentTag: 0
      }
    },
    methods: {
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