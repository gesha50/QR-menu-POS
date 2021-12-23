<template>
<div class="CartDrawer">
  <q-drawer
    v-model="myDrawer"
    class="relative-position"
    :width="380"
    :breakpoint="500"
    :class="$q.dark.isActive ? 'bg-black' : 'bg-white'"
  >
    <q-scroll-area v-if="this.$store.getters['items/ItemsInCart'].length" class="fit q-pl-sm" style="">
      <q-list padding class="rounded-borders CartList">
        <template v-for="(Item, index) in this.$store.getters['items/ItemsInCart']" :key="index">
          <q-item class="CartItem">
            <q-item-section top thumbnail class="q-ml-none">
              <img
                class="CartItem__img"
                v-if="Item.img"
                :src="require(`../../assets/img/menu-item/${Item.img}`)"
                alt=""
              >
              <img
                class="CartItem__img"
                v-else
                :src="require(`../../assets/img/menu-item/default.jpg`)"
                alt=""
              >
            </q-item-section>

            <q-item-section>
              <div class="row justify-between items-baseline">
                <q-item-label class="CartItem__title q-mb-md" >{{ Item.name }}</q-item-label>
                <q-icon @click="removeFromCart(Item)" color="red" name="fas fa-trash-alt" style="cursor:pointer;" />
              </div>
              <div class="row justify-between">
                  <q-btn-group rounded outline class=" CountersBtn items-center">
                    <q-btn flat @click="decrement(Item)" class="CountersBtn__dec" icon="fas fa-minus" />
                    <div class="CountersBtn__counter q-mx-md">{{ Item.counter}}</div>
                    <q-btn flat @click="increment(Item)" class="CountersBtn__inc" icon="fas fa-plus" />
                  </q-btn-group>
                <div class="CountersBtn__price">{{$t('valuta') + Item.price }}</div>
              </div>
              <div v-if="Item.extra && Item.extra.length" class="CartItem__extra q-mt-md row justify-between">
                <div class="CartItem__extraTitle">{{Item.extra.name}}</div>
                <div class="CartItem__extraPrice">$ {{Item.extra.price}}</div>
              </div>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
    <q-scroll-area v-else class="fit q-pl-sm" style="">
      <q-list padding class="rounded-borders CartList">
          <q-item class="CartItem text-center">
            <q-item-section>
              <q-item-label class="CartItem__title q-mb-md"> Cart is EMPTY :( </q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
    </q-scroll-area>
    <div class="absolute-bottom">
      <div class="totalPrice bg-grey-2 full-width row justify-between q-pa-md">
        <div class="totalPrice__title">Total Price:</div>
        <div class="totalPrice__price">$ {{ totalPrice }}</div>
      </div>
      <div class="checkout">
        <q-btn @click="checkout" class="full-width checkout__btn bg-amber-6" label="Finish Ordering" />
      </div>
    </div>
  </q-drawer>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CartDrawer",
    props: ['drawer'],
    data() {
        return {

        }
    },
    created() {
    },
    updated() {
    },
    mounted() {},
    components: {},
    computed: {
      myDrawer() {
        return this.drawer
      },
      cart() {
        return  this.$store.getters['items/ItemsInCart']
      },
      totalPrice() {
        let total = 0
        for (let i=0; i<this.cart.length;++i) {
          console.log(i)
          total = total + this.cart[i].price * this.cart[i].counter
        }
        return total
      },
    },
    methods: {
      decrement(item) {
        this.$store.dispatch('items/decrement', item)
      },
      increment(item) {
        this.$store.dispatch('items/increment', item)
      },
      removeFromCart(item) {
        this.$store.dispatch('items/removeFromCart', item)
      },
      checkout() {
        console.log('checkout')
      },
    },
})
</script>

<style lang="scss">
.q-drawer {
  position: fixed !important;
  height: calc(100vh - 59px);
  overflow-y: auto;
}
.CartItem {
  &__img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  &__title {
    font-family: 'GSansReg';
    font-size: 20px;
    line-height: 1.2;
    font-weight: 500;
  }
  &__extraTitle {
    font-family: 'GSansReg';
    font-size: 18px;
    line-height: 1.2;
    font-weight: 400;
  }
  &__extraPrice {
    font-family: 'GSansReg';
    font-size: 20px;
    line-height: 1.2;
    font-weight: 400;
  }
}

.CountersBtn {
  border: 1px solid $green-5;
  border-radius: 23px;
  &__dec,&__inc {
    color: $green-5;
  }
  &__counter {
    font-family: 'GSansReg';
    font-size: 20px;
    line-height: 1.2;
    font-weight: 700;
  }
  &__price {
    font-family: 'GSansReg';
    font-size: 20px;
    line-height: 1.2;
    font-weight: 400;
  }
}
.totalPrice {
  &__title {
    font-family: 'GSansReg';
    font-size: 22px;
    line-height: 1.2;
    font-weight: 700;
    color: #4d4d4d;
  }
  &__price {
    font-family: 'GSansReg';
    font-size: 25px;
    line-height: 1.2;
    font-weight: 700;
    color: #4d4d4d;
  }
}
.checkout {
  &__btn {
    font-family: 'GSansReg';
    font-size: 25px;
    line-height: 1.2;
    font-weight: 700;
  }
}
</style>
