<template>
  <div class="player">
    <i-input v-model="d_search" @on-enter="handleSearch()" icon="search" placeholder="输入玩家ID搜索..." style="width: 200px"></i-input>
    <br><br>
    <i-table :loading="c_loading" :columns="d_columns" :data="c_data" @on-sort-change="sort($event)"></i-table>
    <br><br>
    <Page v-if="c_total > 0 " :current="d_page.current" :total="c_total" :page-size="d_page.size" @on-change="pageSwitch($event)" @on-page-size-change="pageSizeSwitch($event)" show-total show-sizer></Page>
    <game-log></game-log>
    <charge-log></charge-log>
  </div>
</template>
<script>
import expandRow from './_details'
import gameLog from '../modal/game'
import chargeLog from '../modal/charge'
import { stamp2local } from '../../libs/function'
export default {
  components: {
    expandRow,
    gameLog,
    chargeLog
  },
  data () {
    return {
      d_sort: {
        key: 'balance',
        sort: -1
      },
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
          key: 'account_num'
        },
        {
          title: '渠道ID',
          key: 'f_uid'
        },
        {
          title: '注册时间',
          key: 'created_at',
          sortable: 'custom',
          render: (h, params) => {
            return stamp2local(params.row.created_at / 1000)
          }
        },
        {
          title: '最近活跃时间',
          key: 'recent_login',
          render: (h, params) => {
            return stamp2local(params.row.created_at / 1000)
          }
        },
        {
          title: '游戏场次<胜利/总数>',
          key: 'game_total_num',
          width: 200,
          render: (h, params) => {
            if (!params.row.game_total_num) return '— —'
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
    c_total () {
      return this.$store.state('player/total')
    },
    c_loading () {
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
    handleSearch () {
      if (!this.d_search) {
        this.getData()
      } else {
        this.$store.actions('player/searchData', this.d_search)
      }
    },
    sort (_value) {
      if (_value.order === 'desc') this.d_sort.sort = -1
      if (_value.order === 'asc') this.d_sort.sort = 1
      this.d_sort.key = _value.key
      this.getData()
    },
    getData () {
      let params = {
        current: this.d_page.current,
        size: this.d_page.size,
        sort: this.d_sort.sort,
        key: this.d_sort.key
      }
      this.$store.actions('player/upData', params)
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>

</style>
