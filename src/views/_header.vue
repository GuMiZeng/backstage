<template>
  <div class="header drag">
    <i-menu mode="horizontal" @on-select="$router.push({ path: $event })" :active-name="`/${$route.path.split('/')[1]}`">
      <div class="logo no_drag">
        <tooltip content="瀑布竞技" placement="right">
          <icon type="coffee" size="24"></icon>
          <span v-text="c_uid"></span>
        </tooltip>
      </div>
      <div class="nav no_drag">
        <menu-item :name="item.path" v-for="(item, key) of $store.state('appMenu/list')" :key="key">
          <icon :type="item.icon"></icon>
          <span v-text="item.title"></span>
        </menu-item>
        <button-group class="btns">
          <i-button type="ghost" icon="refresh" @click="reload()"></i-button>
          <i-button type="ghost" icon="log-out" @click="d_signOut = true"></i-button>
        </button-group>
        <Modal v-model="d_signOut" @on-ok="signOut()" @on-cancel="d_signOut = true">
          <h3>确认退出登录？</h3>
        </Modal>
      </div>
    </i-menu>
  </div>
</template>

<script>
import localUser from '../local/user'
export default {
  components: {

  },
  data () {
    return {
      d_signOut: false
    }
  },
  created () {
    // 权限控制运营页面显示
    if (!localUser.isAdmin()) {
      console.log('不是管理员')
      console.log(localUser.isAdmin(), localUser.uid())
      let tmp = this.$store.state('appMenu/list')
      let m = tmp.slice(0)
      if (m.length >= 3) {
        m.splice(m.length - 1, 1)
        this.$store.state('appMenu/list', m)
      }
    }
  },
  computed: {
    c_uid () {
      return localUser.uid()
    }
  },
  methods: {
    reload () {
      location.reload()
    },
    signOut () {
      // 清除jwt
      this.$store.state('user/jwt', 0)
      this.$store.state('user/uid', 0)
      this.$store.state('user/isAdmin', 0)
      localUser.jwt(0)
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  left: 2%;
  cursor: pointer;
}
.nav {
  position: absolute;
  right: 2%;
  height: inherit;
}
.btns {
  padding-left: 20px;
}
</style>
