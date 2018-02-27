<template>
  <div>
    <Modal v-model="c_chargeModal" :closable='false' :mask-closable="false" :width="700">
      <h3 slot="header" style="color:#2D8CF0">财务记录</h3>
      <i-table v-if="c_chargeModal" :columns="d_columns_charge" :data="c_chargeData"></i-table>
      <br>
      <Page v-if="d_page.total > 0 " :current="d_page.current" :total="d_page.total" :page-size="d_page.size" @on-change="pageSwitch($event)" @on-page-size-change="pageSizeSwitch($event)" show-total show-elevator show-sizer></Page>

      <div slot="footer">
        <i-button type="primary" @click="$store.state('player/chargeModal', false)">确定</i-button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      d_page: {
        current: 1,
        total: 1,
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
              value: 1
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
          filter: 4,
          filterMultiple: false,
          filterMethod (value, row) {
            console.log(value)
            this.filter = value
            console.log(this.filter)
          }
        }
      ]
    }
  },
  computed: {
    c_chargeData () {
      return this.$store.state('playerCharge/chargeData')
    },
    c_player () {
      return this.$store.state('player/ID')
    },
    c_chargeModal () {
      return this.$store.state('player/chargeModal')
    },
    c_loading () {
    //   return this.c_data ? false : true
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
      this.d_page.filter = this.d_columns_charge[3].filter
      console.log(this.d_columns_charge[3].filter)
      this.$store.actions('playerCharge/upData', this.d_page)
      this.d_page.total = this.c_chargeData.length
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>

</style>
