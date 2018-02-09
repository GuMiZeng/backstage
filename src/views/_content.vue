<template>
  <div class="content">
    <row class="box" type="flex">
      <i-col class="left" :span="4">
        <i-menu class="menu" width="auto" ref="menu" @on-select="$router.push({ path: $event })" :active-name="$route.path">
          <menu-item :name="item.path" v-for="(item, key) of $store.state('appMenu/active').submenu" :key="key">
            <span v-text="item.title"></span>
          </menu-item>
        </i-menu>
      </i-col>
      <i-col class="right" :span="20">
        <router-view></router-view>
        <br><br>
        <main-footer></main-footer>
      </i-col>
    </row>
  </div>
</template>

<script>
import mainFooter from './_footer'
export default {
  components: {
    mainFooter
  },
  updated () {
    this.$nextTick(function () {
      this.$refs.menu.updateActiveName()
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.content {
  overflow-y: auto;
  max-height: calc(100vh - 60px);
}
.left {
  .menu {
    position: sticky;
    top: 2%;
  }
}

.right {
  min-height: calc(100vh - 60px);
  padding: 2%;
  &:after {
    content: "";
    display: block;
    width: 1px;
    background: #d7dde4;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
  }
}
</style>
