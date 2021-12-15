<template>
<div class="CartDrawer">
  <q-drawer
    v-model="myDrawer"
    class="relative-position"
    side="right"
    :width="380"
    :breakpoint="500"
    overlay
    :class="$q.dark.isActive ? 'bg-black' : 'bg-white'"
    style="padding-bottom: 128px;"
  >
    <q-scroll-area class="fit q-pl-sm" style="">
      <q-list padding class="rounded-borders CartList">
        <template v-for="(Item, index) in ItemsInCart" :key="index">
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
              <q-item-label class="CartItem__title q-mb-md" >{{ Item.name }}</q-item-label>
              <div class="row justify-between">
                  <q-btn-group rounded outline class=" CountersBtn items-center">
                    <q-btn flat @click="decrement" class="CountersBtn__dec" icon="fas fa-minus" />
                    <div class="CountersBtn__counter q-mx-md">1</div>
                    <q-btn flat @click="increment" class="CountersBtn__inc" icon="fas fa-plus" />
                  </q-btn-group>
                <div class="CountersBtn__price">$ 5.00</div>
              </div>
              <div class="CartItem__extra q-mt-md row justify-between">
                <div class="CartItem__extraTitle">more cheese</div>
                <div class="CartItem__extraPrice">$ 2.00</div>
              </div>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
    <div class="absolute-bottom">
      <div class="totalPrice bg-grey-2 full-width row justify-between q-pa-md">
        <div class="totalPrice__title">Total Price:</div>
        <div class="totalPrice__price">$ 100</div>
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
          ItemsInCart: [
            {
              id: 1,
              name: 'Цезарь с курицей',
              img: 'cesar.jpg',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 2,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 1,
              name: 'Цезарь с курицей',
              img: 'cesar.jpg',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
            {
              id: 2,
              name: 'Цезарь с курицей',
              img: '',
              isInCart: false,
              price: 1000,
              isActive: 1
            },
          ],
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
      }
    },
    methods: {
      decrement() {
        console.log('decrement')
      },
      increment() {
        console.log('increment')
      },
      checkout() {
        console.log('checkout')
      },
    },
})
</script>

<style lang="scss" scoped>
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
