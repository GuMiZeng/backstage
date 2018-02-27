<template>
  <div class="dealer">
    <i-input v-model="d_search" @on-enter="handleSearch()" icon="search" placeholder="输入渠道ID搜索..." style="width: 200px"></i-input>
    <br><br>
    <i-table :loading="c_loading" :columns="d_columns" :data="c_data" @on-sort-change="sort($event)"></i-table>
    <br><br>
    <Page v-if="c_total > 0 " :current="d_page.current" :total="c_total" :page-size="d_page.size" @on-change="pageSwitch($event)" @on-page-size-change="pageSizeSwitch($event)" show-total show-sizer></Page>
  </div>
</template>
<script>
import expandRow from './_details'
export default {
  components: { expandRow },
  data () {
    return {
      d_sort: {
        key: 'invite_sum',
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
          title: '渠道ID',
          key: 'account_num'
        },
        {
          title: '注册人数',
          key: 'invite_sum',
          sortable: 'custom'
        },
        {
          title: '充值额度',
          key: 'recharge_amount',
          sortable: 'custom'
        },
        {
          title: 'Fid',
          key: 'f_uid'
        },
        {
          title: '名称',
          key: 'nickname'
        }
      ]
    }
  },
  computed: {
    c_data () {
      return this.$store.state('dealer/data')
    },
    c_total () {
      return this.$store.state('dealer/total')
    },
    c_page () {
      return this.$store.state('dealer/dealerList')
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
        this.$store.actions('dealer/searchData', this.d_search)
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
      this.$store.actions('dealer/upData', params)
      // this.$nextTick(function () {
      //   this.d_page.total = this.c_data.length
      // })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>

</style>
