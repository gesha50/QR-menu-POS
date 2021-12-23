<template>
<div class="CardItem q-pa-md">
  <div
    class="CardItem__inside q-ma-sm"
    :class="$q.dark.isActive ? 'bg-black' : 'bg-white'"
  >
    <div @click="addItemInCart" class="CardItem__forImg full-width" style="user-select: none;">
      <div v-if="item.isInCart" class="CardItem__inCart">
        <div class="CardItem__counter bg-white text-amber-8">{{item.counter}}</div>
      </div>
        <img
          v-if="item.image"
          :src="`${url}/uploads/restorants/${item.image}_large.jpg`"
          alt=""
          class="CardItem__img full-width"
        >
        <img
          v-else
          :src="require(`../../assets/img/menu-item/default.jpg`)"
          alt=""
          class="CardItem__img full-width"
        >
      </div>
    <div class="CardItem__footer q-px-lg q-py-md">
        <div class="CardItem__title">{{ item.name }}</div>
        <div class="row q-mt-sm">
          <div class="CardItem__isActive column justify-center">
            <i v-if="item.isActive" class="fas fa-check-circle text-green"></i>
            <i v-else class="fas fa-times-circle text-red"></i>
          </div>
          <div class="CardItem__price q-ml-md">$ {{ item.price }}</div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CardItem",
    props: {
      item: Object
    },
    data() {
        return {

        }
    },
    created() {},
    mounted() {},
    components: {},
    computed: {
      url() {
        return process.env.API
      }
    },
    methods: {
      addItemInCart() {
        this.$store.dispatch('items/addItemInCart',this.item)
      },
    },
})
</script>

<style lang="scss" scoped>
@import "../../css/var";
.CardItem {
  &__inside {
    border-radius: $borderRadius;
    position: relative;
  }
  &__inCart {
    position: absolute;
    z-index: 1;
    height: 200px;
    width: 100%;
    background: linear-gradient(145deg, transparent, transparent, $amber-8);
  }
  &__counter {
    border-radius: 50%;
    bottom: 10px;
    right: 10px;
    position: absolute;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    font-family: 'GSansReg';
  }
  &__title {
    font-family: 'GSansReg';
    font-size: 18px;
    line-height: 1.2;
    font-weight: 500;
  }
  &__forImg {
    cursor: pointer;
    height: 200px;
  }
  &__img {
    border-radius: $borderRadius $borderRadius 0 0;
    height: 100%;
    object-fit: cover;
  }
  &__isActive {
    & i {
      font-size: 17px;
    }
  }
  &__price {
    font-family: 'GSansReg';
    font-size: 17px;
    line-height: 1.2;
    font-weight: 400;
  }
}
</style>
