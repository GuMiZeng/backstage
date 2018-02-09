<template>
  <div class="dealer">
    <i-input v-model="d_search" @on-enter="handleSearch()" icon="search" placeholder="输入渠道ID搜索..." style="width: 200px"></i-input>
    <br><br>
    <i-table :loading="c_loading" :columns="d_columns" :data="c_data" @on-sort-change="sort($event)"></i-table>
    <br><br>
    <Page v-if="d_page.total > 0 " :current="d_page.current" :total="d_page.total" :page-size="d_page.size" @on-change="pageSwitch($event)" @on-page-size-change="pageSizeSwitch($event)" show-total show-elevator show-sizer></Page>
  </div>
</template>
<script>
import expandRow from './_details'
export default {
  components: { expandRow },
  data () {
    return {
      d_sort: {
        key: 'balance',
        sort: -1
      },
      d_search: null,
      d_page: {
        current: 1,
        total: 1,
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
          key: 'ID'
        },
        {
          title: '注册人数',
          key: 'trade',
          sortable: 'custom'
        },
        {
          title: '充值额度',
          key: 'frozen',
          sortable: 'custom'
        },
        {
          title: 'Fid',
          key: 'Fid'
        },
        {
          title: '名称',
          key: 'name'
        }
      ]
    }
  },
  computed: {
    c_data () {
      return this.$store.state('dealer/data')
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
      this.$store.actions('dealer/searchData', this.d_search)
      this.d_page.total = this.c_data.length
    },
    sort (_value) {
      this.d_sort.sort = _value.order
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
