<template>
  <div class="player">
    <i-input v-model="d_search" @on-enter="handleSearch()" icon="search" placeholder="输入玩家ID搜索..." style="width: 200px"></i-input>
    <br><br>
    <i-table :loading="c_loading" :columns="d_columns" :data="c_data" @on-sort-change="sort($event)"></i-table>
    <br><br>
    <Page v-if="d_page.total > 0 " :current="d_page.current" :total="d_page.total" :page-size="d_page.size" @on-change="pageSwitch($event)" @on-page-size-change="pageSizeSwitch($event)" show-total show-elevator show-sizer></Page>
    <game-log v-if="$store.state('player/gameModal')"></game-log>
    <charge-log v-if="$store.state('player/chargeModal')"></charge-log>
  </div>
</template>
<script>
import expandRow from './_details'
import gameLog from './_game_log'
import chargeLog from './_charge_log'
export default {
  components: {
    expandRow,
    gameLog,
    chargeLog
  },
  data () {
    return {
      d_search: null,
      d_page: {
        current: 1,
        total: null,
        size: 40
      },
      d_columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '玩家ID',
          key: 'ID'
        },
        {
          title: '渠道ID',
          key: 'dealerID'
        },
        {
          title: '注册时间',
          key: 'create_at',
          sortable: 'custom',
          width: 110
        },
        {
          title: '最近活跃时间',
          key: 'trade',
          width: 110
        },
        {
          title: '游戏场次<胜利/总数>',
          key: 'all_game',
          width: 200,
          render: (h, params) => {
            if (params.row.all_game) return '— —'
            /**
             * 游戏记录显示操作
             * return h('div', [
              h('a', {
                props: {
                  row: params.row
                },
                style: {
                  color: '#2d8cf0',
                  fontWeight: '700',
                  textDecoration: 'underline'
                },
                on: {
                  click: () => {
                    this.$store.state('player/gameModal', true)
                    this.$store.state('player/ID', params.row.ID)
                  }
                }
              }, `${params.row.victory}/${params.row.all_game}`)
            ])
             */
          }
        },
        {
          title: '财务记录',
          key: 'balance',
          sortable: 'custom',
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  color: '#2d8cf0',
                  fontWeight: '700',
                  textDecoration: 'underline'
                },
                on: {
                  click: () => {
                    this.$store.state('player/chargeModal', true)
                    this.$store.state('player/ID', params.row.ID)
                  }
                }
              }, `余额：${params.row.balance}`)
            ])
          }
        }
      ]
    }
  },
  computed: {
    c_data () {
      return this.$store.state('player/data')
    },
    c_loading () {
    //   return this.c_data ? false : true
      return this.c_data === 0
    }
  },
  methods: {
    pageSwitch (page) {
      window.scrollTo(0, 0)
      this.d_page.current = page
      this.getData()
    },
    pageSizeSwitch (size) {
      window.scrollTo(0, 0)
      this.d_page.size = size
      this.getData()
    },
    sort (_value) {
      let params = {
        sort: _value.order,
        key: _value.key,
        current: this.d_page.current
      }
      this.$store.actions('player/sortData', params) // 请求排序后的数据
      this.d_page.total = this.c_data.length
    },
    handleSearch () {
      this.$store.actions('player/searchData', this.d_search)
      this.d_page.total = this.c_data.length
    },
    getData () {
      console.log(this.$store.state('user/jwt'))
      this.$store.actions('player/upData', this.d_page)
      this.d_page.total = this.c_data.length
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>

</style>
