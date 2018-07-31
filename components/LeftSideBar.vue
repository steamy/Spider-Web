<template>
    <section id="left-side-bar">
        <section id="nav">
            <p class="title">Douser</p>
            <img src="../assets/img/svg/slidebar-menu.svg"/>
        </section>

        <section id="user-card">
            <img src="../assets/img/svg/user_avatar.svg"/>
            <p class="sub_title">Jupiter</p>
        </section>

        <section id="menus">
            <nuxt-link  class="menu" v-for=" (menu, index) in menus" :key="menu.name" :to="menu.toLink">
                <img :src="menu.icon">
                <p class="desc">{{menu.name}}</p>
            </nuxt-link>
        </section>

        <section id="copyright" class="desc">
            <p>All rights @Jupiter</p>
            <p>reserved</p>
        </section>
    </section>
</template>

<script>
import Menus from '../plugins/admin_mune.config'
export default {
  name: 'LeftSideBar',
  data () {
    return {
      menus: Menus
    }
  }
}
</script>

<style scoped>
    #left-side-bar{
        width: 240px;
        height: 100%;
        background: #393857;
        display: block;
        position: fixed;
        overflow: hidden;
        z-index: 10;
    }

    #left-side-bar #nav {
        width: 100%;
        height: 84px;
        background: #30304D;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    #left-side-bar #nav .title {
        text-align: center;
        font-family: .SFNSDisplay;
        color: #FFFFFF;
        height: 20px;
        line-height: 20px;
        letter-spacing: 0;
    }

    #left-side-bar  #user-card {
        width: 150px;
        height: 36px;
        margin: 0 auto;
        padding-left: 20px;
        display: flex;
        align-items: center;
        background-image: linear-gradient(-180deg, #9795E3 0%, #A3A1ED 100%);
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        border-radius: 5px;
        margin-top: 26px;
        margin-bottom: 26px;
    }
    #left-side-bar  #user-card img {
        width: 28px;
        height: 28px;
    }
    #left-side-bar  #user-card p {
        color: #ffffff;
        padding-left: 20px;
    }

    #left-side-bar #menus {
        height: fit-content;
    }

    #left-side-bar #menus .menu {
        width: 100%;
        height: 54px;
        display: flex;
        align-items: center;
        padding-left: 30px;
        opacity: 0.6;
    }
    #left-side-bar #menus .menu p {
        margin-left: 20px;
    }

    .nuxt-link-exact-active {
        opacity: 1 !important;
        background-color: #30304D;
    }

    #left-side-bar #copyright {
        position: absolute;
        height: fit-content;
        width: 100%;
        left: 0;
        bottom: 0;
        text-align: center;
        opacity: 0.5;
    }


</style>