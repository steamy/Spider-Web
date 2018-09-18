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

            <!--图表-->
            <div id="chart">
                <linechart   :width="565" :height="209" :data="chartLine.data" :options="chartLine.options"></linechart>
            </div>

            <div id="preview">
                <div id="">
                    <p class="desc">last update at    <span>   {{updateTime}}</span></p>

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

                <div id="set-loop-time">
                    <p class="desc">update data every</p>
                    <el-select @change="setRefreshInterval" v-model="previewRefreshInterval"  size="mini">
                        <el-option  :value="1" :key="1" :label="1"></el-option>
                        <el-option  :value="2" :key="2" :label="5"></el-option>
                        <el-option  :value="3" :key="3" :label="10"></el-option>
                    </el-select>
                    <p class="desc">mins</p>
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
  import Linechart from '~/plugins/chart/LineChart.js'
  export default {
    components: {
      Linechart
    },
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
        chartLine: {
          data: {
            labels: ['1', '2', '3'],
            datasets: [
              {
                data: [0, 10, 20],
                backgroundColor: '#284',
                steppedLine: false
              }
            ]
          },
          options: {
            layout: {
              padding: {
                left: 50
              }
            },
            legend: {
              display: false
            },
            title: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }
        },
        // loading: true,
        updateTime: '',
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
        ],
        previewRefreshInterval: 2
      }
    },
    methods: {
      setPreviewCards (data) {
        this.spiderPreviewData[0].num = data.userid_used_num
        this.spiderPreviewData[1].num = data.userid_wanted_num
        console.log(data)
        if (typeof (data.useful_proxy_num) !== 'undefined') {
          this.spiderPreviewData[2].num = data.useful_proxy_num
        }
        if (typeof (data.refresh_interval) !== 'undefined') {
          this.previewRefreshInterval = this.mapInterval(data.refresh_interval)
        }
      },
      mapInterval (interval, isDemap = false) {
        if (!isDemap) {
          return parseInt(interval / 5) + 1
        } else {
          if (interval === 1) {
            return 1
          }
          return (interval - 1) * 5
        }
      },
      setRefreshInterval () {
        console.log(this.previewRefreshInterval)
        axios.post('/api/v1/admin/spider/interval_time', {
          refresh_interval: this.mapInterval(this.previewRefreshInterval)
        })
      }
    },
    mounted () {
      let now = new Date()
      this.updateTime = now.toLocaleString()
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
        let now = new Date()
        _this.updateTime = now.toLocaleString()
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

    #dashboard #spider #chart {
        margin-top: 30px;
        margin-left: 10px;
        width: 565px;
        height: 242px;
        background-image: linear-gradient(-225deg, #8E78FF 0%, #FC7D7B 100%);
        border-radius: 6px;
    }
    #dashboard #spider #charts .echarts {
        height: 242px;
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
        margin-top: 10px;
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