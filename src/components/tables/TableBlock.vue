<template>
    <div class="item q-px-sm">
      <div class="table full-height" :class="tableBackground(status, time)">
        <router-link
          class="tableBlockLink"
          :class="$q.dark.isActive ? 'text-white' : 'text-black'"
          :to="'/menu/'+table.id"
        >
          <div class="q-pa-md TableBlock">
            <div class="column justify-between full-height">
              <div class="flex justify-between">
                <div class="TableBlock__title">
                  {{ $t('tables.table') }} {{table.name}}
                </div>
                <div class="">
                  <time>{{ time }}</time>
                </div>
              </div>
              <div v-if="allCart.length>1" class="TableBlock__footer">
                {{ $t('tables.orders', {counter: allCart.length}) }}
              </div>
              <div v-else-if="allCart.length===1" class="TableBlock__footer">
                {{ $t('tables.order', {counter: allCart.length}) }}
              </div>
              <div v-else class="TableBlock__footer">
                {{ $t('tables.noOrder') }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
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
      hrs: 0,
      status: 0
    }
  },
  props: {
    table: Object || Array,
  },
  computed: {
    time() {
      return `${this.hrs > 9 ? this.hrs : '0'+this.hrs}:${this.min > 9 ? this.min : '0'+this.min}:${this.sec > 9 ? this.sec : '0'+this.sec}`
    },
    allCart() {
      return this.$store.getters['items/ItemsInCart'](this.table.id)
        ? this.$store.getters['items/ItemsInCart'](this.table.id).allCart
        : []
    },
    cart() {
      return this.$store.getters['items/ItemsInCart'](this.table.id)
        ? this.$store.getters['items/ItemsInCart'](this.table.id).curCart
        : []
    },
  },
  created() {
    this.getDifferenceTime()
  },
  mounted () {
    this.interval()
  },
  methods: {
    interval() {
      if (this.status !== 0) {
        setInterval(this.tick, 1000);
      }
    },
    tick() {
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
    tableBackground(status, time) {
      if (parseInt(time.replaceAll(":","")) >= '020000') {
        status = 3
      } else if (parseInt(time.replaceAll(":","")) >= '003000') {
        status = 2
      }
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
    },
    getDifferenceTime() {
      if (this.table.order_at) {
        this.status = 1

        let orderDate = this.table.order_at.split(' ')
        let orderTime = orderDate[1].split(':')

        let date = new Date().toString()
        let time = date.split(' ')
        let curTime = time[4].split(':')

        this.hrs = curTime[0] - orderTime[0]
        if (curTime[1] >= orderTime[1]) {
          this.min = curTime[1] - orderTime[1]
        } else {
          this.hrs = this.hrs - 1
          this.min = curTime[1] - orderTime[1] + 60
        }
        if (curTime[2] > orderTime[2]) {
          this.sec = curTime[2] - orderTime[2]
        } else {
          this.sec = curTime[2] - orderTime[2] + 60
        }
        if (this.hrs > 6 || this.hrs < 0) {
          this.status = 0
          this.hrs = 0
          this.min = 0
          this.sec = 0
        }
      }
    }
  },
})
</script>

<style scoped lang="scss">
.table{
  border-radius: 10px;
}
.tableBlockLink{
  text-decoration: none;
}
  .TableBlock {
    padding: 10px 20px;
    height: 130px;
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
@media (max-width: $breakpoint-sm-max) {
  .item {
    padding-bottom: 10px;
    padding-top: 10px;
  }
}
</style>
