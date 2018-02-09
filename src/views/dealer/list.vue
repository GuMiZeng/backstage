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
    //   return this.c_data ? false : true
      return this.c_data === 0
    }
  },
  methods: {
    sort (_value) {
      let params = {
        sort: _value.order,
        key: _value.key,
        current: this.d_page.current
      }
      this.$store.actions('dealer/sortData', params) // 请求排序后的数据
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
    handleSearch () {
      this.$store.actions('dealer/searchData', this.d_search)
    },
    getData () {
      this.$store.actions('dealer/upData', this.d_page)
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>

</style>
