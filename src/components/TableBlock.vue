<template>
  <router-link
    class="tableBlockLink"
    :class="$q.dark.isActive || table.status ? 'text-white' : 'text-black'"
    :to="'/'+table.id+'/menu'"
  >
    <div class="q-pa-md">
      <div :class="tableBackground(table.status)" class=" q-ma-md TableBlock">
        <div class="column justify-between full-height">
          <div class="flex justify-between">
            <div class="TableBlock__title">
              {{ $t('index.table') }} #{{table.id}}
            </div>
            <div class="">
              00:00
            </div>
          </div>
          <div class="TableBlock__footer">
            No Order
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "TableBlock",
  props: {
    table: Object,
  },
  methods: {
    tableBackground(status) {
      if (status === 1) {
        return 'bg-green'
      }
      if (status === 2) {
        return 'bg-orange'
      }
      if (status === 3) {
        return 'bg-red'
      }
      if (this.$q.dark.isActive) {
        return 'bg-black'
      }
      return 'bg-white'
    }
  }
})
</script>

<style scoped lang="scss">
.tableBlockLink{
  text-decoration: none;
}
  .TableBlock {
    padding: 10px 20px;
    border-radius: 10px;
    height: 110px;
    font-family: GSansReg;
    &__title {
      font-family: "Google Sans";
      font-size: 25px;
      font-weight: 700;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      text-align: left;
    }
  }
</style>
