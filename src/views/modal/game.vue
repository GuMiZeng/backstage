<template>
  <div>
    <Modal :value="c_gameModal" :closable='false' :mask-closable="false" :width="700">
      <game></game>
      <div slot="footer">
        <i-button type="primary" @click="$store.state('player/gameModal', false)">确定</i-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import game from '../player/_game_log'
export default {
  components: {
    game
  },
  data () {
    return {
      name: 1
    }
  },
  computed: {
    c_gameModal () {
      return this.$store.state('player/gameModal')
    }
  }
}
</script>
