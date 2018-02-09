<style scoped>
.expand-row {
 margin-bottom: 16px;
}
</style>
<template>
  <div>
    <Row class="expand-row">
      <i-col span="8">
      <span class="expand-key">电话: </span>
      <span class="expand-value">{{ row.phone }}</span>
      </i-col>
      <i-col span="8">
      <span class="expand-key">地址: </span>
      <span class="expand-value">{{ row.addr }}</span>
      </i-col>
      <i-col span="8">
      <span class="expand-key">备注: </span>
      <span class="expand-value">{{ row.remark }}</span>
      </i-col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
}
</script>
