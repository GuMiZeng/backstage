<template>
  <div>
    <Modal :value="c_gameModal" :closable='false' :mask-closable="false" :width="700">
      <h3 slot="header" style="color:#2D8CF0">游戏记录</h3>
      <i-table :loading="c_loading" v-if="c_gameModal" :columns="d_columns_game" :data="c_gameData"></i-table>
      <br>
      <Page v-if="c_total > 0 " :current="d_page.current" :total="c_total" :page-size="d_page.size" @on-change="pageSwitch($event)" @on-page-size-change="pageSizeSwitch($event)" show-total show-sizer></Page>
    </Modal>
  </div>
</template>
<script>
import { stamp2local } from '../../libs/function'
export default {
  data () {
    return {
      d_page: {
        current: 1,
        size: 40
      },
      d_columns_game: [
        {
          title: '场次ID',
          key: 'ID',
          render: (h, params) => {
            if (params.row.ID === null) return '— —'
            else return params.row.ID
          }
        },
        {
          title: '游戏结果',
          key: 'result',
          render: (h, params) => {
            if (params.row.result === null) return '— —'
            if (params.row.result) return '胜利'
            else return '失败'
          }
        },
        {
          title: '游戏时间<min>',
          key: 'time',
          render: (h, params) => {
            if (params.row.time === null) return '— —'
            else return stamp2local(params.row.time / 1000)
          }
        }
      ]
    }
  },
  computed: {
    c_gameData () {
      return this.$store.state('playerGame/data')
    },
    c_total () {
      return this.$store.state('playerGame/total')
    },
    c_player () {
      return this.$store.state('player/ID')// 点击详情的ID
    },
    c_gameModal () {
      return this.$store.state('player/gameModal')
    },
    c_loading () {
    //   return this.c_data ? false : true
      return this.c_gameData === 0
    }
  },
  methods: {
    gameModal () {
      this.$store.state('player/gameModal', false)
    },
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
    getData () {
      this.$store.actions('playerGame/upData', this.d_page)
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>

</style>
