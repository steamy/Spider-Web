<template>
    <section id="dashboard">
        <section id="spider">
            <div class="nav">
                <p class="title"> Spider Monitor </p>
                <div class="chart-nav">
                    <ul >
                        <li class="desc">User fetched</li>
                        <li class="desc">Proxy pool</li>
                    </ul>
                </div>
            </div>

            <div id="charts"></div>

            <div id="preview">
                <div id="set-loop-time">
                    <p class="desc">update data every</p>
                    <el-select v-model="refreshPreCardTime"  size="mini">
                        <el-option  :value="1" :key="1" :label="1"></el-option>
                        <el-option  :value="2" :key="2" :label="5"></el-option>
                        <el-option  :value="3" :key="3" :label="10"></el-option>
                    </el-select>
                    <p class="desc">mins</p>
                </div>
                <div id="preview-cards">
                    <div class="card" v-for="(data, index) in spiderPreviewData">
                        <p class="desc">{{data.title}}</p>
                        <div class="detail">
                            <p class="desc"><span class="bold">{{data.num}}</span>{{data.unit}}</p>
                            <p class="desc">{{data.name}} {{data.source}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="data">
            <div class="nav">
                <p class="title"> Last Fetched </p>


            </div>
            <div id="preview-data">
                <el-table  :data="previewData">
                    <el-table-column
                            style="color: #24292C;"
                            prop="user_nickname"
                            label="昵称">
                    </el-table-column>
                    <el-table-column class="desc"
                                     prop="check_in_time"
                                     label="注册时间">
                    </el-table-column>
                    <el-table-column class="desc"
                                     prop="signature"
                                     label="签名">
                    </el-table-column>
                    <el-table-column class="desc"
                                     prop="location"
                                     label="居住地">
                    </el-table-column>
                </el-table>
            </div>
        </section>
    </section>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    transition: 'zoom-top',
    name: 'index',
    async asyncData () {
      let { data, err } = await axios.get('/api/v1/admin/spider')
      if (err) {
        console.log(err)
      }
      return {initData: data, previewData: data.users}
    },
    data () {
      return {
        // loading: true,
        previewDataColumn: [
          {
            key: 'user_nickname',
            label: '昵称'
          },
          {
            key: 'check_in_time',
            label: '注册时间'
          },
          {
            key: 'location',
            label: '居住地'
          },
          {
            key: 'signature',
            label: '签名'
          }
        ],
        refreshPreCardTime: 2,
        ws: '',
        spiderPreviewData: [
          {
            num: 0,
            title: 'Got',
            name: 'users',
            source: 'from douban',
            unit: ''
          },
          {
            num: 0,
            title: 'Want',
            name: 'users',
            source: 'from douban',
            unit: ''
          },
          {
            num: 0,
            title: 'Pull',
            name: 'ips',
            source: 'in pool',
            unit: ''
          }
        ]
      }
    },
    methods: {
      setPreviewCards (data) {
        this.spiderPreviewData[0].num = data.userid_used_num
        this.spiderPreviewData[1].num = data.userid_wanted_num
        if (typeof (data.useful_proxy_num) !== 'undefined') {
          this.spiderPreviewData[2].num = data.useful_proxy_num
        }
      }
    },
    mounted () {
      /**
       * 设置soket
       */
      console.log('mounted')
      this.ws = new WebSocket('ws://localhost:3000/ws/admin')
      let _this = this
      this.ws.onmessage = function (e) {
        console.log('onmessage')
        let dataJson = JSON.parse(e.data)
        _this.setPreviewCards(dataJson)
        // _this.spiderPreviewData[0].num = dataJson.userid_used_num
        // _this.spiderPreviewData[1].num = dataJson.userid_wanted_num
        // console.log(e.data)
      }
      this.ws.onerror = function (err) {
        console.log(err)
      }
      this.ws.onopen = function () {
        console.log('onopen')
      }
      this.ws.onclose = function () {
        console.log('close socket')
      }

      /**
       * 注入数据
       */
      _this.setPreviewCards(this.initData.preview)
    },
    beforeDestroy () {
      console.log('beforeDestroy')
      this.ws.close()
    }
  }
</script>

<style scoped>
    #dashboard {
        padding-top: 45px;
        padding-bottom:45px;
        padding-left: 40px;
        padding-right: 40px;
    }
    #dashboard .title {
        opacity: 0.5;
        color: #2A2A44;
    }
    #dashboard .desc {
        opacity: 0.3;
        color: #24292C;
    }

    #dashboard #spider {
        width: 574px;
        height: fit-content;
        padding-bottom: 30px;
    }
    #dashboard #spider .nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    #dashboard #spider .nav .chart-nav {

    }

    #dashboard #spider .nav .chart-nav ul {
        list-style: none;
        display: inline-flex;
    }
    #dashboard #spider .nav .chart-nav ul li{
        margin-left: 30px;
    }

    #dashboard #spider #charts {
        margin-top: 30px;
        margin-left: 10px;
        width: 565px;
        height: 242px;
        background-image: linear-gradient(-225deg, #8E78FF 0%, #FC7D7B 100%);
        border-radius: 6px;
    }

    #dashboard #spider #preview {
        margin-top: 34px;
        display: block;
        margin-left: 10px;
    }
    #dashboard #spider #preview #set-loop-time {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    #dashboard #preview .el-select {
        width: 55px;
        margin-left: 10px;
        margin-right: 10px;
    }
    #dashboard #spider #preview #preview-cards {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #dashboard #spider #preview-cards .card {
        background: #FFFFFF;
        box-shadow: 0 4px 6px 0 rgba(48,48,77,0.05), 0 2px 4px 0 rgba(48,48,77,0.05);
        border-radius: 5px;
        height: 75px;
        width: 175px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        margin-top: 10px;
        transition: margin .25s;
        transition-timing-function: initial;
        transition-delay: initial;
    }
    #dashboard #spider #preview-cards .card:hover {
        margin-top: 0;
        box-shadow: 0 32px 32px 0 rgba(48,48,77,0.05), 0 16px 16px 0 rgba(48,48,77,0.05), 0 8px 8px 0 rgba(48,48,77,0.05), 0 4px 4px 0 rgba(48,48,77,0.05), 0 2px 2px 0 rgba(48,48,77,0.05);
    }
    #dashboard #spider #preview-cards .card .detail {
        display: block;
        margin-left: 14px;
    }
    #dashboard #spider #preview-cards .card .detail .desc {
        opacity: 1;
        color: #30304D;
        font-size: 0.83rem;
        font-weight: 300;
    }
    #dashboard #spider #preview-cards .card .detail .desc .bold {
        color: #30304D;
        font-size: 2rem;
        font-weight: 400;
    }
    #dashboard #data {
        padding-top: 30px;
        padding-bottom: 30px;
        width: 574px;
    }

    #dashboard #data #preview-data {
        margin-top: 30px;
    }
</style>