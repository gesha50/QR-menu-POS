<template>
<div class="CartDrawer">
  <q-drawer
    v-model="myDrawer"
    class="relative-position"
    :width="380"
    :class="$q.dark.isActive ? 'bg-black' : 'bg-white'"
  >
    <q-scroll-area v-if="cart.length || allCart.length" class="fit q-pl-sm" style="">
      <q-list v-if="allCart.length" padding class="rounded-borders">
        <q-item class="justify-between" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4' " >
          <div class="">
            <q-item-section>{{ $t('cart.orderInWork') }}</q-item-section>
            <q-item-section style="margin-left: 0;" >{{ $t('cart.items') }}: {{ allCart.length }}</q-item-section>
            <q-item-section style="margin-left: 0;" >
              {{ $t('cart.sum') }}: {{ priceBefore.toFixed(2) + ' ' + this.$q.localStorage.getItem('currency') }}
            </q-item-section>
          </div>
          <div class="column justify-center">
            <q-btn
              @click="isAllCartShow = !isAllCartShow"
              round
              color="warning"
              text-color="white"
              :icon="isAllCartShow ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"
            />
          </div>
        </q-item>
        <div
          class="transitionCart"
          :class="[ $q.dark.isActive ? 'bg-grey-8' : 'bg-grey-3', { 'close': !isAllCartShow }]"
        >
          <template v-for="(Item, index) in allCart" :key="index">
            <q-item class="CartItem">
              <q-item-section top thumbnail class="q-ml-none">
                <img
                  class="CartItem__img"
                  v-if="Item.image"
                  :src="`${url}/uploads/restorants/${Item.image}_large.jpg`"
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
                <div class="row justify-between items-baseline no-wrap">
                  <q-item-label class="CartItem__title q-mb-md row" >{{ Item.name }}
                    <div
                      v-if="Item.variant.length"
                      class="q-ml-sm text-green"
                      style="font-size: 14px"
                    >
                      {{ '('+ Item.variant +')' }}
                    </div>
                  </q-item-label>
                  <q-icon @click="removeFromCart(Item)" color="red" name="fas fa-trash-alt" style="cursor:not-allowed;" />
                </div>
                <div class="row justify-between no-wrap">
                  <q-btn-group rounded outline class=" CountersBtn items-center">
                    <q-btn :disable="true" flat @click="decrement(Item)" class="CountersBtn__dec" icon="fas fa-minus" />
                    <div class="CountersBtn__counter q-mx-md">{{ Item.counter}}</div>
                    <q-btn :disable="true" flat @click="increment(Item)" class="CountersBtn__inc" icon="fas fa-plus" />
                  </q-btn-group>
                  <div class="CountersBtn__price">
                    {{ Item.price + ' ' + this.$q.localStorage.getItem('currency') }}
                  </div>
                </div>
                <div v-if="Item.extras && Item.extras.length" class="CartItem__extra q-mt-md ">
                  <div class="" v-for="(extra, ind) in Item.extras" :key="ind">
                    <div class="row justify-between">
                      <div class="CartItem__extraTitle">{{extra.name}}</div>
                      <div class="CartItem__extraPrice">
                        {{this.$q.localStorage.getItem('currency') + ' ' + extra.price}}
                      </div>
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </div>
      </q-list>
      <q-list padding class="rounded-borders CartList">
        <template v-for="(Item, index) in cart" :key="index">
          <q-item class="CartItem">
            <q-item-section top thumbnail class="q-ml-none">
              <img
                class="CartItem__img"
                v-if="Item.image"
                :src="`${url}/uploads/restorants/${Item.image}_large.jpg`"
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
              <div class="row justify-between items-baseline no-wrap">
                <q-item-label class="CartItem__title q-mb-md row" >{{ Item.name }}
                  <div
                    v-if="Item.variant.length"
                    class="q-ml-sm text-green"
                    style="font-size: 14px"
                  >
                    {{ '('+ Item.variant +')' }}
                  </div>
                </q-item-label>
                <q-icon @click="removeFromCart(Item)" color="red" name="fas fa-trash-alt" style="cursor:pointer;" />
              </div>
              <div class="row justify-between no-wrap">
                  <q-btn-group rounded outline class=" CountersBtn items-center">
                    <q-btn flat @click="decrement(Item)" class="CountersBtn__dec" icon="fas fa-minus" />
                    <div class="CountersBtn__counter q-mx-md">{{ Item.counter}}</div>
                    <q-btn flat @click="increment(Item)" class="CountersBtn__inc" icon="fas fa-plus" />
                  </q-btn-group>
                <div class="CountersBtn__price">
                  {{Item.price + ' ' + this.$q.localStorage.getItem('currency') }}
                </div>
              </div>
              <div v-if="Item.extras && Item.extras.length" class="CartItem__extra q-mt-md ">
                <div class="" v-for="(extra, ind) in Item.extras" :key="ind">
                  <div class="row justify-between">
                    <div class="CartItem__extraTitle">{{extra.name}}</div>
                    <div class="CartItem__extraPrice">
                      {{extra.price  + ' ' + this.$q.localStorage.getItem('currency')}}
                    </div>
                  </div>
                </div>
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
              <q-item-label class="CartItem__title q-mb-md"> {{ $t('cart.empty') }} </q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
    </q-scroll-area>
    <div class="absolute-bottom relative-position">
      <q-icon
        v-if="comment"
        @click="addComment"
        size="xl"
        style="top: -50px; right: 15px; cursor:pointer;"
        class="absolute"
        name="mark_chat_read"
        color="light-green-14"
      />
      <q-icon
        v-else
        @click="addComment"
        size="xl"
        style="top: -50px; right: 15px; cursor:pointer;"
        class="absolute"
        name="add_comment"
        color="blue-grey-3"
      />

      <q-select
        v-show="table_id==='delivery'"
        color="orange-14"
        bg-color="red-5"
        popup-content-style="background-color: $red-5"
        rounded
        filled
        v-model="deliveryArea"
        :options="deliveryAreas"
        label="Choose delivery area"
      />

      <div class="totalPrice bg-grey-2 full-width row justify-between q-pa-md">
        <div class="totalPrice__title">{{ $t('cart.total') }}:</div>
        <div class="totalPrice__price">
          {{ totalPrice + ' ' + this.$q.localStorage.getItem('currency') }}
        </div>
      </div>
      <div class="checkout">
        <q-btn
          v-if="cartStatus===0"
          :loading="cartLoader"
          :disable="isCartEmpty"
          @click="sendToCook"
          class="full-width checkout__btn bg-amber-6"
          :label="$t('cart.sendToCook')"
        />
        <q-btn
          v-else-if="cartStatus===1"
          :disable="isCartEmpty"
          :loading="cartLoader"
          @click="sendToCook"
          class="full-width checkout__btn bg-amber-7"
          :label="$t('cart.orderMore')"
        />
        <q-btn
          v-if="cartStatus > 0"
          :disable="!isCartEmpty"
          :loading="closeLoader"
          @click="closeTable"
          class="full-width checkout__btn bg-red-6"
          :label="$t('cart.closeTable')"
        />
      </div>
    </div>
  </q-drawer>
  <dialog-add-comment
    ref="commentDialog"
    @addComment="addCommentSuccess"
  ></dialog-add-comment>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import {items} from "src/store/items/getters";
import { api } from 'boot/axios'
import DialogAddComment from "components/menu/DialogAddComment";
import {LocalStorage} from "quasar";

export default defineComponent({
    name: "CartDrawer",
    props: ['drawer'],
    data() {
        return {
          isComment: false,
          cartLoader: false,
          closeLoader: false,
          isAllCartShow: false,
          deliveryAreas: [],
          deliveryArea: null
        }
    },
    components: {
      DialogAddComment
    },
    computed: {
      configAxios() {
        return this.$store.getters['settings/configAxios']
      },
      isCartEmpty() {
        return this.cart.length <= 0;
      },
      url() {
        return process.env.API
      },
      myDrawer() {
        return this.drawer
      },
      table_id() {
        return this.$route.path.split('/')[2]
      },
      cart() {
        return this.$store.getters['items/ItemsInCart'](this.table_id)
          ? this.$store.getters['items/ItemsInCart'](this.table_id).curCart
          : []
      },
      allCart() {
        return this.$store.getters['items/ItemsInCart'](this.table_id)
          ? this.$store.getters['items/ItemsInCart'](this.table_id).allCart
          : []
      },
      cartStatus() {
        return this.$store.getters['items/ItemsInCart'](this.table_id)
          ? this.$store.getters['items/ItemsInCart'](this.table_id).status
          : []
      },
      order_id() {
        return this.$store.getters['items/ItemsInCart'](this.table_id)
          ? this.$store.getters['items/ItemsInCart'](this.table_id).order_id
          : null
      },
      priceBefore() {
        return this.$store.getters['items/ItemsInCart'](this.table_id)
          ? this.$store.getters['items/ItemsInCart'](this.table_id).priceBefore
          : 0
      },
      comment() {
        return this.$store.getters['items/comment'](this.table_id)
          ? this.$store.getters['items/comment'](this.table_id)
          : ''
      },
      totalPrice() {
        let total = 0
        for (let i=0; i<this.cart.length;++i) {
          total = total + this.cart[i].price * this.cart[i].counter
            this.cart[i].extras.forEach(ex=>{
              total += ex.price * this.cart[i].counter
            })
        }
        if (!this.cart.length) {
          total = total + Number(this.priceBefore)
        }
        if (this.deliveryArea !== null) {
          total = total + this.deliveryArea.price
        }
        return total.toFixed(2)
      },
    },
  created() {
    if (this.table_id === 'delivery') {
      api.get('api/deliveries/areas/restaurant/'+this.$q.localStorage.getItem('restaurantID'), {
        headers: {
          Authorization: 'Bearer '+LocalStorage.getItem('userToken')
        }
      })
      .then(res=>{
        res.data.areas.forEach(area=>{
          let obj = {}
          obj.value = area.id
          obj.label = area.name + ' + ' + area.cost + ' ' + this.$q.localStorage.getItem('currency')
          obj.price = area.cost
          this.deliveryAreas.push(obj)
        })
        if (this.deliveryAreas.length) {
          this.deliveryArea = this.deliveryAreas[0]
        }
      })
    }
  },
  methods: {
      closeTable() {
        this.closeLoader = true
        api.get('api/v3/vendor/checkout-table/'+this.table_id, this.configAxios)
          .then(res=>{
            this.$store.dispatch('items/removeAllFromCart', this.table_id)
            this.closeLoader = false
            this.$router.push('/')
          })
          .catch(e=>{
            console.log(e)
            this.closeLoader = false
          })
        console.log('closeTable')
      },
      addComment() {
        console.log(this.comment)
        this.$refs.commentDialog.show()
      },
      addCommentSuccess(comment) {
        this.$store.dispatch('items/changeComment', [this.table_id, comment])
        this.isComment = true
      },
      decrement(item) {
        this.$store.dispatch('items/decrement', [item, this.cart, this.table_id])
      },
      increment(item) {
        this.$store.dispatch('items/increment', [item, this.cart, this.table_id])
      },
      removeFromCart(item) {
        this.$store.dispatch('items/removeFromCart', [item, this.cart, this.table_id])
      },
      sendToCook() {
        this.cartLoader = true
        let items = []
        this.cart.forEach(el=>{
          let extras = []
          el.extras.forEach(extra => {
            extras.push({'id':extra.id})
          })
          items.push({
            'id': el.id,
            'qty': el.counter,
            'variant': el.variant_id,
            'promo_count': 0,
            'extrasSelected': extras
          })
        })

        // post order in orders
        let obj = {
          'order_id': this.order_id,
          'vendor_id': this.$q.localStorage.getItem('restaurantID'),
          'payment_method': 'cod',
          'deliveryAreaId': 0,
          'coupon_code': null,
          'items': items,
          'dinein_table_id': this.table_id,
          'phone': null,
          'comment': this.comment,
          'address_id': null,
          'timeslot': null,
          'stripe_token': null
        }
        if (this.table_id === 'take-away') {
          obj.delivery_method = 'pickup'
          obj.timeslot = 'quicker as possible'
          api.post('api/v2/client/orders/store', obj,this.configAxios)
          .then(res=>{
            console.log(res.data)
            this.$store.dispatch('items/removeAllFromCart', this.table_id)
            this.cartLoader = false
            this.$router.push('/')
          })
          .catch(e=> {
            console.log(e)
            this.cartLoader = false
          })
        } else if (this.table_id === 'delivery') {
          obj.delivery_method = 'delivery'
          obj.timeslot = 'quicker as possible'
          obj.deliveryAreaId = this.deliveryArea.value
          obj.delivery_price = this.deliveryArea.cost
          obj.address_id = 1
          obj.customFields = {
            deliveryFee: 0
          }

          api.post('api/v2/client/orders/store', obj, this.configAxios)
            .then(res=>{
              console.log(res.data)
              this.$store.dispatch('items/removeAllFromCart', this.table_id)
              this.cartLoader = false
              this.$router.push('/')
            })
            .catch(e=> {
              console.log(e)
              this.cartLoader = false
            })
        } else {
          obj.delivery_method = 'dinein'
          api.post('api/v2/client/orders/store', obj, this.configAxios)
            .then(res => {
              console.log(res.data)
              // post order_at in tables table in DB
              api.get('api/v3/vendor/order-table/'+this.table_id, this.configAxios)
                .then(result=>{
                  console.log(result.data)
                  this.$store.dispatch('items/orderBlocked', [this.table_id, this.totalPrice, res.data.id])
                  this.cartLoader = false
                  // this.$router.push('/')
                })
                .catch(e=>{
                  console.log(e)
                  this.cartLoader = false
                })
            })
            .catch(e=>{
              console.log(e)
              this.cartLoader = false
            })
        }
      },
    },
})
</script>

<style lang="scss" >
.close {
  height: 0;
  transform: scaleY(0);
}

.transitionCart {
  transition: transform 0.2s;
  transform-origin: top;
}

// >1440px
@media (min-width: $breakpoint-md-max) {
  .CartDrawer {
    .q-drawer-container {
      .q-drawer {
        width: 380px !important;
      }
    }
  }
}
// >1024px  <1439px
@media (min-width: $breakpoint-sm-max) and (max-width: $breakpoint-md-max) {
  .CartDrawer {
    .q-drawer-container {
      .q-drawer {
        width: 380px !important;
      }
    }
  }
}
// >600px and <1023px
@media (min-width: $breakpoint-xs-max) and (max-width: $breakpoint-sm-max) {
  .CartDrawer {
    .q-drawer-container {
      .q-drawer {
        //width: 50% !important;
      }
    }
  }
}
// <599px
@media (max-width: $breakpoint-xs-max) {
  .CartDrawer {
    .q-drawer-container {
      .q-drawer {
        width: 80% !important;
      }
    }
  }
}

.CartList {
  margin-bottom: 236px;
}
.CartDrawer {
  .q-drawer-container {
    .q-drawer {
      position: fixed !important;
      overflow-y: auto;
    }
  }
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
    text-align: end;
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
