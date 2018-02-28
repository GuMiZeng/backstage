<template>
  <div>
    <h3 slot="header" style="color:#2D8CF0">财务记录</h3>
    <Table :columns="d_columns_charge" :data="c_chargeData"></Table>
    <br>
    <Page v-if="c_total > 0 " :current="d_page.current" :total="c_total" :page-size="d_page.size" @on-change="pageSwitch($event)" @on-page-size-change="pageSizeSwitch($event)" show-total show-sizer></Page>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 1,
      d_page: {
        current: 1,
        size: 40,
        filter: 4
      },
      d_columns_charge: [
        {
          title: '状态',
          key: 'state',
          render: (h, params) => {
            if (params.row.state === null) return '— —'
            if (params.row.state) return '成功'
            else return '失败'
          }
        },
        {
          title: '数量<点券>',
          key: 'num'
        },
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '类型',
          key: 'type',
          filters: [
            {
              label: '充值',
              value: 0
            },
            {
              label: '转账',
              value: 2
            },
            {
              label: '消费',
              value: 3
            }
          ],
          filterMultiple: false,
          filterRemote (value, row) {
            if (!value.length) {
              this.d_page.filter = 4
            } else {
              this.d_page.filter = value[0]
            }
            this.getData()
          }
        }
      ]
    }
  },
  computed: {
    c_chargeData () {
      return this.$store.state('playerCharge/chargeData')
    },
    c_total () {
      return this.$store.state('playerCharge/total')
    },
    c_player () {
      return this.$store.state('player/ID')
    },
    c_chargeModal () {
      return this.$store.state('player/chargeModal')
    },
    c_loading () {
      return this.c_chargeData === 0
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
    getData () {
      console.log(this.c_player, 'lll')
      this.d_page.uid = this.c_player // 查看个人的财务记录
      this.$store.actions('playerCharge/upData', this.d_page)
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>

</style>
