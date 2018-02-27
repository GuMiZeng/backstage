<template>
    <Modal v-model="c_chargeModal" :closable='false' :mask-closable="false" :width="700">
      <charge></charge>
      <div slot="footer">
        <i-button type="primary" @click="$store.state('player/chargeModal', false)">确定</i-button>
      </div>
    </Modal>
</template>
<script>
import charge from '../player/_charge_log'
export default {
  components: {
    charge
  },
  data () {
    return {
      name: 1
    }
  },
  computed: {
    c_chargeModal () {
      return this.$store.state('player/chargeModal')
    }
  }
}
</script>
