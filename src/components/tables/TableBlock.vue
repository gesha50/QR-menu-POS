<template>
    <div class="q-pa-md">
      <router-link
        class="tableBlockLink"
        :class="$q.dark.isActive ? 'text-white' : 'text-black'"
        :to="'/menu/'+table.id"
      >
      <div :class="tableBackground(0)" class=" q-ma-md TableBlock">
        <div class="column justify-between full-height">
          <div class="flex justify-between">
            <div class="TableBlock__title">
              {{ $t('index.table') }} {{table.name}}
            </div>
            <div class="">
              <time>{{time}}</time>
            </div>
          </div>
          <div class="TableBlock__footer">
            No Order
          </div>
        </div>
      </div>
      </router-link>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "TableBlock",
  data() {
    return {
      sec: 0,
      min: 0,
      hrs: 0
    }
  },
  props: {
    table: Object || Array,
  },
  computed: {
    time() {
      return `${this.hrs > 9 ? this.hrs : "0" + this.hrs}:${this.min > 9 ? this.min : "0" + this.min}:${this.sec > 9 ? this.sec : "0" + this.sec}`
    },
  },
  created() {
    if (0) {
      setInterval(this.tick, 1000);
    }
  },
  methods: {
    tick(){
      this.sec = this.sec + 1;
      if (this.sec >= 60) {
        this.sec = 0;
        this.min = this.min+1;
        if (this.min >= 60) {
          this.min = 0;
          this.hrs = this.hrs + 1;
        }
      }
    },
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
